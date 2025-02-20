require('dotenv').config();
const e = require('express');
const express = require('express');
const mongose = require('mongoose')
const path = require('path');
const port = process.env.PORT || 3000
const app = express();
app.use(express.static(path.join(__dirname)))
app.use(express.urlencoded({ extended: true }))


const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongose.connect(`mongodb+srv://${username}:${password}@cluster1.4qvz8.mongodb.net/Project2`)
 const db = mongose.connection;
 db.once('open', () => {    
    console.log('MongoDB Connection Successfully✅')
    console.log(`hosting: ${"http://localhost:3000/"}`);
});

const UserScheme = new mongose.Schema({
    regd_no: Number,
    name: String,
    email: String,
    department: String,
    phone: Number,
    address: String
});

const User = mongose.model("data", UserScheme)

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/post', async (req, res) => {
    const { regd_no, name, email, department, phone, address } = req.body;
    const user = new User({
        regd_no,
        name,
        email,
        department,
        phone,
        address,
    });
    if(!regd_no || !name || !email || !department || !phone || !address){
        return res.send(`<p style="font-size: 69px;">Please Back to fill all the fields❌</p>`);
    }
 await user.save();
 res.send(`<p style="font-size: 69px;">Form Submitted Successfully✅</p>`);

});

app.listen(port, () => {
    console.log('Server is running ✅ on port ${port}');
});

// 
// server start command -  nodemon server.js