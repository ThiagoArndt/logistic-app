import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, orders, products } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { verifyToken } from "@/src/common/utils/api-utils";
const secret = process.env.SECRET as string;

const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(async (resolve) => {
    try {
      if (req.method === "POST") {
        const {
         date,
         orderId,
         productId,
         requesterId,
         totalQuantity
        }: orders = req.body;

        //Token Validation
        verifyToken(req, res);

        //Code

        try {
          const data = await prisma.orders.create({
            data: {
              date,
              totalQuantity,
              orderId,
              productId,
              requesterId,

            },
          });
          res.status(200).send({ message: "Pedido Criado com Sucesso!", data: data });
        } catch (err) {
          res.status(200).send({ message: "Erro ao Criar Pedido" });
        }

      
      }
      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      res.send({ message: "Por favor, insira todos os dados" });
      res.status(500);
      res.end();
      await prisma.$disconnect();
      process.exit(1);
      return resolve();
    }
  });
}
