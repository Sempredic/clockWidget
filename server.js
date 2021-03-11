function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const dotenv = require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();

//app.use(requireHTTPS);

app.use(express.static('./dist/my-first-project'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/', function(req, res) {
    res.sendFile('index.html', {root: 'dist/my-first-project/'});
});

const pool = new Pool({
connectionString: process.env.DATABASE_URL,
 ssl: {
  rejectUnauthorized: false
 }
});


app.get('/api/convos', function (req, res) {
  console.log('IN');
  pool.query('SELECT Name FROM salesforce.ConvoObj__c;', (error, results) => {
    if (error) {
      console.log("Error - Failed to select all from Users");
      console.log(error);
    }else{
        console.log(results.rows);
    }
    res.status(200).json(results.rows)
  });
})


app.listen(process.env.PORT);
