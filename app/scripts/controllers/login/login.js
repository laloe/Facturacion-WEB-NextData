'use strict';
angular
	.module('softvApp')
	.controller('LoginCtrl', function($stateParams, authFactory, $location, $localStorage) {
		function initData() {
			if ($localStorage.currentUser) {
				$location.path('/home/dashboard');
			} else {
				if ($stateParams.token) {
					authFactory.getAuthentication($stateParams.token);
				}
			}
		}

		var vm = this;
		initData();
	});
