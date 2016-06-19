(function() {
        angular
            .module('myApp')
            .controller('CommentsCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
                $scope.comments = {
                    book: $rootScope.bookId,
                    text: $scope.text,
                    postedBy: $rootScope.name,
                    email_id: $rootScope.email,
                    approved: false
                };
                $http.get("http://localhost:3000/books/" + $rootScope.bookId)
                    .then(function(response) {
                        $scope.book = response.data;
                    });
                $scope.submit = function() {
                    var book_id = $rootScope.bookId;
                    console.log(book_id);
                    var user = $rootScope.user;
                    $http
                        .post("http://localhost:3000/books/" + book_id + "/comments/", $scope.comments)
                        .success(function(data) {
                            $scope.comments = {}; // clear the form so our user is ready to enter another
                            return $scope.text = '';
                            console.log($rootScope.bookId);
                            console.log($rootScope.user);
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                            console.log($scope.comments)
                        });
                };
            }]);
    }
    .call(this));
