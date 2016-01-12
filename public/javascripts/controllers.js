'use strict';

/* Controllers */

var meanpocControllers = angular.module('meanpocControllers', []);

meanpocControllers.controller('UserListCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.formData = {};

        $scope.hoveredRow = null;  // initialize our variable to null
        $scope.setHoveredRow = function(index){  //function that sets the value of selectedRow to current index
            $scope.hoveredRow = index;
        };

        $scope.unsetHoveredRow = function(index){
            $scope.hoveredRow = null;
        };

        var loadUserList = function(){
            $http.get('users/userlist').success(function(data) {
                $scope.users = data;
            })
        };
        loadUserList();

        $scope.addUser = function() {
            $http.post('/users/adduser', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.users = data;
                    console.log(data);
                    $scope.userForm.$setPristine();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.saveUser = function() {
            $http.put('/users/saveuser', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.users = data;
                    console.log(data);
                    $scope.userForm.$setPristine();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.deleteUser = function(obj) {
            var uid = obj.target.attributes.data.value;
            var useridJson = angular.toJson({'id': uid});

            $http.post('/users/deleteuser', useridJson)
                .then(function(deleteresponse) {
                },
                function(deleteresponse) {
                    console.log('Error: ' + deleteresponse.data);
                });
            loadUserList();
        };

        $scope.query = '';

        $scope.search = function (user) {
            var query = $scope.query.toLowerCase(),
                fullname = user.fname.toLowerCase() + ' ' + user.lname.toLowerCase() + ' ' + user.phone;

            if (fullname.indexOf(query) != -1) {
                return true;
            }
            return false;
        };



    }]);

meanpocControllers.controller('UserDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.userId = $routeParams.userId;
    }]);
