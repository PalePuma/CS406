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
	.when('/register', {
	   templateUrl: 'register',
	   controller: 'RegisterCtrl',
	   controllerAs: 'vm'
	})
	.when('/login', {
	   templateUrl: 'login',
	   controller: 'LoginCtrl',
	   controllerAs: 'vm'
	})
	.when('/game-list', {
	   templateUrl: 'game-list',
	   controller: 'GameListCtrl',
	   controllerAs: 'vm'
	})
	.when('/new-game', {
	   templateUrl: 'new-game',
	   controller: 'NewGameCtrl',
	   controllerAs: 'vm'
	})
	.when('/play/:id', {
	   templateUrl: 'play',
	   controller: 'PlayCtrl',
	   controllerAs: 'vm'
	})
	.otherwise({redirectTo: '/'});
}]);

//*** Game Controllers ***
app.controller('GameListCtrl', ['$http', 'authentication',
	function GameListCtrl($http, authentication) {
	var vm = this;
	vm.id;
	vm.pageHeading = "Connect Four Games";
	vm.currentUser = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();

	gamesListAll($http)
	  .then(function onSuccess(response) {
	    vm.games = response.data;
	    vm.message = "Game data found.";
	  })
	  .catch(function onError(response) {
	    vm.message = "Error: Could not get the games list.";
	  });

	vm.deleteClick = function(gameID)
	{
		vm.id = gameID;
		console.log("try to delete: " + vm.id);

		gamesDeleteOne($http, vm.id)
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


app.controller('PlayCtrl', ['$http', '$scope', '$interval', '$routeParams', 'authentication',
function PlayCtrl($http, $scope, $interval, $routeParams, authentication) {
	var vm = this;
	vm.id = $routeParams.id;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.game = {};
	vm.gameBoard = [];
	vm.pageHeading = "Play Game";
	vm.buttonGrid = [];
	vm.lastColor = false;

	gamesReadOne($http, vm.id)
		.then(function onSuccess(response) {			
			vm.game = response.data;
			vm.gameBoard = response.data.board;
			console.log("Success! Status: "+response.status);
			console.log(response.data);
		})
		.catch(function onError(response) {
			console.log("Error! HTTP Status: "+response.status);
			console.log(response.data);
	    });

	    vm.dropPiece = function(col) {

	    	var nextEmpty = getEmptyIndex(vm.gameBoard[col]);

	    	var rand = Math.random() >= 0.5;

	    	if(vm.lastColor)
	    	{
	    		vm.lastColor = false;
	    	}
	    	else
	    	{
	    		vm.lastColor = true;
	    	}


	    	if(vm.gameBoard[col][nextEmpty] != null) {
	    		vm.gameBoard[col][nextEmpty].checked = true;

	    		console.log("rand: "+rand);

	    		if(vm.lastColor){
	    			vm.gameBoard[col][nextEmpty].color = "red";
	    		}else{
	    			vm.gameBoard[col][nextEmpty].color = "black";
	    		}
	    	}

	    	gamesUpdateBoard($http, vm.id, vm.gameBoard[col])
	    		.then(function onSuccess(response) {
	    			console.log("Successful Update! Status: "+response.status);
	    			console.log(response.data);
	    		})
	    		.catch(function onError(response) {
	    			console.log("Error! HTTP Status: "+response.status);	       
	    			console.log(response.data);
	    		});

	    	gamesUpdateBoard($http, vm.id, vm.gameBoard[col])
	    		.then(function onSuccess(response) {
	    			console.log("Successful Update! Status: "+response.status);
	    			console.log(response.data);
	    		})
	    		.catch(function onError(response) {
	    			console.log("Error! HTTP Status: "+response.status);	       
	    			console.log(response.data);
	    		});
	    }

	    getEmptyIndex = function(colArr) {
	    	for(i = colArr.length - 1; i >= 0; i--) {
	    		if( !colArr[i].checked ) {
	    			return i;
	    		}
	    	} 	
	    }

	    $scope.callAtInterval = function() {
			console.log("Interval occurred");

			gamesReadOne($http, vm.id)
				.then(function onSuccess(response) {			
					vm.game = response.data;
					vm.gameBoard = response.data.board;
					console.log("Success! Status: "+response.status);
					console.log(response.data);
				})
				.catch(function onError(response) {
					console.log("Error! HTTP Status: "+response.status);
					console.log(response.data);
				});
		}

		$interval( function(){$scope.callAtInterval();}, 1000, 0, true);

}]);

app.controller('NewGameCtrl', ['$http','authentication',
	function NewGameCtrl($http, authentication) {
	var vm = this;
	vm.pageHeading = "Start a New Game";
	vm.currentUser = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    //vm.newGame = {};

    usersListAll($http)
	  .then(function onSuccess(response) {
	    vm.users = response.data;
	    vm.message = "Blog data found.";
	  })
	  .catch(function onError(response) {
	    vm.message = "Error: Could not get the users list.";
	  });



	  vm.submit = function()
	  {
		vm.newGame =
		{
			gameBoard: [],
			win: null,
			name: userForm.p1nick.value + " vs. " + userForm.opponent.value,
			p1:
			{
				nickname: userForm.p1nick.value,
				userEmail: userForm.p1email.value,
				color: "red"
			},
			p2:
			{
				nickname: userForm.opponent.value,
				userEmail: "test@email.com",
				color: "black"
			},
			gameStart: Date.now(),
			gameEnd: Date.now()
		};

		for(i = 0; i < 7; i++){
			var col = []; 
			for(j = 0; j < 6; j++)
			{
				cell = { col: i,
						 row: j, 
						 checked: false,
						 color: null
					   };
			    col.push(cell);
			}
			vm.newGame.gameBoard.push(col);
		}

		console.log(vm.gameBoard);

		gamesCreate($http, authentication, vm.newGame)
			.then(function onSuccess(response) {
				console.log("Success! Status: "+response.status);
				console.log(response.data);
			})
			.catch(function onError(response) {
				console.log("Error! HTTP Status: "+response.status);	       
				console.log(response.data);
			});
	}
}]);

//*** Blog Controllers ***
app.controller('HomeCtrl', function HomeCtrl() {
	var vm = this;
	vm.pageHeading = "MEAN Blogger";
});

app.controller('ListCtrl', ['$http', 'authentication', function ListCtrl($http, authentication) {
	var vm = this;
	vm.currentUser = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
	vm.pageHeading = "Blog List";

	blogsListAll($http)
	  .then(function onSuccess(response) {
	    vm.blogs = response.data;
	    vm.message = "Blog data found.";
	  })
	  .catch(function onError(response) {
	    vm.message = "Error: Could not get the blog list.";
	  });
}]);

app.controller('AddCtrl', ['$http','authentication', function AddCtrl($http, authentication) {
	var vm = this;
	vm.pageHeading = "Add Blog";
	vm.data = {
		title: '',
		text: '',
		date: null,
		author: '',
	 	email: ''
	};
	
	vm.submit = function() {
	  vm.data.title = userForm.title.value;
	  vm.data.text = userForm.text.value;
	  vm.data.date = Date.now();
	  vm.data.author = authentication.currentUser().name;
	  vm.data.email = authentication.currentUser().email;

	  blogsCreate($http, authentication, vm.data)
	    .then(function onSuccess(response) {
	      console.log("Success! Status: "+response.status);	 
     	      console.log(response.data);
	    })
	    .catch(function onError(response) {
	      console.log("Error! HTTP Status: "+response.status);	       
	      console.log(response.data);
alert(response.data);
	    });
	}
}]);

app.controller('DeleteCtrl', ['$http', '$routeParams', 'authentication', function DeleteCtrl($http, $routeParams, authentication) {
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
	  blogsDeleteOne($http, authentication, vm.id)
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

app.controller('EditCtrl', ['$http', '$routeParams', 'authentication', function EditCtrl($http, $routeParams, authentication) {
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
          
	  blogsUpdateOne($http, authentication, vm.id, vm.newData)
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

//*** Users API Functions ***
function usersListAll($http) {
	return $http.get('/api/users');
}

//*** Game API Functions ***
function gamesListAll($http) {
	return $http.get('/api/games');
}

function gamesReadOne($http, id) {
	return $http.get('/api/games/' + id); 
}

// re-add authorization
 

function gamesCreate($http, authentication, data) {
	return $http.post('/api/games/', data, {
		headers: { Authorization: 'Bearer ' + authentication.getToken() }
	});
}

function gamesUpdateBoard($http, id, data) {
	return $http.put('/api/games/' + id, data);
}

function gamesDeleteOne($http, id) {
	return $http.delete('/api/games/' + id); 
}



//*** REST Web API functions ***
function blogsListAll($http) {
	return $http.get('/api/blogs');
}

function blogsCreate($http, authentication, data) {
	return $http.post('/api/blogs/', data, {
		headers: { Authorization: 'Bearer ' + authentication.getToken() }
	});
}

function blogsReadOne($http, id) {
	return $http.get('/api/blogs/' + id); 
}

function blogsUpdateOne($http, authentication, id, data) {
	return $http.put('/api/blogs/' + id, data, {
		headers: { Authorization: 'Bearer ' + authentication.getToken() }
	});
}

function blogsDeleteOne($http, authentication, id) {
	return $http.delete('/api/blogs/' + id, {
		headers: { Authorization: 'Bearer ' + authentication.getToken() }
	}); 
}
