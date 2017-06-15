'use strict';
angular
	.module('softvApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://localhost:64481/SoftvWCFService.svc';
		};

		svc.getUrlReportes = function() {
			return 'http://localhost:64481';
		};

		return svc;
	});
