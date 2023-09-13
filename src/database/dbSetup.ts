import { DatabaseClient } from "query-from-file"
import { setupDBClientConfig } from "../support/setupDBClientConfig"

const dbClient = new DatabaseClient(setupDBClientConfig(), "./queries")
export default dbClient