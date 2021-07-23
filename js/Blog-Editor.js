var app = angular.module('blog-editor', []);

app.controller('create-post', function($scope, $http) {
    $scope.title = null;
    $scope.content = null;
    $scope.editMode = false;
    postID = null;
    $scope.loadPosts = function() {
        $http.get("http://localhost:8080/api/posts/getall")
            .then(function(response) {
                $scope.posts = response.data;
            });
    }
    $scope.setText = function(post) {
        postID = post.id;
        $scope.title = post.title;
        $scope.content = post.content;
        $scope.editMode = true;
    };
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
    $scope.putData = function(title, content) {
        var data = {
            title: title,
            content: content
        };
        if ($scope.editMode === true) {
            $scope.editMode = false;
            $http.put('http://localhost:8080/api/posts/edit/' + postID, JSON.stringify(data))
                .then(function(response) {
                    $scope.msg = "Post sent successfully!";
                }, function(response) {
                    $scope.msg = "Error sending new post!"
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                });
        }
    }
});