import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import { DatabaseClient } from "../../query-from-file/src/databaseClient";
import morgan from "morgan";
import { DatabaseClient } from "query-from-file";
import { getEnvVarOrFail } from "../support/envVarUtils";
import { setupDBClientConfig } from "../support/setupDBClientConfig";

dotenv.config();

export const database = new DatabaseClient(
  setupDBClientConfig(),
  "sql_queries/setup_queries"
);

const app = express()
  .use(express.json())
  .use(cors())
  .use(morgan("tiny"))

connectToDBAndStartListening();



app.get("/dev/reset/database/:password", async (req, res) => {
    if (req.params.password !== "pasword") {
        res.status(400).send("Incorrect password");
    } else {
        await database.fileQuery("create_tables");
        await database.fileQuery("insert_into_non_dependent_tables");
        await database.fileQuery("insert_into_resources");
        await database.fileQuery("insert_into_join_tables");
        res.status(200).send("Database reset");
    }


});





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
