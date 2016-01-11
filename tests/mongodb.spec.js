describe("MongoDB", function(){
    it("is there a server running", function(next){
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://mpoc_user:TinyTrain@ds037415.mongolab.com:37415/mpoc_db',function(err,db) {
            expect(err).toBe(null);
            next();
        });
    })
})
