import WebSocket from "ws";

const wsClients = new Map<number, WebSocket>();


export const addClient = (userId: number, ws: WebSocket) => {
    wsClients.set(userId, ws);
}

export const removeClient = (userId: number) => {
    wsClients.delete(userId);
}

export const getClient = (userId: number) => {
    
    return wsClients.get(userId);
}