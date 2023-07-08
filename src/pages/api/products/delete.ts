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
        const id = req.query.productId;
        var productId: number;
        if (id == undefined) {
          res.status(401).send({ message: "Id do produto indefinido" });
          return;
        }

        productId = parseInt(id as string);


        //Token Validation
        verifyToken(req, res);

        //Code
        try {
          const data = await prisma.products.delete({
            where: {
              productId,
            },
          });

          res.status(200).send({ message: "Produto Deletado com Sucesso!" , data: data});
        } catch (err) {
          res.status(401).send({ message: "Não foi possível deletar o produto" });

        }
      }
      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      res.send({ message: "Oops, este produto não existe" });
      res.status(500);
      res.end();
      await prisma.$disconnect();
      process.exit(1);
      return resolve();
    }
  });
}
