import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from '@prisma/client'

import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET;



const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise<void>(async (resolve) => {
    try {
      if (req.method === "POST") {
        const email = req.body.email;
        const password = req.body.password;


        const query = await prisma.users.findFirst({
          where: {
            email: email
          },
        });


        if (query == null) {
          res.status(401);
          res.send('Usuario não encontrado');
          res.end();
        }
        else {

          bcrypt.compare(
            password,
            query.password!,
            (err, isOk: boolean) => {
              if (!isOk) {
                res.status(401).send('Senha Incorreta');

                res.end();
              }
              if (isOk) {
                const token = sign(
                  {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
                    username: query.username,
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

                res.status(200);
                res.send('Usuário autenticado com sucesso!');
                res.end();

              }

            }

          );

        }
      };
      await prisma.$disconnect();
    }
    catch (err) {
      res.send("Oops, algo de errado aconteceu");
      res.status(500);
      res.end();
      await prisma.$disconnect()
      process.exit(1);
      return resolve();
    }
  })
}
