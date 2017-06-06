'use strict';
angular
	.module('softvApp')
	.controller('HomeCtrl', function($localStorage, $location, $window, $state) {
		function initialData() {
			if ($localStorage.currentUser) {
				vm.menus = $localStorage.currentUser.Menu;
				vm.usuario = $localStorage.currentUser.usuario;
				//$state.go('home.dashboard');
			} else {
				location.href === '/auth/';
			}
		}

		function logout() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}



		var vm = this;
		vm.logout = logout;
		initialData();
	});
