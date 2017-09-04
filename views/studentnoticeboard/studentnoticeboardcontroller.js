angular
  .module('studentnoticeboardcontroller',[])
  .controller('studentnoticeboardcntrl',function($scope,$localStorage,$http,$window){

      firebase.database().ref('/Auth/' +  $localStorage.uid).on('value',function(snapshot) {
        $scope.authentication  = snapshot.val();

      });
      firebase.database().ref('/Studentnotice/').on('value',function(snapshot) {
          $scope.studentnotices = snapshot.val()
            $('#loading').removeClass('loader');
    $scope.$digest();
      });

      $scope.studentnoticedata = function(data) {
        $scope.noticedata = data.description;
      }

    $scope.p = function(data){
      console.log(data);
      firebase.database().ref('/Studentnotice/').once('value').then(function(snapshot) {
      var writingposition = snapshot.val().length;
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




    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser){
      }else {
        window.location = '#!/'
      }
    });






  })
