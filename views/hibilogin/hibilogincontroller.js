angular
  .module('hibilogincontroller',[])
  .controller('hibilogincntrl',function($scope,rq,$location) {





      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
                console.log(firebaseUser);
                console.log('changed  to login');
                firebase.database().ref('/Students/' + firebase.auth().currentUser.uid + '/hibiscus').once('value').then(function(snapshot) {
                if (snapshot.child('status').val()) {
                  window.location = '#!/hibi'
                }else{

                }

                });

        }else {
          console.log('changed to logout');
          window.location = '#!/'
        }

                            $scope.login = function(data){
                              rq.post('/api/hibi/login_test',data)
                                .then(function successCallback(response) {
                                // this callback will be called asynchronously
                                // when the response is available
                                console.log(response.data.result);
                                if(response.data.result == "success"){
                                  firebase.database().ref('Students/' + firebase.auth().currentUser.uid + "/hibiscus").set({
                                  sid:data.uid,
                                  pwd:data.pwd,
                                  status:true
                                  });
                                  $location.path("/hibi");
                                }
                                }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                console.log(response);
                                console.log("error in connection with database");
                                });
                              }

      })




});
