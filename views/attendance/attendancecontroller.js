angular
  .module('attendancecontroller',[])
  .controller('attendancecntrl',function($scope,rq,$localStorage){
    // getting attendace from firebase
    firebase.database().ref('/Students/' + $localStorage.uid + '/attendance/').on('value',function(snapshot) {
      $scope.mycourses  = snapshot.val()
      $('#loading').removeClass('loader');
      console.log("firebaes response");
    });
    firebase.database().ref('/Students/' + $localStorage.uid + '/hibiscus').once('value').then(function(snapshot) {
      $scope.data = {
        'uid':snapshot.child("sid").val(),
        'pwd':snapshot.child("pwd").val()
      }
      // making resquest to get all the courses
      rq.post('/api/hibi/attendence',$scope.data)
      .then(function successCallback(response){
      // $('#loading').removeClass('loader');
      // $scope.mycourses = response.data.Notices
      console.log("sever response");
      i = 0;
      while(i < response.data.Notices.length){
        firebase.database().ref('/Students/' + $localStorage.uid + '/attendance/' + i).set({
          'attend':response.data.Notices[i].attendance,
          'name':response.data.Notices[i].name,
          'sub':response.data.Notices[i].sub,
          'subcode':response.data.Notices[i].subcode
        });
        i++;
      }

        },function errorCallback(response){
        // console.log("errro");
      })

      })

  })
