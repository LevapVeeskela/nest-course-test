import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
	name: 'Тест',
	title: 'Заголовок',
	description: 'Тестовон описание',
	rating: 0,
	productId
};
const uriController = '/review/';

describe('ReviewController (e2e)', () => {
	let app: INestApplication;
	let createdId: Types.ObjectId;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201);
		createdId = body._id;
		expect(createdId).toBeDefined();
	});

	it('/review/byProduct/:id (get) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/review/byProduct/')
			.send(testDto)
			.expect(201);
		createdId = body._id;
		expect(createdId).toBeDefined();
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete(`${uriController}${createdId}`)
			.expect(200);
	});

	afterAll(async () => {
		await app.close();
		disconnect();
	});
});
