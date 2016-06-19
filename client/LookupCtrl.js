(function() {
    var app, closed, opened;
    opened = 'opened';
    closed = 'closed';
    var getBookId, bookId;
    app = angular.module('myApp')
        .directive('xngFocus', function() {
            return function(scope, element, attrs) {
                return scope.$watch(attrs.xngFocus, function(newValue) {
                    console.log(newValue);
                    return newValue && element[0].focus();
                });
            };
        });

    app.controller('LookupCtrl', ['$scope', '$filter', '$http', '$rootScope', function($scope, $filter, $http, $rootScope) {
        $scope.selected = '';
        $scope.created = false;

        $http.get("http://localhost:3000/books/")
            .then(function(response) {
                $scope.items = response.data;
            });
        $scope.state = closed;
        $scope.change = function() {
            var filtered;
            filtered = $filter('filter')($scope.items, $scope.query);
            return $scope.state = filtered.length > 0 ? opened : 'closed';
        };
        $scope.select = function(item) {
            $scope.selected = item.title;
            $scope.data = item;
            $rootScope.bookId = item._id;
            return $scope.state = closed;
        };
        return $scope.clear = function() {
            $scope.query = '';
            $scope.selected = '';
            return $scope.cleared = true;
        };
    }]);
}.call(this));
