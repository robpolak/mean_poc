'use strict';

/* Controllers */

var meanpocControllers = angular.module('meanpocControllers', []);

meanpocControllers.controller('UserListCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.formData = {};

        $scope.hoveredRow = null;  // initialize our variable to null
        $scope.setHoveredRow = function(index){  //function that sets the value of selectedRow to current index
            $scope.hoveredRow = index;
        };

        $scope.unsetHoveredRow = function(index){
            $scope.hoveredRow = null;
        };

        $http.get('users/userlist').success(function(data) {
            $scope.users = data;
        });

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

    }]);

meanpocControllers.controller('UserDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.userId = $routeParams.userId;
    }]);
