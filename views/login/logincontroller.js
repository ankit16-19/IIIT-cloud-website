angular
  .module('logincontroller',['ngStorage'])
  .controller('logincntrl',function($scope,$location,$localStorage,rq){

      $scope.signin = function(data) {
          $('#loading').addClass('loader');
          console.log(data);
          firebase.auth().signInWithEmailAndPassword(data.uid + '@iiit-bh.ac.in', data.pwd).then(function successCallbackess(){
            $localStorage.uid = firebase.auth().currentUser.uid;
              $('#loading').removeClass('loader');
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.error(errorCode);
            var errorMessage = error.message;
            console.error(errorMessage);
            if(errorCode != null){
              firebase.auth().createUserWithEmailAndPassword(data.uid + '@iiit-bh.ac.in', data.pwd).then(function successCallback(){
                    rq.crypt(data.pwd).then(function successCallback(response){
                      firebase.database().ref('/Students/' + firebase.auth().currentUser.uid + '/hibiscus').set({
                        pwd:response.data,
                        sid:data.uid,
                        status:true
                      })
                    })
                      $('#loading').removeClass('loader');
              }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              });

            }
            // ...
          });

      }


      $scope.logout = function(){
        firebase.auth().signOut();
      }


      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location = '#!/hibi'
        } else {
          // No user is signed in.
          window.location = '#!/'
        }
      });




  })
