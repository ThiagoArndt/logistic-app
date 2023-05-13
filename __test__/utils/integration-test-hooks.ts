import http from 'http';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { NextConnect } from 'next-connect';
import { apiResolver } from 'next/dist/server/api-utils/node';
import prisma from './client';
import { cleanUp } from './db-test-setup';


export let server: http.Server;

export const setup = async (
    handler: NextApiHandler | NextConnect<NextApiRequest, NextApiResponse>,
    query?: unknown
): Promise<void> => {
    server = http.createServer((req, res) =>
        apiResolver(
            req,
            res,
            query,
            handler,
            {
                previewModeEncryptionKey: '',
                previewModeId: '',
                previewModeSigningKey: '',
            },
            false
        )
    );
    server.listen(3001);
};

export const teardown = async (done: () => void): Promise<void> => {

    await prisma.$disconnect();
    server.close(done);
};

export const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY1MjczNTksInVzZXJuYW1lIjoidGVzdGUiLCJpYXQiOjE2ODM5MzUzNTl9.uEJmk8w5i9__iLm9it5fr7dK80_3SJ4gvd9MBYgXR2c";







