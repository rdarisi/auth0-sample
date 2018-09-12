const router = require('express').Router();
const data = require('./data');
const auth = require('./auth');

router.get('/items', auth.hasScope('items:read'), (req, res) => {
    console.log(req.user);
    res.status(200).json(data.things);
});

router.post('/items', auth.hasScope('items:write'), (req, res) => {
    var id = data.things[data.things.length - 1].id;
    req.body["id"] = id + 1;
    data.things.push(req.body);
    res.status(200).json(data.things);
});

router.delete('/items/:id', auth.hasScope('items:delete'), (req, res) => {
    var id = parseInt(req.params.id);
    data.things = data.things.filter(i => i.id != id);
    res.status(200).json(data.things);
});


module.exports = router;