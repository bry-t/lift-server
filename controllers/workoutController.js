const Express = require('express');
const { route } = require('express/lib/application');
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

module.exports = router;