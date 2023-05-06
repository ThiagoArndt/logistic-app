import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
const secret = process.env.SECRET as string;

export function verifyToken(req: NextApiRequest, res: NextApiResponse) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        verify(token, secret, function (err, decoded) {

            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        });
    }
    else {
        return res.status(401).send({ auth: false, message: 'Not Bearer Token' });
    }
}