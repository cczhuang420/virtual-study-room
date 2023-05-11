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

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it('check chats collection', async () => {
    const chatsFromDb = await ChatModel.find({});
    expect(chatsFromDb).toBeTruthy();
    expect(chatsFromDb.length).toBe(2);

    for (let i = 0; i < chatsFromDb.length; i++) {
        expect(chatsFromDb[i]._id.toString()).toBe(chats[i]._id.toString());
    }
})