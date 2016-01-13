var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET fatherlist.
 */
router.get('/fatherlist/:id', function(req, res) {
    var db = req.db;
    var ignoreUid = req.params.id
    var collection = db.get('userlist');
    collection.find({_id: { $ne: ignoreUid }, gender: 'M'},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET motherlist.
 */
router.get('/motherlist/:id', function(req, res) {
    var db = req.db;
    var ingoreUid = req.params.id;
    var collection = db.get('userlist');
    collection.find({_id: { $ne: ignoreUid }, gender: 'F'},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET userdetails.
 */
router.get('/userdetails/:id', function(req, res) {
    var db = req.db;
    var userToSee = req.params.id;
    var collection = db.get('userlist');
    collection.findOne(userToSee,function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        if (err)
        res.send(err);

        collection.find({},{},function(e,docs){
            res.json(docs);
        });
    });
});

/*
 * PUT to edituser.
 */
router.post('/saveuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToEdit = req.params.id;
    collection.updateById(userToEdit, req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.post('/deleteuser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.body.id;
    collection.remove({ '_id' : userToDelete }, function(err, result) {
        if (err)
            res.send(err);
    });
});

module.exports = router;
