const express = require('express')
const path = require('path')
const Datastore = require('nedb')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
express.static('public')

// Use Cookies
app.use(cookieParser())

const database = new Datastore('database.db')
database.persistence.setAutocompactionInterval(5)
database.loadDatabase()
console.log('connected to neDB')

// Set Session
app.use(session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge : 1800000 // 30 min
    }
}))

// test for cookies
// app.get('/HomePage.html', validateCookie, (req, res)=>{
//     console.log('whe')
// })
//test for cookies

// TODO make a general calls for HTML and JS files instead of this
app.get('*.css', express.static('./static/style/'))
app.get('*.html', express.static('./static/html/'))
app.get('*.PNG', express.static('./static/'))
app.get('*.JPG', express.static('./static/'))
app.get('*.js', express.static(__dirname)) //does not work

app.post('/register/:user/:pass', (req,res)=>{ // Register route
    console.log('Server started registration process')
    const argUserName = req.params.user
    const argPassword = req.params.pass
    database.find({"userName": argUserName}, function (err, matchedUsers){
        console.log(matchedUsers)
        if(matchedUsers[0] != null){
            res.status(200).send({result:false})
        } else {
            const newUser = {
                userName:argUserName,
                password:argPassword,
                cart:[],
                purchases:[],
                logInActivity:[]
            }
            database.insert(newUser)
            res.status(200).send({result:true})
        }
    })
})

app.post('/login/:user/:pass', (req,res)=>{ // LogIn route
    console.log('Server started logIn process')
    const argUserName = req.params.user
    const argPassword = req.params.pass
    database.find({"userName": argUserName}, function (err, matchedUsers){
        if(matchedUsers[0] == null){
            res.status(200).send({result:'userNotFound'})
        } else {
            if(matchedUsers[0].password !== argPassword){
                res.status(200).send({result:'wrongPassword'})
            } else {
                addTimeToLogInActivity(matchedUsers[0])
                res.cookie('session_id', req.session.id, {}) // setting cookie with the session id
                res.status( 200).send({result:'userFound'})
                console.log('Logged In successfully')
                console.log(req.sessionID.id + ' session id')
            }
        }
    })
})

app.get('/HomePage.js', (req, res) => {
    res.sendFile('/scripts/HomePage.js', {root: __dirname});
});

app.get('/Index.js', (req, res) => {
    res.sendFile('/scripts/Index.js', {root: __dirname});
});

app.get('/ShoppingCart.js', (req, res) => {
    res.sendFile('/scripts/ShoppingCart.js', {root: __dirname});
});

app.get('/Store.js', (req, res) => {
    res.sendFile('/scripts/Store.js', {root: __dirname});
});

app.get('/Register.js', (req, res) => {
    res.sendFile('/scripts/Store.js', {root: __dirname});
});

function addTimeToLogInActivity(matchedUser){
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    database.update({"userName": matchedUser.userName},{ $push: { logInActivity: datetime } }, function (){})
}

function validateCookie(req, res, next){
    const { cookies } = req;
    if('session_id' in cookies){
        console.log('cookie_id exists')
        console.log(cookies.session_id + ' cookie id')
        console.log(req.session.id + ' session id')
        if(cookies.session_id == req.sessionID.id){ // checking if the cookie id equals to the session id to be authorized
            next()
        } else {
            res.status(403).send({ msg : 'Not Authenticated'})
        }
    } else {
        res.status(403).send({ msg : 'Not Authenticated'})
    }
}

app.use('/',express.static(path.join(__dirname + '/scripts/HomePage.js')))

module.exports = app