app.controller('UserCommentsTableCtrl', ['$scope', '$http', '$state', '$cookies', '$window',
  function($scope, $http, $state, $cookies, $window) {
    $scope.sortType = 'id'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    $scope.selectCountObj = {
      '1': '5',
      '2': '10',
      '3': '15',
      '4': '20'
    }
    $scope.selectCount = {
      'selected': '5'
    }

    $scope.getStatus = function(status) {
      var statuses = {
        'Unsolved': 'Не вирішено',
        'Solved': 'Вирішено'
      };
      return statuses[status];
    };


    $scope.loadComments = function() {
      var user_id = $cookies.get('id');
      $scope.msg = msg;
      $scope.fromPage = 1;
      $scope.bigCurrentPage = 1;
      $scope.commentsCount = $scope.selectCount['selected'];
      $scope.bigTotalItems = $scope.commentsCount / $scope.selectCount['selected'] * 10;
      $scope.$watch('bigCurrentPage', function(newValue, oldValue) {
        var stepCount = $scope.selectCount['selected']
        if ($cookies.get('role')=='admin'){
          $http({
            method: 'GET',
            url: 'api/all_users_comments',
            params: {
              per_page: $scope.selectCount['selected'],
              offset: $scope.selectCount['selected'] * newValue - stepCount,
            }
          }).then(function successCallback(response) {
            $scope.comments = response.data[0];
            console.log(response.data[1][0])
            $scope.commentsCount = response.data[1][0]['total_comments_count'];
            $scope.bigTotalItems = $scope.commentsCount / $scope.selectCount['selected'] * 10;
          })
        } else {
          console.log(user_id) 
          $http({
            method: 'GET',
            url: 'api/user_comments/' + user_id,
            params: {
              per_page: $scope.selectCount['selected'],
              offset: $scope.selectCount['selected'] * newValue - stepCount,
            }
          }).then(function successCallback(response) {
            console
           $scope.comments = response.data[0];
           $scope.commentsCount = response.data[1][0]['total_comments_count'];
           $scope.bigTotalItems = $scope.commentsCount / $scope.selectCount['selected'] * 10;
         })
        }
      })
    };

    $scope.loadComments();

    $scope.triggerDetailModal = function(problem_id) {
      var url = '/#/detailedProblem/' + problem_id;
      window.open(url, '_blank');
    }
  }
]);
