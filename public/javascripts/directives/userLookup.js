/**
 * Directive that looks up a user based on their id
 */
var meanpocControllers = angular.module('meanpocControllers');

meanpocControllers.directive('userLookup', ['$http',
    function ($http){
        return {
            scope: {
                userid: '@userid'
            },
            controller:function($scope){
                $http.get('users/userdetails/' + $scope.userid).then(function (data) {
                    $scope.user = data;
                    console.info($scope.user.fname);
                }, function(data){
                    console.log("Error in userLookup");
                });
            }
        }
}]);