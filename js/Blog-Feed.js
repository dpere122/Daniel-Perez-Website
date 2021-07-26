var app = angular.module('blog-feed', ['ngSanitize']);
app.controller('feed-controller',
    function($scope, $http, $sce) {
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
                console.log(convertedPosts);

            });
    });