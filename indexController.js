angular
	.module("Main", ['routes','logincontroller','hibicontroller','services','notice_datacontroller','hibilogincontroller','attendancecontroller','gradescontroller','studentnoticeboardcontroller','coursewarecontroller',])
	.controller("indexcntrl", function($scope,$location,rq,$localStorage) {
    $scope.test = "If you can read this mean angular is working hooooreeee!!!";

		$scope.logout = function(){
			firebase.auth().signOut();
			$localStorage.uid = undefined;
		}

// 		$scope.refresh = function(path,da={}){
//
// 		rq.post(path,da)
// 		 .then(function successCallback(response){
// 			console.log("making request");
// 			$scope.notice =  response.data.Notices
// 			console.log("success");
// 			console.log( response.data.Notices);
//
//
// 		},function errorCallback(response){
// 			console.log("errro");
//
// 		})
// }

});
