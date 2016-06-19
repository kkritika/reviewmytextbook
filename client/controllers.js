angular.module('myApp').controller('loginController', ['$scope', '$location', 'AuthService', '$rootScope', '$http',
    function($scope, $location, AuthService, $rootScope, $http) {

        $scope.login = function() {

            // initial values
            $scope.error = false;
            $scope.disabled = true;
            $rootScope.user = $scope.loginForm.username;
            var getdata = function() {

                $http.get("http://localhost:3000/user/" + $rootScope.user)
                    .then(function(response) {
                        console.log(response.data[0].name)
                        $rootScope.name = response.data[0].name;
                        $rootScope.email = response.data[0].email;
                    });
            }

            // call login from service
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function() {
                    
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    AuthService.getUserStatus()
                        .then(function() {
                            if (AuthService.isLoggedIn()) {
                                alert('Logged in successfully')
                                $location.path('/comment');
                                getdata();
                            }
                        });

                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    alert('Please enter valid credentials');

                });
        };

        $scope.adminlogin = function() {

            // initial values
            $scope.error = false;
            $scope.disabled = true;
            $rootScope.user = $scope.loginForm.username;
            var getdata = function() {

                $http.get("http://localhost:3000/user/" + $rootScope.user)
                    .then(function(response) {
                        console.log(response.data[0].name)
                        $rootScope.name = response.data[0].name;
                        $rootScope.email = response.data[0].email;
                    });
            }

            // call login from service
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function() {
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    AuthService.getUserStatus()
                        .then(function() {
                            if (AuthService.isLoggedIn()) {
                                alert('Logged in successfully')
                                $location.path('/admin');
                            }
                        });
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    alert('Please enter valid credentials');

                });
        };
    }
]);

angular.module('myApp').controller('logoutController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.logout = function() {
            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/');
                });
        };
    }
]);

angular.module('myApp').controller('registerController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.register = function() {

            $scope.error = false;
            $scope.disabled = true;

            AuthService.register($scope.registerForm.name,$scope.registerForm.email,$scope.registerForm.username, $scope.registerForm.password)
                .then(function() {
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });

        };

    }
]);

