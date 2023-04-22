import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      const hashedPassword = bcrypt.hashSync(password, 10);

      const checkIfExists = await prisma.users.findMany({
        where: {
          OR: [
            {
              email: email
            },
            {
              username: username
            }
          ],
        },
      });

      if (checkIfExists.length > 0) {
        res.status(401);
        res.send('Usuario já cadastrado');

      }
      else {
        const user = await prisma.users.create({
          data: {
            email: email,
            username: username,
            password: hashedPassword
          },
        });

        res.status(200).json('Usuário cadastrado com sucesso!');
      }
      await prisma.$disconnect();
    }
  }
  catch (err) {
    res.send("Oops, algo de errado aconteceu");
    res.status(500);
    await prisma.$disconnect()
    process.exit(1);
  }
}

