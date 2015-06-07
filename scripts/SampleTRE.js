var treApp = angular.module("app", ["ngResource", "ngRoute"]);

treApp.controller("appController", ["$scope", function ($scope) {
    $scope.Message = 'Hello from VS 2015 TRE sample';
}]);


treApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
        when("/home", {
            templateUrl: "/views/hello.html",
            controller: "appController"
        }).
    otherwise({
        redirectTo: "/home"
    });
}]);
