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


}

module.exports = ChatController;
