'use strict';
angular
	.module('softvApp')
	.directive('file', function() {
		return {
			scope: {
				file: '='
			},
			link: function(scope, el) {
				el.bind('change', function(event) {
					var file = event.target.files[0];
					scope.file = file ? file : undefined;
					scope.$apply();
				});
			}
		};
	});
