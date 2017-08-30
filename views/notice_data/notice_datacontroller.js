angular
  .module('notice_datacontroller',['ngStorage','ngSanitize'])
  .controller('notice_datacntrl',function($scope,rq,$localStorage,$sce){

    data= $localStorage.fundata;
    $scope.notice = data;



      firebase.database().ref('/Students/' + $localStorage.uid + '/hibiscus').once('value').then(function(snapshot) {
          $scope.data = {
            'uid':snapshot.child("sid").val(),
            'pwd':snapshot.child("pwd").val()
          }
          firebase.database().ref('/NoticeData/' + data.id).once('value').then(function(snapshot) {
           if(snapshot.val() != null) // if there is a response
           {
             $scope.notice_data = snapshot.val().notice;
             $('#loading').removeClass('loader');
             console.log("firebase's response");
             $scope.$apply();

           }else {
            var da  = {
              "id": data.id,
              "uid" : $scope.data.uid,
              "pwd" : $scope.data.pwd
            }
            rq.post('/api/hibi/notice_data',da)
            .then(function successCallback(response){
              $scope.notice_data = response.data.Notices[0].notice_data
              console.log(response);
              $('#loading').removeClass('loader');
             // writing notice data to the firebase database
             firebase.database().ref('/NoticeData/' + da.id).set({
               notice: response.data.Notices[0].notice_data
               });
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
