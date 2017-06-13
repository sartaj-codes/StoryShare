var app1 = angular.module("feed_app",  [] );

app1.controller('feeds_Page', function($scope, $http){
  $scope.stories = [];
  var uid_1      = " ";
  $http({
  	  url    : '/user/getuser',
      method : 'GET',
  }).then(function(response)
  {

     $scope.uid      = response.data._id;
     $scope.username = response.data.username;  
     $scope.points   = response.data.points; 
  

 $http({
 	url   : '/feeds/getStories/'+$scope.uid,
 	method: 'GET',
 }).then(function(response){
     $scope.stories = response.data.reverse();  
     console.log($scope.uid);
 });


});

    $scope.addStory = function()
    {
       $scope.data = {
       	 usern : $scope.username,
       	 title : $scope.title,
       	 story : $scope.story,
       }
       console.log($scope.uid);
       $http({
       	  url    :'/feeds/addStory/' + $scope.uid,
       	  method :'POST',
       	  data   : $scope.data
       }).then(function(response){

       });
     /*---------------------------------------------------------*/


       $http({
         url : '/user/getAll/' + $scope.uid,
         method : 'GET',
      }).then(function(response){
       
       console.log(response.data);
        for(var i = 0; response.data != null && i < response.data.length; i++)
        {
            $http({
              url : '/feeds/addStory/' + response.data[i]._id,
              method : 'POST',
              data   : $scope.data
            }).then(function(response){
   
            });

        }
      });
 

  }       

/*******************************************************************************************/
  $scope.voteUser = function(story_id, user_id, username)
  {
  	$scope.data = {
  		storyId : story_id,
  		userId  : user_id,
  		
  	}
  	console.log(user_id);
  	$http({
  		url    : '/feeds/voteUser',
  		method : 'POST',
  		data   : $scope.data
  	}).then(function(response){

         $http({
          url   : '/feeds/getStories/'+$scope.uid,
          method: 'GET',
         }).then(function(response){
            $scope.stories = response.data.reverse();  
           
      });

});


     $http({
     	 url : '/user/addpoints/' + username,
     	 method : 'POST',
     }).then(function(response){
         $scope.points   = response.data.points; 
     });
   }


 $scope.getRank = function()
   {
   	console.log($scope.points);
     
     $http({
     	url : '/user/getalluser',
     	method : 'GET',
     }).then(function(response){
         var getR = 0;
         for(var i = 0; response.data != null , i < response.data.length; i++)
         { 
         	if( $scope.points > response.data[i].points)
               getR++;
         }
         $scope.Rank = response.data.length - getR;

         $scope.earnings = ($scope.points / 100);



    });




   }

/********************************************************************************************/
  });



