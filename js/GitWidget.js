var app = angular.module('gitWidget', []);
app.controller('git', function($scope, $http, $q) {
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
        $scope.techs = [];
        for(let i = 0; i< $scope.projects.length; i++){
            $http({method:'GET', url: $scope.projects[i].languages}).then(function success(response){
                $scope.projects[i].languages = extractToString(Object.keys(response.data));
                // $scope.projects[i].languages = Object.keys(response.data);
            });
        }
    });
});



function retProjects(data) {
    let projects = [];
    for (x in data) {
        projects.push({ repo: data[x].name, description: data[x].description, url: data[x].html_url, languages: data[x].languages_url });
    }
    return projects
}

function extractToString(data){
    let langs = "";
    for(x in data){
        langs += data[x]
        if(x < data.length){
            langs+= " ";
        }
    }
    return langs;
}