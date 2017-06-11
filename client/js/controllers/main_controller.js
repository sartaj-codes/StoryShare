var app = angular.module("app", [] );

app.controller('main_page', function($scope, $http){
 $scope.error_flag   = true;
 $scope.success_flag = true;
  $scope.createUser = function(){
    
    var request = true;
    $scope.data = {
          username : $scope.user_n,
          password : $scope.pass,
	};
  
  	if($scope.user_n == null)
  	{
  		$scope.error_message = "Fill all credentials !!"
  		$scope.error_flag    = false;
  		request = false;
  	}
  	if($scope.user_n.length < 6)
  	{
  		$scope.error_message = "Username length should be 6 or greater !!"
  		$scope.error_flag    = false;
  		request = false;
  	}
  	if($scope.pass.length < 6)
    {
    	$scope.error_message = "Password should be a size 5 or greater !!"
  		$scope.error_flag    = false;
  		request = false;
    }
  	if($scope.pass == null)
    {
    	$scope.error_message = "Fill all credentials !!"
  		$scope.error_flag    = false;
  		request = false;
    }
    if($scope.pass1 == null)
    {
    	$scope.error_message = "Fill all credentials !!"
  		$scope.error_flag    = false;
  		request = false;
    }
    if(!(angular.equals($scope.pass1, $scope.pass)))
    {
    	$scope.error_message = "Password is not matched !!"
  		$scope.error_flag    = false;
  		request = false;
    }

if(request)
  {
    $scope.error_message = "You are Registered successfully !!";
    $scope.success_flag  = false;
    
    $http({
		url : '/user/register',
		method :'POST',
		data : $scope.data
	}).then(function(response){
		console.log("User Registered !!");
	});

  }	
	
}


/*$scope.loginUser = function(){
	$scope.data = {
		username : $scope.luser_n,
		password : $scope.lpass,
	}
    
    $http({
		url : '/user/login',
		method :'POST',
		data : $scope.data
	}).then(function(response){
		console.log("User Registered !!");
	});


};
*/





});