import type { NextApiRequest, NextApiResponse } from "next";
import con from "@/src/common/utils/db-utils";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const query =
      "INSERT INTO users (`email`, `username`, `password`) VALUES (?, ?, ?)";
    const query2 = "SELECT * FROM users WHERE username = ? || email = ?";

    con.query(query2, [username, email], (err, result: RowDataPacket[]) => {
      if (err) {
        throw err;
      }

      if (result.length > 0) {
        res.send("User already exists");
      }
      if (result.length === 0) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        con.query(
          query,
          [email, username, hashedPassword],
          (err, result: RowDataPacket[]) => {
            if (err) {
              throw err;
            }
            res.send({ message: "User Created" });
          }
        );
      }
    });
  }
}
