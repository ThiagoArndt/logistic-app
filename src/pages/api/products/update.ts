import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, products } from '@prisma/client'
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
                const { productId, name, description, quantity, price, photo, supplierId }: products = req.body;

                //Token Validation
                verifyToken(req, res);

                //Code
                await prisma.products.update({
                    data: {
                        name, description, quantity, price, photo, supplierId
                    },
                    where: {
                        productId
                    }
                });

                res.status(200).send({ message: 'Produto Atualizado com Sucesso!' });

            }
            await prisma.$disconnect();
        }
        catch (err: any) {
            if (err.meta != undefined) {
                res.send({ message: "Oops, este produto não existe" });
            }
            else {
                res.send({ message: "Oops, favor inserir os tipos dos dados corretamente" });
            }

            res.status(500);
            res.end();
            await prisma.$disconnect()
            process.exit(1);
            return resolve();
        }
    })
}
