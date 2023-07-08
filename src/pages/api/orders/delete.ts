import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, products } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { verifyToken } from "@/src/common/utils/api-utils";
const secret = process.env.SECRET as string;

const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(async (resolve) => {
    try {
      if (req.method === "DELETE") {
        const id = req.query.orderId;
        var orderId: number;
        if (id == undefined) {
          res.status(401).send({ message: "Id do pedido indefinido" });
          return;
        }

        orderId = parseInt(id as string);


        //Token Validation
        verifyToken(req, res);

        //Code
        try {
          const data = await prisma.orders.delete({
            where: {
              orderId,
            },
          });

          res.status(200).send({ message: "Pedido Deletado com Sucesso!" , data: data});
        } catch (err) {
          res.status(401).send({ message: "Não foi possível deletar o Pedido" });

        }
      }
      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      res.send({ message: "Oops, este Pedido não existe" });
      res.status(500);
      res.end();
      await prisma.$disconnect();
      process.exit(1);
      return resolve();
    }
  });
}
