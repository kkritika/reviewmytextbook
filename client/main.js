var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            access: { restricted: true }
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController',
            access: { restricted: false }
        })
        .when('/logout', {
            controller: 'logoutController',
            access: { restricted: true }
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerController',
            access: { restricted: false }
        })
        .when('/comment', {
            controller: 'CommentsCtrl',
            templateUrl: 'partials/comment.html',
            access: { restricted: false }
        })
        .when('/admin', {
            templateUrl: 'partials/admin.html',
            controller: 'adminCtrl',
            access: { restricted: false }
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
