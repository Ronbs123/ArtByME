const express = require('express')
const path = require('path')
const Datastore = require('nedb')
const app = express()
express.static('public')

// Set Connection to the db
const database = new Datastore('database.db')
database.persistence.setAutocompactionInterval(5)
database.loadDatabase()

// TODO make a general calls for HTML and JS files instead of this
app.get('*.css', express.static('./static/style/'))
app.get('*.html', express.static('./static/html/'))
app.get('*.PNG', express.static('./static/'))
app.get('*.JPG', express.static('./static/'))
app.get('*.js', express.static(__dirname)) //does not work

app.post('/register/:user/:pass', (req,res)=>{ // Register route
    console.log('Server started regesteration process')
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
                // send cookie
                res.status(200).send({result:'userFound'})
            }
        }
    })
})

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

app.use('/',express.static(path.join(__dirname + '/scripts/HomePage.js')))

module.exports = app