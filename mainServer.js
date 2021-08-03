const express = require('express')
const uuidModule = require('uuid') // for cookies !
const port = process.env.PORT || 7707;
const myExpress = require('./myExpress.js');
const app = express()

app.use(`/`, myExpress);

app.listen(port, () => {
    console.log(`server start listening on port: ${port}`);
});


