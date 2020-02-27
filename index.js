const express = require('express')
const app = express()
const port = 8080

var userRoute = require('./routes/user.route');
app.set('view engine', 'ejs');
app.set('views','./views');

var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URL);
mongoose.connect('mongodb://localhost/express-demo', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.get('/', (req, res) => res.render('index'))
app.use('/users',userRoute);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))