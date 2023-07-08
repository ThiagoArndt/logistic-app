import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/src/common/utils/api-utils";

const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(async (resolve) => {
    try {
      if (req.method === "DELETE") {
        const id = req.query.requesterId;
        var requesterId: number;
        if (id == undefined) {
          res.status(401).send({ message: "Id do solicitante indefinido" });
          return;
        }

        requesterId = parseInt(id as string);


        //Token Validation
        verifyToken(req, res);

        //Code
        try {
          const data = await prisma.requesters.delete({
            where: {
              requesterId,
            },
          });

          res.status(200).send({ message: "Solicitante Deletado com Sucesso!" , data: data});
        } catch (err) {
          res.status(401).send({ message: "Não foi possível deletar o Solicitante" });

        }
      }
      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      res.send({ message: "Oops, este Solicitante não existe" });
      res.status(500);
      res.end();
      await prisma.$disconnect();
      process.exit(1);
      return resolve();
    }
  });
}
