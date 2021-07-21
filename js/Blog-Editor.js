var app = angular.module('blog-editor', []);
app.controller('create-post', function($scope, $http) {
    console.log("button pressed");
    $scope.title = null;
    $scope.content = null;
    $scope.postData = function(title, content) {
        var data = {
            title: title,
            content: content
        };
        $http.post('http://localhost:8080/api/posts', JSON.stringify(data))
            .then(function(response) {
                $scope.msg = "Post sent successfully!";
            }, function(response) {
                $scope.msg = "Error sending new post!"
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
                $scope.headers = response.headers();
            });
    };
});