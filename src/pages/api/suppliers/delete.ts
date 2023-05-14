import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, suppliers } from "@prisma/client";
import { verifyToken } from "@/src/common/utils/api-utils";

const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(async (resolve) => {
    try {
      if (req.method === "DELETE") {
        const id = req.query.supplierId;
        console.log(req.query);
        var supplierId: number;

        //   return res.status(401).send({ message: "Id não é uma string" });
        // } else {
        supplierId = parseInt(id as string);
        // }
        //Token Validation
        verifyToken(req, res);

        //Code
        try {
          const supplier = await prisma.suppliers.delete({
            where: {
              supplierId,
            },
          });
          res.status(200).send({
            message: "Fornecedor Deletado com Sucesso!",
            data: supplier,
          });
        } catch (err) {
          res.status(401).send({
            message: "Id não existe",

          });
        }
      }
      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      res.send({ message: "Oops, este fornecedor não existe" });
      res.status(500);
      res.end();
      await prisma.$disconnect();
      process.exit(1);
      return resolve();
    }
  });
}
