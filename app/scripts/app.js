'use strict';
angular
  .module('softvApp', [
    'angular-loading-bar',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ngNotify',
    'ngStorage',
    'angularUtils.directives.dirPagination',
    'blockUI',
    'angularValidator',
    'permission', 'permission.ui',
    'ui.mask', 'dndLists',
    'smart-table',
    'ngSanitize',
    'ngCsv'

  ])
  .config(['$provide', '$urlRouterProvider', '$httpProvider', 'cfpLoadingBarProvider', '$qProvider', 'blockUIConfig', function ($provide, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, $qProvider, blockUIConfig) {
    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get('$state');
      $state.go('auth');
    });
    cfpLoadingBarProvider.includeSpinner = false;
    $qProvider.errorOnUnhandledRejections(false);
    blockUIConfig.templateUrl = 'views/components/loading.html';

    $provide.factory('ErrorHttpInterceptor', function ($q, $injector, $localStorage, $location) {
      function notifyError(rejection) {
        var notify = $injector.get('ngNotify');
        if (rejection.data === 'Acceso no autorizado, favor de validar autenticación') {
          delete $localStorage.currentUser;
          notify.set('Acceso no autorizado, por favor inicia sesión nuevamente.', {
            type: 'error',
            duration: 4000
          });
          $location.path('/auth/');
          return;
        }

        var content = '¡Se ha generado un error! \n' + rejection.data;
        notify.set(content, {
          type: 'error',
          duration: 4000
        });
      }

      return {
        requestError: function (rejection) {
          notifyError(rejection);
          return $q.reject(rejection);
        },
        responseError: function (rejection) {
          notifyError(rejection);
          sessionStorage.clear();
          return $q.reject(rejection);
        }
      };
    });
    $httpProvider.interceptors.push('ErrorHttpInterceptor');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .constant('APP_CONFIG', window.appConfig)
  .run(['$rootScope','$window', '$state', '$stateParams', '$localStorage', '$location', 'PermPermissionStore', 'PermRoleStore', 'inMenu', function ($rootScope,$window ,$state, $stateParams, $localStorage, $location, PermPermissionStore, PermRoleStore, inMenu) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

   


    if ($localStorage.currentUser) {
      //$location.path('/home/');
      PermPermissionStore.definePermission('anonymous', function () {
        return false;
      });
      var permissions = inMenu.on();
      PermPermissionStore.defineManyPermissions(permissions, function () {
        return true;
      });
    } else {
      $location.path('/auth/');
      PermPermissionStore.definePermission('anonymous', function () {
        return true;
      });
    }
  }]);
