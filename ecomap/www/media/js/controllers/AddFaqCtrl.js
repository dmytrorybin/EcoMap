app.controller('AddFaqCtrl', ['$scope','$state', '$http','toaster','$timeout', function($scope, $state, $http, toaster, $timeout){
    $scope.page = {};

    $scope.addPage = function(newPage){
        newPage['is_enabled'] = 1;
        $http({
            method: 'POST',
            url: '/api/addResource',
            data: newPage
        }).then(function successCallback(response){
            toaster.pop('success', 'Інструкцію додано', 'Інструкцію було успішно додано!');
            $state.go('user_profile');
        },
            function errorCallback(){})
    }
}])