var mongoose = require('mongoose');
const db=require('./config/config').get(process.env.NODE_ENV);


mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true });

var conn = mongoose.connection;

conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;