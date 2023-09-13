import { DatabaseClient } from "query-from-file"
import { setupDBClientConfig } from "../support/setupDBClientConfig"

const db = new DatabaseClient(setupDBClientConfig(), "./queries")