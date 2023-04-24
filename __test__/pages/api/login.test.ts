import fetch from 'node-fetch';
import handler from '@/src/pages/api/login';
import prisma from '../..//utils/client';
import { server, setup, teardown } from '../../utils/integration-test-hooks'
import { cleanUp } from '../..//utils/db-test-setup';

const data = {
    email: 'teste@gmail.com',
    password: '@Teste123',
}

describe('/api/login', () => {
    //Do a query with user email to erase his data from database after test completes.
    //And also close our server/database connection.
    afterAll((done) => {
        cleanUp();
        prisma.$disconnect();
        server.close(done);
    });




    beforeAll(async () => {
        await setup(handler);
    });


    it('check if user exists', async () => {

        const response = await fetch('http://localhost:3001/', {
            body: JSON.stringify(data
            ),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        console.log(response);
        const user = await prisma.users.findFirst({
            where: {
                email: data.email
            }
        });

        if (user == null) {
            expect(response.status).toEqual(401);
        }
        else {
            expect(response.status).toEqual(200);
        }

    });

});
