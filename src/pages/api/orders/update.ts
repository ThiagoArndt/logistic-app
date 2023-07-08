import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, orders, products } from '@prisma/client'
import { verify } from "jsonwebtoken";
import { PrismaClientRustPanicError, PrismaClientUnknownRequestError } from "@prisma/client/runtime";
import { verifyToken } from "@/src/common/utils/api-utils";
const secret = process.env.SECRET as string;


const prisma = new PrismaClient();

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise<void>(async (resolve) => {
        try {
            if (req.method === "POST") {
                const { date,orderId,productId,requesterId,totalQuantity }: orders = req.body;

                //Token Validation
                verifyToken(req, res);

                //Code
                const data = await prisma.orders.update({
                    data: {
                        date,productId,requesterId,totalQuantity
                    },
                    where: {
                        orderId
                    }
                });

                res.status(200).send({ message: 'Pedido Atualizado com Sucesso!', data:data  });

            }
            await prisma.$disconnect();
        }
        catch (err: any) {
            if (err.meta != undefined) {
                res.status(401).send({ message: "Oops, este Pedido não existe" });
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
