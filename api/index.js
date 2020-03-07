const router = require('express').Router(),
apikey = require("../middlewares/apikey"),
controller = require('./controller');

router.get('/info', apikey, controller.getInfo);
router.get('/fee', controller.getFee);
// router.get('/mempool', apikey, controller.getMempool);
router.get('/tx/:txid', apikey, controller.getTX);
router.post('/tx', apikey, controller.sendTX);
router.get('/header/:id', controller.getBlockHeader);
// router.get('/block/:id', apikey, controller.getBlock);

module.exports = router;