angular
  .module('services',[])
  .factory('rq',function($http){
  var authFactory = {}; //empty authFactory object

  //authentication
  authFactory.post = function(path , data = {}){
    return $http.post('http://139.59.23.157' + path,data)
  }
  authFactory.crypt = function(data){
    return $http.get('https://us-central1-iiitcloud-e9d6b.cloudfunctions.net/cryptr?pass=' + data)
  }

  authFactory.dcrypt = function(data){
    return $http.get('https://us-central1-iiitcloud-e9d6b.cloudfunctions.net/dcryptr?pass=' + data)
  }

  return authFactory;

  })
