angular
  .module('logincontroller',['ngStorage'])
  .controller('logincntrl',function($scope,$location,$localStorage,rq){


      $scope.signin = function(data) {
          $('#loading').addClass('loader');
        firebase.auth().signInWithEmailAndPassword(data.username + "@iiit-bh.ac.in", data.password).catch(function(error) {

        var errorCode = error.code;
        alert(errorCode)
        var errorMessage = error.message;
        console.log(error.message);
          $('#loading').removeClass('loader');
        // ...
        });
      }


      $scope.logout = function(){
        firebase.auth().signOut()
      }



    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
          // console.log(firebaseUser);
          // console.log('changed  to login');
          $localStorage.uid  = firebase.auth().currentUser.uid
          if(firebase.auth().currentUser.emailVerified){
              window.location = '#!/hibi'
          }else{
              // window.location = '#!/'
              // TODO: acoount created  succes mesage
                // send verification email
                var user = firebase.auth().currentUser;
                // console.log('credential verified creating account');
                // console.log(firebase.auth().currentUser.uid);

                firebase.database().ref('Students/' + firebase.auth().currentUser.uid + "/hibiscus").set({
                sid:$localStorage.data.uid,
                pwd:$localStorage.data.pwd,
                status:true
                });

                $localStorage.data = undefined

                user.sendEmailVerification().then(function() {
                  // Email sent.
                  // TODO: show message verify email to continue
                  alert("verify your college mail to continue")
                  // TODO: diplay success mesage and creating account message


                }).catch(function(error) {
                  // TODO: handle the error
                  // An error happened.
                });

          }
      }else {
        // singup function
        $scope.signup = function(register) {
            // TODO: show process bar
            $('#loading').addClass('loader');
            rq.post('/api/hibi/login_test',register)
              .then(function successCallback(response) {
                $localStorage.data = register
                  // TODO: display loading bar
                  // console.log(response.data.result);
                  if(response.data.result == "success"){
                    $('#loading').removeClass('loader');
                      // creating user
                      firebase.auth().createUserWithEmailAndPassword(register.uid + '@iiit-bh.ac.in', register.pwd).catch(function(error) {
                        if(!error){
                          alert('verify Email to continue');
                        }else{
                          // Handle Errors here.
                          var errorCode = error.code;

                          alert(errorCode)
                          var errorMessage = error.message;
                        }

                      });

                      // $location.path("/hibi");
                  }else{
                    $('#loading').removeClass('loader');
                    alert('wrong password')
                  }
              }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  // console.log(response);
                  // TODO: display errormessage wrong credentials
                  // console.log("wrong credential ");
                });


            }
          // console.log('changed to logout');
          window.location = '#!/'
      }

    })


    //  switching between login and register
    $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    });

  })
