angular
  .module('hibicontroller',["ngStorage"])
  .controller('hibicntrl',function($scope,rq,$window,$localStorage){
    // getting Notices from firebase
    firebase.database().ref('/Notice/').on('value',function(snapshot) {
      $scope.notice = snapshot.val()
      $('#loading').removeClass('loader');
    });

    firebase.database().ref('/Students/' + $localStorage.uid + '/hibiscus').once('value').then(function(snapshot) {
      $scope.data = {
        'uid':snapshot.child("sid").val(),
        'pwd':snapshot.child("pwd").val()
      }

      rq.post('/api/hibi/notice',$scope.data)
      .then(function successCallback(response){
      console.log("server");
        if(response.data.Notices != ""){
          for(i=0;i<50;i++){
            // writing notice data to the firebase database
            firebase.database().ref('/Notice/' + i).set({
              attention:response.data.Notices[i].attention,
              date:response.data.Notices[i].date,
              id: response.data.Notices[i].id,
              posted_by: response.data.Notices[i].posted_by,
              title: response.data.Notices[i].title
            });

            if(i == 0){
              firebase.database().ref('/Notices/').set({
                attention:response.data.Notices[i].attention,
                date:response.data.Notices[i].date,
                id: response.data.Notices[i].id,
                posted_by: response.data.Notices[i].posted_by,
                title: response.data.Notices[i].title
              });
            }

          }
        }
        },function errorCallback(response){
        // console.log("errro");
      })


      $scope.notice_data = function(data){
        $localStorage.fundata = data;
        window.location = '#!/hibi/notice_data';

      }
      });






      firebase.auth().onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
          $localStorage.uid = firebase.auth().currentUser.uid;
        }else{
              console.log('chamged to logout');
              window.location = '#!/'
        }
      })







  })
