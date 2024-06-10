const expressAsyncHandler = require("express-async-handler");

const getHome = expressAsyncHandler((req, res) => {
res.send(200).send('welcome to homepage')
})

module.exports = {getHome}