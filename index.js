const express = require('express');
const app = express();
const port = 8080;
// khai bao authen
const session = require('express-session')
const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
// khai bao brypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(session({
  secret : "secret",
  saveUninitialized: true,
  resave: true
}))

app.use(Passport.initialize())
app.use(Passport.session())

var userRoute = require('./routes/user.route');
app.set('view engine', 'ejs');
app.set('views','./views');



var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URL);
mongoose.connect('mongodb://localhost/express-demo', {useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.get('/', (req, res) => res.render('index'))
app.use('/users',userRoute);

// test dang nhap
app.get('/loginOK',(req,res)=> res.send('ban da dang nhap thanh cong'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))