import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ChatModel from '../chat.model';
import ChatController from '../chat.controller';
import {chats, users, friendRequests, privateRooms, products, publicRooms} from '../../testdata'
import router from '../chat.router'
import express from 'express';
import request from 'supertest';

let mongod;
const chatController = new ChatController();

const app = express();
app.use(express.json());
app.use('/api/chats', router);

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
    it('check chats collection', async () => {
        const chatsFromDb = await ChatModel.find({});
        expect(chatsFromDb).toBeTruthy();
        expect(chatsFromDb.length).toBe(2);

        for (let i = 0; i < chatsFromDb.length; i++) {
        expect(chatsFromDb[i]._id.toString()).toBe(chats[i]._id.toString());
        }
    });
});

describe('Controller Tests', () => {
    it('check get chat from ChatController', async() => {
        const allChatHistory = await chatController.getChat("000000000000000000000001","000000000000000000000002");
        expect(allChatHistory.length).toBe(2);

        expect(allChatHistory[0].message).toBe("hi, back!");
        expect(allChatHistory[1].message).toBe("hi, there");
    });
});

describe('Router Tests', () => {
    it('get chat history (GET /api/chats)', (done) => {
        request(app)
            .get('/api/chats/')
            .query({myId: "000000000000000000000001", customerId: "000000000000000000000002"})
            .send()
            .expect(200)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                const chatHistoryFromApi = res.body;
                expect(chatHistoryFromApi).toBeTruthy();
                expect(chatHistoryFromApi.length).toBe(2);
                done();
            });
    });

    it('get latest chat history (GET /api/chats/latest)', (done) => {
        request(app)
            .get('/api/chats/latest')
            .query({myId: "000000000000000000000001", customerId: "000000000000000000000002"})
            .send()
            .expect(200)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                const latestChatHistory = res.body;
                expect(latestChatHistory).toBeTruthy();
                expect(latestChatHistory[0][0].message).toEqual("hi, back!")

                done();
            });
    });

    it('post new chat (POST /api/chats/)', (done) => {
        request(app)
            .post('/api/chats/')
            .query({myId: "000000000000000000000001", customerId: "000000000000000000000002", messages: "new message!"})
            .send()
            .expect(201)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                const allChatHistoryFromDb = await ChatModel.find({});
                expect(allChatHistoryFromDb).toBeTruthy();
                expect(allChatHistoryFromDb[allChatHistoryFromDb.length-1].message).toBe("new message!");

                done();
            })
    })
});
