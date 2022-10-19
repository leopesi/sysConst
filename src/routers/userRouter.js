const router = require('express').Router();

const controller = require('../controllers/userController')

router.get('/usuario/', controller.getList);
router.get('/usuario/:id/', controller.getId );
router.post('/usuario/create/', controller.post);
router.put('/usuario/:id/', controller.put);
router.delete('/usuario/:id/', controller.delete);

module.exports = router