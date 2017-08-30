angular
  .module('studentnoticeboardcontroller',[])
  .controller('studentnoticeboardcntrl',function($scope,$localStorage,$http,$window){
    $scope.toshow = false
      firebase.database().ref('/Auth/' +  $localStorage.uid).once('value').then(function(snapshot) {
        $scope.authentication  = snapshot.val();
        $scope.$apply();
      });

      firebase.database().ref('/Studentnotice/').on('value',function(snapshot) {
          $scope.studentnotice = snapshot.val()
            $('#loading').removeClass('loader');
            $scope.$apply();
      });

      $scope.check_auth = function(){
        $scope.toshow = true;
      }


    $scope.show = function(data){
      var writingposition = ""
      firebase.database().ref('/Studentnotice/').once('value').then(function(snapshot) {
      writingposition = snapshot.val().length;
      firebase.database().ref('/Studentnotice/' + writingposition).set({
        posted_by: data.posted_by,
        title: data.mssg
        });
      });
      $scope.toshow = false
    }




  })
