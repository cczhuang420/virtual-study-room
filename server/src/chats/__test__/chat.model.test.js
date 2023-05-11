import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ChatModel from '../chat.model';
import ChatController from '../chat.controller';
import {chats, users, friendRequests, privateRooms, products, publicRooms} from '../../testdata'

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {

    await mongoose.connection.db.dropDatabase();
    const Chats = await mongoose.connection.db.createCollection('chats');
    await Chats.insertMany(chats);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection('chats')
})

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});


it('is true', () => expect(true).toBeTruthy());

