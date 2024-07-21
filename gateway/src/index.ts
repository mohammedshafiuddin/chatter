import express from 'express';
import { createServer } from 'http';
import { createClient } from 'redis';
import WebSocket from 'ws';
import { pushMessage } from './publisher';
import './susbscriber'
import { addConnectedUser, removeConnectedUser } from './connectedUsers';
import url from 'url'
import { subscribe } from 'diagnostics_channel';
import { addClient, removeClient } from './ws-clients';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors())
const port = 3000;

const httpServer = createServer(app);
const wsServer = new WebSocket.Server({ noServer:true });
const apiServerUrl = 'http://localhost:4000';


app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/api/home-chats', async (req, res) =>{
  console.log({userId: req.query.userId});
  
  const resp = await axios.get(`${apiServerUrl}/home-chats?userId=${req.query.userId}`);
  
  res.send(resp.data);
});

wsServer.on('connection', (socket, request) => {
  const userIdRaw = url.parse(request.url!, true).query.userId;
  const userId = Number (userIdRaw as string)

  addConnectedUser(userId);
  addClient(userId, socket);

  socket.on('message', (message) => {
    const incomingData = JSON.parse(message.toString());
    if(incomingData.type === 'message') {
      const msgToPush = {sendee: incomingData.targetUserId, message: incomingData.data, sender:userId};
      pushMessage(JSON.stringify(msgToPush));
    }
  });

  socket.on('close', () => {
    removeConnectedUser(userId);
    removeClient(userId);
  });
});

httpServer.on('upgrade', (request, socket, head) => {
  
  const {pathname} = new URL(request.url!, `http://${request.headers.host}`);
  if (pathname === '/ws') {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit('connection', socket, request);
    });
  } else {
    socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
    socket.destroy();
  }
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
