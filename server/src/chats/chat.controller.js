const chatModel = require("./chat.model");

class ChatController {
    async getChat(myId, customerId) {
        const chatFromUserToCustomer = await chatModel.find({
            sender: myId,
            receiver: customerId,
            messsage: { $ne: null }
        });
        const chatFromCustomerToUser = await chatModel.find({
            sender: customerId,
            receiver: myId,
            messsage: { $ne: null }
        });
        return chatFromUserToCustomer != null && chatFromCustomerToUser != null
    }

    async getLatestChat(myId, customerId) {
        const messageFromUserToCustomer = await chatModel.find({
            sender: myId,
            receiver: customerId,
            messsage: { $ne: null }
        }).sort('-timestamp').limit(1);
        const messageFromCustomerToUser = await chatModel.find({
            sender: customerId,
            receiver: myId,
            messsage: { $ne: null }
        }).sort('-timestamp').limit(1);
        const latestChat = [];
        for (let message1 of messageFromUserToCustomer) {
            for (let message2 of messageFromCustomerToUser) {
                if (message1.timestamp < message2.timestamp && message1 !== null && message2 !== null) {
                    latestChat.push(messageFromCustomerToUser);
                } else {
                    latestChat.push(messageFromUserToCustomer);
                }
            }
        }
        return latestChat;
    }


}

module.exports = ChatController;
