'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('UsersCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.showUser = null;

    $scope.setShow = function(user) {
      $scope.showUser = user;
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + user.id + '/Projects')
        .success(function(data) {
          if (data.status == "success") {
            $scope.showUserProject = data.data;
          }
        });
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + user.id + '/Roles')
          .success(function(data) {
            if (data.status == "success") {
              $scope.showUserRole = data.data;
            }
          });
    }

    $scope.isSet = function(user){
      return $scope.showUser === user;
    };

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.users = data.data;

      });

    /** On recupere les projets pour avoir les id dans la combobox **/
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
        .success(function(data) {
          $scope.projects = data.data;
        });

    $scope.deleteUser = function(id){
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + id);
      $route.reload();
    };

    $scope.addUser = function(newUser){
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', newUser);
      $route.reload();
    };

    $scope.updateUser = function(newUser){
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+newUser.id, newUser);
      $route.reload();
    };

    $scope.addRole = function(newRole){
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/', newRole);
      $route.reload();
    };


    $scope.deleteRole = function(role){
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + role.id);
      $route.reload();
    };
  }]);
