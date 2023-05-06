import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from '@prisma/client'
import { verifyToken } from "@/src/common/utils/api-utils";


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
                const data = await prisma.suppliers.findMany({});
                console.log(data);
                res.status(200).send({ message: "Fornecedores Resgatados com Sucesso!", data: data });
            }
            await prisma.$disconnect();
        }
        catch (err) {
            console.log(err);
            res.status(500);
            res.end();
            await prisma.$disconnect()
            process.exit(1);
            return resolve();
        }
    })
}
