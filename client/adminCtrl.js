angular.module('myApp')
    .controller('adminCtrl', ['$scope', '$http', '$rootScope', '$window',
        function($scope, $http, $rootScope, $window) {
            $scope.user = $rootScope.name;
            $scope.emailId = 'abc@user.com'


            $http.get("http://localhost:3000/comments/")
                .then(function(response) { $scope.items = response.data; });
            $scope.approve = function(comment) {
                var stext = comment.text;
                            
                $http.get("http://localhost:3000/books/" + comment.book)
                    .then(function(response) {
                        $scope.book = response.data.title;
                        console.log($scope.book)
                    });
                
                $scope.Subject = 'Book Review';
                $http.put('http://localhost:3000/comments/' + comment._id + '/approve')
                    .then(function() {
                        $scope.bodyText = '\n\n Book Name: \n\n' + $scope.book + '\n' + ' \n\n Review: \n\n' + comment.text;
                        $scope.mailLink = "mailto:" + $scope.emailId + "?subject=" + $scope.Subject + '&body=' + $scope.bodyText;
                        console.log($scope.mailLink);
                        $scope.sendMail = function() {
                            $window.open($scope.mailLink, "_self");
                        };
                       
                        $scope.sendMail();
                    })
                return comment.approved = true;
            };
            
        }
    ]);
