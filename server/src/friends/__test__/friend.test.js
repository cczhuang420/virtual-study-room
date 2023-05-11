import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import FriendRequestModel from '../friend.model';
import {chats, users, friendRequests, privateRooms, products, publicRooms} from '../../testdata'
import router from '../friend.router'
import express from 'express';
import request from 'supertest';

let mongod;

const app = express();
app.use(express.json());
app.use('/api/friends', router);

describe('friend test suite', () => {


beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
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
    it('check friend request model', async () => {
        const friendReqFromDb = await FriendRequestModel.find({});
        expect(friendReqFromDb).toBeTruthy();
        expect(friendReqFromDb.length).toBe(1);

        for (let i = 0; i < friendReqFromDb.length; i++) {
            expect(friendReqFromDb[i]._id.toString()).toBe(chats[i]._id.toString());
        }
    });
});

describe('Router Tests', () => {
    it('get friend requests (GET /api/friends/requests)', (done) => {
        request(app)
            .get('/api/friends/requests')
            .query({id: "000000000000000000000002"})
            .send()
            .expect(200)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                const dataFromApi = res.body;
                expect(dataFromApi).toBeTruthy();
                expect(dataFromApi.length).toBe(1);
                done();
            });
    });

    it('post new request (POST /api/friends/requests)', (done) => {
        request(app)
            .post('/api/friends/requests')
            .query({id: "000000000000000000000001", fid: "000000000000000000000002"})
            .send()
            .expect(409)
            .end(async (err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

});