import { createClient } from "redis";

const redisClient = createClient();

const messagesTopic = 'messages';
const client = redisClient.duplicate();

let publisher = redisClient.duplicate();
publisher.connect();

// (async () => {
//     await client.connect();
// })()

export const pushMessage = (message: string) => {
    console.log('Pushing message to Redis', message);
    
    publisher.publish(messagesTopic, message);
}




