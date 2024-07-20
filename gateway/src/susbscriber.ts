import { createClient } from "redis";
import { getClient } from "./ws-clients";

const redisClient = createClient();

const messagesTopic = "messages";

(async () => {
  await redisClient.connect();
  redisClient.subscribe(messagesTopic, (message, channel) => {
      
      const targetUserId = JSON.parse(message).sendee;
      const client = getClient(targetUserId);
    
    if (client) {
      client.send(message);
    }
  });
})();
