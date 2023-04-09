import { NextApiRequest, NextApiResponse } from "next";
import con from "@/helpers/db-utils";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise<void>((resolve) => {
    try {
      if (req.method === "POST") {
        const email = req.body.email;
        const password = req.body.password;

        const query = "SELECT email, password FROM users WHERE email = ?";

        con.query(query, [email], (err, result: RowDataPacket[]) => {
          if (err) {
            throw err;
          }

          if (result.length < 1) {
            res.status(401);
            res.send({ message: "Usuário não encontrado" });
            res.end();
          } else {
            bcrypt.compare(
              password,
              result[0].password,
              (err, isOk: boolean) => {
                if (err) {
                  res.send({ message: "Senha incorreta" });
                  res.status(401).end();
                }
                if (isOk) {
                  const token = sign(
                    {
                      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
                      username: result[0].username,
                    },
                    secret!
                  );

                  const serialised = serialize("OursiteJWT", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 30,
                    path: "/",
                  });

                  res.setHeader("Set-Cookie", serialised);
                  res.send({
                    message: "Usuário e senha validados com sucesso!",
                  });
                  res.status(200).end();
                }
              }
            );
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).end();
      return resolve();
    }
  });
}
