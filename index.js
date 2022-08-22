const admin = require('firebase-admin');
const credentails = require('./key.json');
const express = require('express');
const app = express();
const Drip = require('./drip.js');

const getDrip = new Drip();

admin.initializeApp({
    credential: admin.credential.cert(credentails)
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//creating a user into firebase
app.post('/create', async (req, res) => {
    try {
        const userJson = {
            email: req.body.email,
            name: req.body.name
        };
        const response = await db.collection('users').add(userJson);
        res.send(response);
    } catch (e) {
        res.send(e);
    }
});

//getting user email from firebase and creating a drip Subscriber
app.get('/users/:id', async (req, res) => {
    try {
        const users = db.collection('users').doc(req.params.id);
        const response = await users.get();
        const payload = {
            email: response.email,
            time_zone: "America/Los_Angeles",
            custom_fields: {
                name: response.name
            }
        };
        const subscripber = await getDrip.createSubscriber(payload);
        res.send(subscripber);
    } catch (e) {
        res.send(e);
    }
});

app.listen(8080, () => {
    console.log('server is running on port');
});

