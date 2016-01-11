/**
 * Directive that looks up a user based on their id
 */
var meanpocControllers = angular.module('meanpocControllers', []);

meanpocControllers.directive('userLookup', function (userid){
        'use strict';
    var db = req.db;
    var collection = db.get('userlist');
    collection.findByID({userid},function(e,docs){
        res.json(docs);
        console.log(docs);
    });
});