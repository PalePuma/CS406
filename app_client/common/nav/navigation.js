var app = angular.module('blogApp');

//*** Directives ***
app.directive('navigation', navigation);

function navigation() {
    return {
      restrict: 'EA',
      templateUrl: '/common/nav/navigation.html',
      controller: 'NavigationCtrl as navvm'
    };
}

//*** Controller ***
app.controller('NavigationCtrl', ['$location', 'authentication', function NavigationCtrl($location, authentication) {
    var vm = this;
    vm.currentPath = $location.path();

    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }

    vm.currentUser = function()  {
        return authentication.currentUser();
    }

    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    };
}]);
