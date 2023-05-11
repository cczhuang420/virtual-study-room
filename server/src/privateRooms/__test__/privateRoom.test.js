import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import PrivateRoomModel from '../privateRoom.model';
import {chats, users, friendRequests, privateRooms, products, publicRooms} from '../../testdata'
import router from '../privateRoom.router'
import express from 'express';
import request from 'supertest';

let mongod;

const app = express();
app.use(express.json());
app.use('/api/privateRooms', router);

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
    it('check private room collection', async () => {
        const dataFromDb = await PrivateRoomModel.find({});
        expect(dataFromDb).toBeTruthy();
        expect(dataFromDb.length).toBe(2);

        for (let i = 0; i < dataFromDb.length; i++) {
            expect(dataFromDb[i]._id.toString()).toBe(chats[i]._id.toString());
        }
    });
});

describe('Router Tests', () => {
    it('get users private rooms (GET /api/privateRooms)', (done) => {
        request(app)
            .get('/api/privateRooms')
            .query({owner: "000000000000000000000001"})
            .send()
            .expect(200)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                const dataFromApi = res.body;
                expect(dataFromApi).toBeTruthy();
                expect(dataFromApi.length).toBe(1);
                expect(dataFromApi[0].name).toBe("CC");

                done();
            })
    });

    it('test invalid users id for private room  (GET /api/privateRooms)', (done) => {
        request(app)
            .get('/api/privateRooms')
            .query({owner: "000000000000000000000099"})
            .send()
            .expect(200)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                const dataFromApi = res.body;

                expect(dataFromApi.length).toBe(0);
                done();
            });
    });

    it('test create new private room (POST /api/privateRooms)', (done) => {
        const newRoom = {
            ownerId: "000000000000000000000001",
            name: "Testing1",
            users: [],
            backgroundUrl: "testing.svg",
            isVisibleToFriends: true
        }
        request(app)
            .post('/api/privateRooms')
            .send(newRoom)
            .expect(200)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                const dataFromDb = await PrivateRoomModel.find({});

                expect(dataFromDb).toBeTruthy();
                expect(dataFromDb.length).toBe(3);
                expect(dataFromDb[dataFromDb.length-1].name).toBe("Testing1");

                done()

            });

    });
});
