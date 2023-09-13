import cors from "cors";
import express from "express";
import { getEnvVarOrFail } from "./support/envVarUtils";
import homeRouter from "./routes/general";
import userRouter from "./routes/users";
import resourcesRouter from "./routes/resources";
import likesRouter from "./routes/likes";
import commentsRouter from "./routes/comments";
import dotenv from "dotenv";
import { setupDBClientConfig } from "./support/setupDBClientConfig";
import { Client } from "pg";

dotenv.config();

const dbClientConfig = setupDBClientConfig();
export const listener = new Client(dbClientConfig);

const app = express()
  .use(express.json())
  .use(cors())
  .use("/", homeRouter)
  .use("/users", userRouter)
  .use("/resources", resourcesRouter)
  .use("/likes", likesRouter)
  .use("/comments", commentsRouter);

// app.get("/testErrorCatch",async (_req, _res) => {
//   throw new Error("failed successfully");
// })

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
  console.log("Attempting to connect to db");
  await listener.connect();
  console.log("Connected to db!");

  const port = getEnvVarOrFail("PORT");
  app.listen(port, () => {
    console.log(
      `Server started listening for HTTP requests on port ${port}.  Let's go!`
    );
  });
}
