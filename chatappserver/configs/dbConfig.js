const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;

db.on('open', () =>{
    console.log('CHAT DB CONNECTED')
})