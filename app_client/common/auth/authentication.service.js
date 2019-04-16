var app = angular.module('blogApp');

//*** Authentication Service ***
app.service('authentication', authentication);
authentication.$inject = ['$window', '$http'];

function authentication ($window, $http) {

  var saveToken = function (token) {
	$window.localStorage['blog-token'] = token;
  };

  var getToken = function () {
	return $window.localStorage['blog-token'];
  };

  var register = function (user) {
	console.log('Registering user ' + user.email + ' ' + user.password);

	return $http.post('/api/register', user)
	   .then(function onSuccess(response) {
		saveToken(response.data.token);
	});
  };

  var login = function(user) {
	console.log('Attempting to login user ' + user.email + ' ' + user.password);

	return $http.post('api/login', user)
	   .then(function onSuccess(response) {
		saveToken(response.data.token);
     });
  };

  var logout = function() {
	$window.localStorage.removeItem('blog-token');
  };

  var isLoggedIn = function() {
    var token = getToken();
    if(token){
	var payload = JSON.parse($window.atob(token.split('.')[1]));
	return payload.exp > Date.now() / 1000;
    } else {
	return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()) {
	var token = getToken();
	var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
		email: payload.email,
		name: payload.name
	       };
    }
  };

  return {
	saveToken: saveToken,
	getToken: getToken,
	register: register,
	login: login,
	logout: logout,
	isLoggedIn: isLoggedIn,
	currentUser: currentUser
  };
}



app.controller('RegisterCtrl', [ '$http', '$location', 'authentication', function RegisterCtrl($htttp, $location, authentication) {
    var vm = this;
    
    vm.pageHeading = {
      title: 'Create New Account'
    };
    
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    
    vm.returnPage = $location.search().page || '/';
    
    vm.submit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again.";
        return false;
      } else {
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .then(function(){
          $location.search('page', null); 
          $location.path(vm.returnPage);
        })
        .catch(function(err){
           vm.formError = "Error registering. Try again with a different email address."        
        });
    };
}]);

app.controller('LoginCtrl', [ '$http', '$location', 'authentication', function LoginCtrl($htttp, $location, authentication) {
    var vm = this;

    vm.pageHeading = {
      title: 'Sign In'
    };

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.submit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
           vm.formError = "All fields required, please try again";
        return false;
      } else {
           vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
	.then(function() {
          $location.search('page', null);
          $location.path(vm.returnPage);
        })
	.catch(function(response) {
	  var obj = response.data;
	  vm.formError = obj.message;	  
	});
    };
 }]);
