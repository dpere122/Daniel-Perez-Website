var app = angular.module('blog-feed', []);
app.controller('feed-controller', function($scope, $http) {
    $http.get("http://localhost:8080/api/posts/getall")
        .then(function(response) {
            $scope.posts = response.data;
            console.log(posts);
        });
});