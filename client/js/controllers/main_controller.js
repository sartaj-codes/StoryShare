var app = angular.module("app", [] );

app.controller('main_page', function($scope, $http){
 $scope.error_flag   = true;
 $scope.success_flag = true;
  var request = true;
  
  
  $http({
      url    : '/user/getuser',
      method : 'GET',
  }).then(function(response)
  {
     $scope.uid      = response.data._id;
     $scope.username = response.data.username;  
     $scope.points   = response.data.points; 
  });
 

$scope.createUser = function(){
    
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
   /*-------------------------------------------------------------------------*/
   $http({
      url : '/user/getUsername/' + $scope.user_n,
      method : 'GET',
   }).then(function(response){
     var val = response.data;
    if(val != "null"   )
    {
         $scope.error_message = "Username is already used !!";
         $scope.success_flag  = true;
         $scope.error_flag    = false; 
    }
  
     else
     {
    /*--------------------------------------------------------------------*/
       $scope.error_message = "You are Registered successfully !!";
       $scope.success_flag  = false;
       $scope.error_flag    = true;
       $http({
		     url : '/user/register',
		     method :'POST',
		     data : $scope.data
	     }).then(function(response){
		    console.log("User Registered !!");
	     });
 /*-------------------------------------------------------------------------*/
     }
   });
  }
 }

});

