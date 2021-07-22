var app = angular.module('blog-editor', []);

app.controller('create-post', function($scope, $http) {
    $scope.title = null;
    $scope.content = null;
    $scope.loadPosts = function() {
        $http.get("http://localhost:8080/api/posts/getall")
            .then(function(response) {
                $scope.posts = response.data;
            });
    }
    $scope.deletePost = function(id) {
        $http.delete('http://localhost:8080/api/posts/delete/' + id)
            .then(function(response) {
                console.log(response.data);
            });
    };
    $scope.postData = function(title, content) {
        var data = {
            title: title,
            content: content
        };
        if (data.title != null && data.content != null) {
            $http.post('http://localhost:8080/api/posts', JSON.stringify(data))
                .then(function(response) {
                    $scope.msg = "Post sent successfully!";
                }, function(response) {
                    $scope.msg = "Error sending new post!"
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                });
        } else {
            alert("Please enter a title and your post content to send the Post.");
        }

    };
});