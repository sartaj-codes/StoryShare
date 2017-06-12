var app1 = angular.module("feed_app", [] );

app1.controller('feeds_Page', function($scope, $http){
  $scope.stories = [];
  
  $http({
  	  url    : '/user/getuser',
      method : 'GET',
  }).then(function(response)
  {
     $scope.uid      = response.data._id;
     $scope.username = response.data.username;   
  });

 $http({
 	url   : '/feeds/getStories',
 	method: 'GET',
 }).then(function(response){
     $scope.stories = response.data;  
     //console.log(response);
 });




    $scope.addStory = function()
    {
       $scope.data = {
       	 id    : $scope.uid,
       	 usern : $scope.username,
       	 title : $scope.title,
       	 story : $scope.story,
       }
       console.log($scope.data);
       $http({
       	  url    :'/feeds/addStory',
       	  method :'POST',
       	  data   : $scope.data
       }).then(function(response){

       });
    }




});