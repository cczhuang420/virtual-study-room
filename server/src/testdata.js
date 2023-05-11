import mongoose from "mongoose";

const chats = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        sender: "000000000000000000000001",
        receiver: "000000000000000000000002",
        timestamp: 1683622410293,
        message: "hi, there",
    },
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        sender: "000000000000000000000002",
        receiver: "000000000000000000000001",
        timestamp: 1683623073282,
        message: "hi, back!",
    },
];

const users = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        email: "cc@gmail.com",
        username: "cc",
        todoList: [
            {
                content: "dd",
                isCompleted: true
            }
        ],
        assets: [
            "644c64143215eb5a59f0f693",
            "644c76143215eb5a59f0f695"
        ],
        isPrivateRoomUnlocked: true,
        experience: 20034,
        profile: "Designer.png",
        coins: 20032,
        friends: ["000000000000000000000002"],
        playList: [
            {
                songUrl: "https://www.youtube.com/watch?v=W-ITtmkDoD8",
                videoId: "W-ITtmkDoD8",
                duration: "134"
            },
            {
                songUrl: "https://www.youtube.com/watch?v=S3xs2bYWXRo",
                videoId: "S3xs2bYWXRo",
                duration: "4395"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        email: "dd@gmail.com",
        username: "dd",
        todoList: [
            {
                content: "yy",
                isCompleted: true
            }
        ],
        assets: [
            "644c64143215eb5a59f0f693",
            "644c76143215eb5a59f0f695"
        ],
        isPrivateRoomUnlocked: true,
        experience: 4000,
        profile: "Designer.png",
        coins: 5000,
        friends: ["000000000000000000000001"],
        playList: [
            {
                songUrl: "https://www.youtube.com/watch?v=S3xs2bYWXRo",
                videoId: "S3xs2bYWXRo",
                duration: "4395"
            },
        ],
    }
];

const friendRequests = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        sender: "000000000000000000000001",
        receiver: "000000000000000000000002",
        timestamp: 1683621553,
        status: "pending",
    }
];

const privateRooms = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        name: "CC",
        ownerId: "000000000000000000000001",
        users: [],
        backgroundUrl: "Room1.png",
        isVisibleToFriends: true,
    },
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        name: "DD",
        ownerId: "000000000000000000000002",
        users: ["000000000000000000000002"],
        backgroundUrl: "Room1.png",
        isVisibleToFriends: true,
    }
];

const products = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        name: "Frank",
        type: "profile-image",
        price: 100,
        url: "Frank.svg"
    },
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        name: "Mike",
        type: "profile-image",
        price: 100,
        url: "Mike.svg"
    }
];

const publicRooms = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        name: "Classical",
        users: ["000000000000000000000001"],
        playList: [
            {
                "songUrl": "https://youtu.be/0bjB-IWEYI0",
                "videoId": "0bjB-IWEYI0",
                "duration": "382"
            },
            {
                "songUrl": "https://youtu.be/EFJ7kDva7JE",
                "videoId": "EFJ7kDva7JE",
                "duration": "312"
            }],
        backgroundUrl: "backgroundRoom.svg",
        playListId: "lofi-01"
    }
]
export {chats, users, friendRequests, privateRooms, products, publicRooms};
