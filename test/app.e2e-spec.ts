import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // use for validating DTOs
    await app.init();
  });

  it('/ (GET): responds with status code 404', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  afterAll(() => {
    app.close();
  });
});
