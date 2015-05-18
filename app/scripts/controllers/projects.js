'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('ProjectsCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.setShowP = function (project) {
      $scope.showProject = project;
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + project.id + '/Users')
        .success(function (data) {
          if (data.status == "success") {
            $scope.showProjectUser = data.data;
          }
        });
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + project.id + '/Roles')
        .success(function(data) {
          if (data.status == "success") {
            $scope.showProjectRole = data.data;
          }
        });
    }

    $scope.isSetP = function (project) {
      return $scope.showProject === project;
    };

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function (data) {
        $scope.projects = data.data;
      });

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.users = data.data;

      });

    $scope.deleteProj = function(id){
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + id);
      $route.reload();
    }
    $scope.addProj = function(newUser){
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/', newProj);
      $route.reload();
    }
    $scope.updateProj = function(newUser){
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+newProj.id, newProj);
      $route.reload();
    }

    $scope.addRole = function(newRole){
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/', newRole);
      $route.reload();
    };

    $scope.deleteRole = function(role){
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + role.id);
      $route.reload();
    };

  }]);
