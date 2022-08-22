const client = require('drip-nodejs')({ token: 'YOUR_API_KEY', accountId: 'YOUR_ACCOUNT_ID' });

class Drip {
    async getAccounts() {
        try {
            return await client.listAccounts();
        } catch (error) {
            console.log(error);
        }
    };

    async getSubscriber(idOrEmail) {
        try {
            return await client.fetchSubscriber(idOrEmail);
        } catch (error) {
            console.log(error);
        }
    };

    async getSubscribers(options) {
        try {
            return await client.listSubscribers(options);
        } catch (error) {
            console.log(error);
        }
    };

    async createSubscriber(subscriber) {
        try {
            return await client.createUpdateSubscriber(subscriber);
        } catch (error) {
            console.log(error);
        }
    };

    async deleteSubscriber(idOrEmail) {
        try {
            return await client.deleteSubscriber(idOrEmail);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Drip;