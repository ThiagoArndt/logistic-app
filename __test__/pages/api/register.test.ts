import fetch from 'node-fetch';
import handler from '@/src/pages/api/register';
import prisma from '../..//utils/client';
import { server, setup, teardown } from '../../utils/integration-test-hooks'
import { cleanUp } from '../..//utils/db-test-setup';


const data = {
  username: 'atatat',
  email: 'atatat@gmail.com',
  password: '@Teste123',
}

describe('/api/register', () => {
  //Do a query with user email to erase his data from database after test completes.
  //And also close our server/database connection.
  afterAll(done => {
    cleanUp();
    prisma.$disconnect();
    server.close(done);
  }
  );



  beforeAll(async () => {
    await setup(handler);
  });


  it('registers a new user', async () => {

    const response = await fetch('http://localhost:3001/', {
      body: JSON.stringify(data
      ),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    expect(response.status).toEqual(200);
  });

  it('tries to regiter same user again', async () => {
    const response = await fetch('http://localhost:3001/', {
      body: JSON.stringify(data
      ),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    expect(response.status).toEqual(401);
  });

});
