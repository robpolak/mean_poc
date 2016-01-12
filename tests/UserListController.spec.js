'use strict';

describe('Controller: public/UserListCtrl', function() {
    var $rootScope, $scope;
    var $controller, service;

    var mockWebsite = {
        $get: function(rel) {}
    };

    var mockUserList = [
        {
            _id: '12345',
            fname: 'John',
            lname: 'Smith',
            phone: '1234567890'
            $get: function(rel) {}
        },
        {
            _id: '54321',
            fname: 'Jane',
            lname: 'Doe',
            phone: '0987654321'
            $get: function(rel) {}
        }
    ];

    beforeEach(module('meanpocControllers'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$q_, _WebsiteService_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        service = _WebsiteService_;

        var websiteDeferred = _$q_.defer();
        websiteDeferred.resolve(mockWebsite);
        spyOn(service, 'load').andReturn(websiteDeferred.promise);

        var userListDeferred = _$q_.defer();
        userListDeferred.resolve(mockUserList);
        spyOn(mockWebsite, '$get').andReturn(userListDeferred.promise);

        $controller('UserListCtrl',
            {'$rootScope' : $rootScope, '$scope': $scope, 'WebsiteService': service});
        $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
    }));

    describe('UserListCtrl loadUserList function', function() {
        it('should have two users and first one is John Smith.', function() {
            expect($scope.users.length).toEqual(2);
            expect($scope.users[0].fname).toEqual('John');
            expect($scope.users[0].lname).toEqual('Smith');
        });

        it('should have second user with name Jane Doe', function() {
            expect($scope.users[1].fname).toEqual('Jane');
            expect($scope.users[1].lname).toEqual('Doe');
        });

    });
});