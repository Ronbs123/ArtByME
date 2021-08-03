const express = require('express')
const path = require('path')
const app = express()
// connect to db
express.static('public')

// TODO make a general calls for HTML and JS files instead of this
app.get('*.css', express.static('./static/style/'))
app.get('*.html', express.static('./static/html/'))
app.get('*.PNG', express.static('./static/'))
app.get('*.JPG', express.static('./static/'))
app.get('*.js', express.static(__dirname)) //does not work

// regestration route

app.post('/login/:user/:pass', (req,res)=>{ // LogIn route
    const argUserName = req.params.user
    const argPassword = req.params.pass
    const user = localStorage.getItem(argUserName)
    const data = JSON.parse(user.toString())
    console.log(data)
    if(data != undefined){ // check if the user is in the localStorage
        if(data.password !== argPassword) { // check if the password fits
            alert("wrong password, try again") // counter for how many times tried to LogIn
        } else {
            addTimeToLogInActivity(data)
            // send cookie
            res.status(200).send({result:true, user:data}) 
        }
    } else {
        res.status(200).send({result:false})
    }
})

function addTimeToLogInActivity(data){
    const currentDateAndTime = new Date();
    const datetime = "Last Sync: " + currentDateAndTime.getDate() + "/"
        + (currentDateAndTime.getMonth()+1)  + "/"
        + currentDateAndTime.getFullYear() + " @ "
        + currentDateAndTime.getHours() + ":"
        + currentDateAndTime.getMinutes() + ":"
        + currentDateAndTime.getSeconds();
    data.logInActivity.push(datetime)
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