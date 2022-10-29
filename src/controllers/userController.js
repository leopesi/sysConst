const controller = {}
const jwt = require('jsonwebtoken');



controller.getList = (async (req, res) => {
    res.json([{
        id: 1,
        nome: 'Luiz'
    }]);
    console.log('logou')
});

controller.getId = (async (req, res) => {
    res.json([{
        id: 1,
        nome: 'Luiz'
    }])
});

controller.post = (async (req, res) => {
    res.send('User POST')
});

controller.put = (async (req, res) => {
    res.send('User PUT')
});

controller.delete = (async (req, res) => {
    res.send('User Delete')
})

module.exports = controller;