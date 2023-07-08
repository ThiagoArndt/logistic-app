import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, requesters } from '@prisma/client'
import { verifyToken } from "@/src/common/utils/api-utils";


const prisma = new PrismaClient();

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise<void>(async (resolve) => {
        try {
            if (req.method === "POST") {
                const {name, requesterId  }: requesters = req.body;

                //Token Validation
                verifyToken(req, res);

                //Code
                const data = await prisma.requesters.update({
                    data: {
                        name
                    },
                    where: {
                        requesterId
                    }
                });

                res.status(200).send({ message: 'Solicitante Atualizado com Sucesso!', data:data  });

            }
            await prisma.$disconnect();
        }
        catch (err: any) {
            if (err.meta != undefined) {
                res.status(401).send({ message: "Oops, este Solicitante não existe" });
            }
            else {
                res.status(401).send({ message: "Oops, favor inserir os tipos dos dados corretamente" });
            }

            res.status(500);
            res.end();
            await prisma.$disconnect()
            process.exit(1);
            return resolve();
        }
    })
}
