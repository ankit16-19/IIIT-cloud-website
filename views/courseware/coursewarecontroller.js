angular
  .module('coursewarecontroller',['ngStorage','ngSanitize'])
  .controller('coursewarecntrl',function($scope,rq,$localStorage,$sce){

      firebase.database().ref('/Students/' + $localStorage.uid + '/hibiscus').once('value').then(function(snapshot) {
          $scope.data = {
            'uid':snapshot.child("sid").val(),
            'pwd':snapshot.child("pwd").val()
          }
          firebase.database().ref('/Students/' + $localStorage.uid + '/mycourses/').on('value',function(snapshot) {
           if(snapshot.val() != null) // if there is a response
           {
             $scope.courses = snapshot.val();
             $('#loading').removeClass('loader');
             console.log("firebase's response");
             $scope.$apply();

           }else {
            var da  = {
              "uid" : $scope.data.uid,
              "pwd" : $scope.data.pwd
            }
            rq.post('/api/hibi/mycourse',da)
            .then(function successCallback(response){
              $scope.courses = response.data.Notices
              console.log(response.data.Notices);
              console.log(response);
              $('#loading').removeClass('loader');
             // writing notice data to the firebase database
             for(i in response.data.Notices){
               firebase.database().ref('/Students/' + $localStorage.uid + '/mycourses/' + i).set({
                credits:response.data.Notices[i].credits,
                name:response.data.Notices[i].name,
                professor:response.data.Notices[i].professor,
                id:response.data.Notices[i].id,
                 });
             }
             // if success
             },function errorCallback(response){
               // if error
             })
           }

          });

        });




    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser){
      }else {
        window.location = '#!/'
      }
    });


  })
