import postgres from "postgres";
import { config } from "dotenv";

config({ path: "./config/.env" });

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
  // transform: {
  //   undefined: null,
  // },
});

export default sql;
