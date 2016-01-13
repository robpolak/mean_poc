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

        $scope.loadFatherList = function(ignoreEditUser){
            $http.get('users/fatherlist/' + ignoreEditUser).success(function(data) {
                $scope.fathers = data;
            })
        };

        $scope.loadMotherList = function(ignoreEditUser){
            $http.get('users/motherlist/' + ignoreEditUser).success(function(data) {
                $scope.mothers = data;
            })
        };

        loadUserList();
        //loadFatherList('5693e3d1aa32135c2e2ee722');
        //loadMotherList('5693e3d1aa32135c2e2ee722');

        $scope.loadUserDetail = function(obj){
            var uid = obj.target.attributes.data.value;
            $http.get('users/userdetails/' + uid).success(function(data) {
                $scope.formData = data;
            })
            $scope.userForm.$setPristine();
        };

        $scope.addUser = function(obj) {
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

        $scope.saveUser = function(obj) {
            var uid = obj.target.attributes.data.value;

            $http.post('/users/saveuser/' + uid, $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.users = data;
                    console.log(data);
                    $scope.userForm.$setPristine();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            loadUserList();
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
    }])
    .directive('userLookup', ['$http',
        function ($http){
            return {
                scope: {
                    userid: '@'
                },
                controller:function($scope){
                    $http.get('users/userdetails/' + $scope.userid).success(function(data) {
                        $scope.user = data;
                        console.info($scope.user.fname);
                    });
              }
            }
        }]
    );

meanpocControllers.controller('UserDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.userId = $routeParams.userId;
    }]);
