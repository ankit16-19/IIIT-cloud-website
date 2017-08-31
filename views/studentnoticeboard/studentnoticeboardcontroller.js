angular
  .module('studentnoticeboardcontroller',[])
  .controller('studentnoticeboardcntrl',function($scope,$localStorage,$http,$window){

    $scope.toshow = false;
    $scope.jadu = false;
      firebase.database().ref('/Auth/' +  $localStorage.uid).once('value').then(function(snapshot) {
        $scope.authentication  = snapshot.val();

      });

      firebase.database().ref('/Studentnotice/').on('value',function(snapshot) {
          $scope.studentnotices = snapshot.val()
            $('#loading').removeClass('loader');
            $scope.$apply();
      });

      $scope.check_auth = function(){
        $scope.toshow = true;

      }
      $scope.studentnoticedata = function(data) {
         $scope.scroll = $(window).scrollTop();
        $scope.noticedata = data.description,
        $scope.jadu = true;
      }

      var modal = document.getElementById('id01');
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
      }
    $scope.get = function(data){
      var writingposition = ""
      firebase.database().ref('/Studentnotice/').once('value').then(function(snapshot) {
      writingposition = snapshot.val().length;
      firebase.database().ref('/Studentnotice/' + writingposition).set({
        posted_by: data.posted_by,
        title: data.title,
        attention:data.attention,
        description:data.description,
        date:data.date
        });
      });
      $scope.toshow = false
    }

//

//


    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser){
      }else {
        window.location = '#!/'
      }
    });






  })
