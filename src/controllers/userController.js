const controller = {}

controller.getList = (async (req, res) => {
    res.send('User GET List')
});

controller.getId = (async (req, res) => {
    res.send(' User Get ID')
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