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

        $scope.deleteUser = function(obj) {
            var uid = obj.target.attributes.data.value;
            //console.info(uid);
            //var uid = angular.element(obj).data('uid');
            var useridJson = angular.toJson({'id': uid});

            console.log(useridJson);
            $http.post('/users/deleteuser', useridJson)
                .success(function(data) {
                    $http.get('users/userlist').success(function(data) {
                        $scope.users = data;
                    });
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
