import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import { DatabaseClient } from "../../query-from-file/src/databaseClient";
import { DatabaseClient } from "query-from-file";
import morgan from "morgan";
import homeRouter from "./routes/general";
import resourcesRouter from "./routes/resources";
import tagsRouter from "./routes/tags";
import userRouter from "./routes/users";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";
import recommendationsRouter from "./routes/recommendations";

dotenv.config();

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
  .use("/recommendations", recommendationsRouter);

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
