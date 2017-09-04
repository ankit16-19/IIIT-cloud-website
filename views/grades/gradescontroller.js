angular
  .module('gradescontroller',[])
  .controller('gradescntrl',function($scope,$localStorage,rq){
    $scope.test = "test for grades"


    firebase.database().ref('/Students/' + $localStorage.uid + '/grades/html').once('value').then(function(snapshot) {

      $scope.grades  = snapshot.val();
      $('#loading').removeClass('loader');
      console.log("firebaes response");
    });
    firebase.database().ref('/Students/' + $localStorage.uid + '/hibiscus').once('value').then(function(snapshot) {
      $scope.data = {
        'uid':snapshot.child("sid").val(),
        'pwd':snapshot.child("pwd").val()
      }
      rq.dcrypt($scope.data.pwd).then(function successCallback(response){
      $scope.data.pwd = response.data
      // making resquest to get all the courses
      rq.post('/api/hibi/view_grades',$scope.data)
      .then(function successCallback(response){
      console.log("sever response");
        firebase.database().ref('/Students/' + $localStorage.uid + '/grades/').set({
          'html':response.data.Notices[0].html,

        });


        },function errorCallback(response){
        // console.log("errro");
      })

      })

      })
  })
