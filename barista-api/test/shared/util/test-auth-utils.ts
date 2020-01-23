import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';

export async function getAccessToken(app: INestApplication) {
  const authInfo = {username: 'anyusername', password: 'anypass'};
  const response = await request(app.getHttpServer())
    .post('/user/login')
    .send(authInfo);
  expect(response.status).toBe(HttpStatus.CREATED);
  return response.body.accessToken;
}
