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
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTEzNjkwMzYsInVzZXJuYW1lIjoidGVzdGUiLCJpYXQiOjE2ODg3NzcwMzZ9.y5Sjp9chzrGKFghBuWfTJ8mgoONrjfvoRUvI5xzw9wU";







