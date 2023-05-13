import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, suppliers } from "@prisma/client";
import { verifyToken } from "@/src/common/utils/api-utils";
const secret = process.env.SECRET as string;

const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(async (resolve) => {
    try {
      if (req.method === "POST") {
        const { name, supplierId }: suppliers = req.body;

        //Token Validation
        verifyToken(req, res);

        //Code
        const supplier = await prisma.suppliers.update({
          data: {
            name,
            supplierId,
          },
          where: {
            supplierId,
          },
        });

        res
          .status(200)
          .send({
            message: "Fornecedor Atualizado com Sucesso!",
            data: supplier,
          });
      }
      await prisma.$disconnect();
    } catch (err: any) {
      if (err.meta != undefined) {
        res.send({ message: "Oops, este fornecedor não existe" });
      } else {
        res.send({
          message: "Oops, favor inserir os tipos dos dados corretamente",
        });
      }

      res.status(500);
      res.end();
      await prisma.$disconnect();
      process.exit(1);
      return resolve();
    }
  });
}
