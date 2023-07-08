import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, products } from '@prisma/client'
import { verify } from "jsonwebtoken";
import { verifyToken } from "@/src/common/utils/api-utils";
const secret = process.env.SECRET as string;


const prisma = new PrismaClient();

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise<void>(async (resolve) => {
        try {
            if (req.method === "GET") {


                //Token Validation
                verifyToken(req, res);

                //Code


                const data = await prisma.orders.findMany({

                });

            



                res.status(200).send({ message: "Pedidos Resgatados com Sucesso!", data: data });

            }
            await prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.send({ message: "Por favor, insira todos os dados" });
            res.status(500);
            res.end();
            await prisma.$disconnect()
            process.exit(1);
            return resolve();
        }
    })
}