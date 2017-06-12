'use strict';
angular
	.module('softvApp')
	.controller('EncuestasCtrl', function ($state, ngNotify, atencionFactory, $localStorage, $uibModal) {
		function initialData() {
             window.location = "http://localhost:9095/Account/Login?token="+$localStorage.currentUser.token
		}		

		initialData();
	});