var app = angular.module('blog-feed', ['ngSanitize']);

app.factory('postService', function() {
    let curPost = null;
    return curPost;
});
app.controller('feed-controller', function($scope, $http, $sce, $window, postService) {
    $scope.curPost = null;
    $http.get("http://localhost:8080/api/posts/getall")
        .then(function(response) {
            let convertedPosts = []
            data = response.data;
            for (let counter = 0; counter < data.length; counter++) {
                nPost = {
                    title: data[counter].title,
                    content: $sce.trustAsHtml(data[counter].content)
                };
                convertedPosts.push(nPost);
            }
            $scope.posts = convertedPosts;
        });
    $scope.savePost = function(post) {
        postService.curPost = post;
        $window.location.href = '../blog/blog-post.html';
    };
});
app.controller('post-controller', function($scope, postService) {
    $scope.post = postService.curPost;
    console.log(post);
});