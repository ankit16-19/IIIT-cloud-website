angular
  .module('hibicontroller',["ngStorage"])
  .controller('hibicntrl',function($scope,rq,$window,$localStorage){
    const messaging = firebase.messaging();
    messaging.requestPermission()
    .then(function() {
      console.log('Notification permission granted.');
      return messaging.getToken();
    })
    .then(function(token){
      topic = 'IIITstudents'
      fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'key=AAAAl7M60AQ:APA91bFBlQRIQmjXAOw0S5r6Yy1kzHHgXHdulMU_1oU-xQ0VKDnCTvL9DmLgwFyjPJZOgMuF-mOXZPzjNixrv7gC0m7vUC7kjuFaGCRat0tsvl7srBGKn7y2T7dv2JFNcm6bkxlKOtF3'
        })
      }).then(response => {
        if (response.status < 200 || response.status >= 400) {
          throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
        }
        console.log('Subscribed to "'+topic+'"');
      }).catch(error => {
        console.error(error);
      })
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });


    messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);

    });


    // getting Notices from firebase
    firebase.database().ref('/Notice/').on('value',function(snapshot) {
      $scope.notice = snapshot.val()
      $('#loading').removeClass('loader');
    });
      // $localStorage.data = undefined
    firebase.database().ref('/Students/' + $localStorage.uid + '/hibiscus').once('value').then(function(snapshot) {
      $scope.data = {
        'uid':snapshot.child("sid").val(),
        'pwd':snapshot.child("pwd").val()
      }
      rq.dcrypt($scope.data.pwd).then(function successCallback(response){
      $scope.data.pwd = response.data
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
