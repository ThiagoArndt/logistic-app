import { createPool } from "mysql2";

const con = createPool({
  connectTimeout: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "almoxarifadodb",
});

export default con;
