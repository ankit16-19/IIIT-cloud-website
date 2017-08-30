angular
  .module('services',[])
  .factory('rq',function($http){
  var authFactory = {}; //empty authFactory object

  //authentication
  authFactory.post = function(path , data = {}){
    return $http.post('http://139.59.23.157' + path,data)
  }

  return authFactory;

  })
