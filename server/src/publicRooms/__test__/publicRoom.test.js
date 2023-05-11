import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import PublicRoomModel from '../publicRoom.model';
import {chats, users, friendRequests, privateRooms, products, publicRooms} from '../../testdata'
import router from '../publicRoom.router'
import express from 'express';
import request from 'supertest';

let mongod;

const app = express();
app.use(express.json());
app.use('/api/publicRooms', router);

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.db.dropDatabase();
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.db.dropDatabase();
    const Chats = await mongoose.connection.db.createCollection('chats');
    const Users = await mongoose.connection.db.createCollection('users');
    const FriendRequests = await mongoose.connection.db.createCollection('friendrequests');
    const Products = await mongoose.connection.db.createCollection('products');
    const PrivateRooms = await mongoose.connection.db.createCollection('privaterooms');
    const PublicRooms = await mongoose.connection.db.createCollection('publicrooms');
    await Chats.insertMany(chats);
    await Users.insertMany(users);
    await FriendRequests.insertMany(friendRequests);
    await Products.insertMany(products);
    await PrivateRooms.insertMany(privateRooms);
    await PublicRooms.insertMany(publicRooms);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});


describe('Model Tests', () => {
    it('check public room collection', async () => {
        const dataFromDb = await PublicRoomModel.find({});
        expect(dataFromDb).toBeTruthy();
        expect(dataFromDb.length).toBe(1);

        for (let i = 0; i < dataFromDb.length; i++) {
            expect(dataFromDb[i]._id.toString()).toBe(chats[i]._id.toString());
        }
    });
});

