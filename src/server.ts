import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import { DatabaseClient } from "../../query-from-file/src/databaseClient";
import morgan from "morgan";
import { DatabaseClient } from "query-from-file";
import commentsRouter from "./routes/comments";
import homeRouter from "./routes/general";
import likesRouter from "./routes/likes";
import resourcesRouter from "./routes/resources";
import tagsRouter from "./routes/tags";
import userRouter from "./routes/users";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";

dotenv.config();

// const dbClientConfig = setupDBClientConfig();
// export const database = new Client(dbClientConfig);
export const database = new DatabaseClient(
  setupDBClientConfig(),
  "sql_queries"
);

const app = express()
  .use(express.json())
  .use(cors())
  .use(morgan("tiny"))
  .use("/", homeRouter)
  .use("/users", userRouter)
  .use("/resources", resourcesRouter)
  .use("/tags", tagsRouter)
  .use("/likes", likesRouter)
  .use("/comments", commentsRouter);

// app.get("/testErrorCatch",async (_req, _res) => {
//   throw new Error("failed successfully");
// })

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
  console.log("Attempting to connect to db");
  await database.connect();
  console.log("Connected to db!");

  const port = getEnvVarOrFail("PORT");
  app.listen(port, () => {
    console.log(
      `Server started listening for HTTP requests on port ${port}.  Let's go!`
    );
  });
}
