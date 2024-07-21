import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './db-instance'
import './subscriber';
import { runSingleQuery } from './db-instance';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/home-chats', async (req, res) => {
  const userId = req.query.userId;
  const userIdNum = Number(userId);
  const chatsQuery = 'select * from chat_message where sender_id = $1 or receiver_id = $1 order by created_at';
  console.log({chatsQuery, userId})
  
  const chats = await runSingleQuery(chatsQuery, [userId]);
  
  const chatMap = new Map<number,any[]>();
  chats.forEach((chat:any)  => {
    
    const chatId = chat.sender_id === userId ? chat.receiver_id : chat.sender_id;
    const fromMap = chatMap.get(chatId);
    const msgType = chat.sender_id === userIdNum ? 'sent' : 'received';
    if(!fromMap) {
      chatMap.set(chatId, [{msg:chat.message, type:msgType}]);
    }
    else {
      fromMap.push({msg:chat.message, type:msgType});
    }
  })
  res.send(Object.fromEntries(chatMap));
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

