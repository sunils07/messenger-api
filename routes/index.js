var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    req.io.emit('message', {
        message: "Hello socket"
    });
});

module.exports = router;