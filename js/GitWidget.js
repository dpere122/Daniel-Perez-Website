var app = angular.module('gitWidget', []);
app.controller('git', function($scope, $http,$q) {
    // $http({
    //     method: "GET",
    //     url: 
    // }).then(function success(response) {
    //     $scope.projects = retProjects(response.data);
    // }, function error(response) {
    //     $scope.projects = response.statusText;
    // });
    $http({method:"GET",url: `https://api.github.com/users/dpere122/repos`}).then(function success(response){
        $scope.projects = retProjects(response.data);
        console.log($scope.projects[0].languages);
        $scope.techs = [];
        for(let i = 0; i< $scope.projects.length -1; i++){
            $http({method:'GET', url: $scope.projects[i].languages}).then(function success(response){
                $scope.techs.push(response.data);

            });
        }
        console.log($scope.techs);
    });
});



function retProjects(data) {
    let projects = [];
    for (x in data) {
        projects.push({ repo: data[x].name, description: data[x].description, url: data[x].html_url, languages: data[x].languages_url });
    }
    return projects
}