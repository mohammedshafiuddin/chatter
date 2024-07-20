import { createClient } from "redis";
import { runSingleQuery } from "./db-instance";

const redisClient = createClient();

const messagesTopic = "messages";

(async () => {
  await redisClient.connect();
  redisClient.subscribe(messagesTopic, (data, channel) => {
    const dataObj = JSON.parse(data);
    console.log({ dataObj });
    
    runSingleQuery(
      "INSERT INTO chat_message (message, sender_id, receiver_id, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
      [dataObj.message, dataObj.sender, dataObj.sendee]
    );
  });
})();
