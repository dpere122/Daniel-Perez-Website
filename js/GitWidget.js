var app = angular.module('gitWidget', []);
app.controller('git', function($scope, $http) {
    $http({
        method: "GET",
        url: `https://api.github.com/users/dpere122/repos`
    }).then(function success(response) {
        $scope.projects = retProjects(response.data);
    }, function error(response) {
        $scope.projects = response.statusText;
    });
});

function retProjects(data) {
    let projects = [];
    for (x in data) {
        projects.push({ repo: data[x].name, description: data[x].description, url: data[x].html_url, languages: data[x].languages_url });
    }
    return projects
}