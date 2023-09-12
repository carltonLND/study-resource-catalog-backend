import { getEnvVarOrFail } from "./envVarUtils";

/** Create and return a db client config object suitable for node-postgres Client or Pool constructors,
 * based upon various environment variables.
 *
 * Environment variable: USE_LOCAL_DB
 *
 * If the environment variable USE_LOCAL_DB is set true,
 *   1. the db config will use the LOCAL_DATABASE_URL env var contents
 *   2. the db config will specify ssl: false (suitable for connection to a local db)
 * Else,
 *   1. the db config will use the DATABASE_URL env var contents
 *   2. the db config will specify ssl: { rejectUnauthorized: false } (suitable for connecting to a DB on render.com, etc)
 *
 * Environment variable: DATABASE_URL and LOCAL_DATABASE_URL
 *
 * DATABASE_URL environment variable MUST be set.  This will be used as the dbConfig's connectionString property.
 * LOCAL_DATABASE_URL environment variable needs to be set only if you want to use a local db sometimes during development.
 *
 * @returns a db client config object.
 */
export function setupDBClientConfig() {
  const dbEnvVarName = process.env.USE_LOCAL_DB
    ? "LOCAL_DATABASE_URL"
    : "DATABASE_URL";
  const connectionString = getEnvVarOrFail(dbEnvVarName);

  const sslSetting = process.env.USE_LOCAL_DB
    ? false
    : { rejectUnauthorized: false };

  console.log("Using db env var name:", dbEnvVarName, "with ssl:", sslSetting);

  return {
    connectionString,
    ssl: sslSetting,
  };
}
