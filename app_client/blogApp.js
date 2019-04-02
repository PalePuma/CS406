var app = angular.module('blogApp', ['ngRoute']);

//*** Router Provider ***
app.config(['$routeProvider', function($routeProvider) { 
  $routeProvider
	.when('/', {
	   templateUrl: 'blog-home',
	   controller: 'HomeCtrl',
	   controllerAs: 'vm'
	})
	.when('/blog-list', {
	   templateUrl: 'blog-list',
	   controller: 'ListCtrl',
	   controllerAs: 'vm'
	})
	.when('/add-blog', {
	   templateUrl: 'add-blog',
	   controller: 'AddCtrl',
	   controllerAs: 'vm'
	})
	.when('/delete-blog/:id', {
	   templateUrl: 'delete-blog',
	   controller: 'DeleteCtrl',
	   controllerAs: 'vm'
	})
	.when('/edit-blog/:id', {
	   templateUrl: 'edit-blog',
	   controller: 'EditCtrl',
	   controllerAs: 'vm'
	})
	.otherwise({redirectTo: '/'});
}]);

//*** Controllers ***
app.controller('HomeCtrl', function HomeCtrl() {
	var vm = this;
	vm.pageHeading = "David's Blog";
});

app.controller('ListCtrl', function ListCtrl($http) {
	var vm = this;
	vm.pageHeading = "Blog List"; 

	blogsListAll($http)
	  .then(function onSuccess(response) {
	    vm.blogs = response.data;
	    vm.message = "Blog data found.";
	  })
	  .catch(function onError(response) {
	    vm.message = "Error: Could not get the blog list.";
	  });
});

app.controller('AddCtrl', function AddCtrl($http) {
	var vm = this;
	vm.pageHeading = "Add Blog";
	vm.data = {
		title: '',
		text: '',
		date: null
	};
	
	vm.submit = function() {
	  vm.data.title = userForm.title.value;
	  vm.data.text = userForm.text.value;
	  vm.data.date = Date.now();

	  blogsCreate($http, vm.data)
	    .then(function onSuccess(response) {
	      console.log("Success! Status: "+response.status);	 
     	      console.log(response.data);
	    })
	    .catch(function onError(response) {
	      console.log("Error! HTTP Status: "+response.status);	       
	      console.log(response.data);
	    });
	}
});

app.controller('DeleteCtrl', ['$http', '$routeParams', function DeleteCtrl($http, $routeParams) {
	var vm = this;
	vm.pageHeading = "Delete Blog";
	vm.id = $routeParams.id;
	vm.blog = {};

	blogsReadOne($http, vm.id)
	    .then(function onSuccess(response) {
	      vm.blog = response.data;
	      console.log("Success! Status: "+response.status);	 
     	      console.log(response.data);
	    })
	    .catch(function onError(response) {
	      console.log("Error! HTTP Status: "+response.status);	       
	      console.log(response.data);
	    });

	vm.submit = function() {
	  blogsDeleteOne($http, vm.id)
	    .then(function onSuccess(response) {
	      console.log("Successful Deletion! Status: "+response.status);	  
	      console.log(response.data);
	    })
	    .catch(function onError(response) {
	      console.log("Error! HTTP Status: "+response.status);	       
	      console.log(response.data);
	    });
	}
}]);

app.controller('EditCtrl', ['$http', '$routeParams', function EditCtrl($http, $routeParams) {
	var vm = this;
	vm.pageHeading = "Edit Blog";
	vm.id = $routeParams.id;
	vm.oldData = {};
	vm.newData = {};

	blogsReadOne($http, vm.id)
	    .then(function onSuccess(response) {
	      vm.oldData = response.data;
	      console.log("Success! Status: "+response.status);	 
     	      console.log(response.data);
	    })
	    .catch(function onError(response) {
	      console.log("Error! HTTP Status: "+response.status);	       
	      console.log(response.data);
	    });

	vm.submit = function() {
 	  vm.newData.title = userForm.title.value;
	  vm.newData.text = userForm.text.value;
	  vm.newData.date = Date.now();	  
          
	  blogsUpdateOne($http, vm.id, vm.newData)
	    .then(function onSuccess(response) {
	      console.log("Successful Update! Status: "+response.status);	  
	      console.log(response.data);
	    })
	    .catch(function onError(response) {
	      console.log("Error! HTTP Status: "+response.status);	       
	      console.log(response.data);
	    });
	}
}]);

//*** REST Web API functions ***
function blogsListAll($http) {
	return $http.get('/api/blogs');
}

function blogsCreate($http, data) {
	return $http.post('/api/blogs/', data);
}

function blogsReadOne($http, id) {
	return $http.get('/api/blogs/' + id); 
}

function blogsUpdateOne($http, id, data) {
	return $http.put('/api/blogs/' + id, data);
}

function blogsDeleteOne($http, id) {
	return $http.delete('/api/blogs/' + id); 
}
