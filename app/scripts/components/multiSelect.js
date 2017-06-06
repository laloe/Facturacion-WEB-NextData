'use strict';
var multiSelect = {
	bindings: {
		options: '=',
	},
	controller: function() {
		this.transfer = function(from, to, index) {
			if (index >= 0) {
				to.push(from[index]);
				from.splice(index, 1);
			} else {
				for (var i = 0; i < from.length; i++) {
					to.push(from[i]);
				}
				from.length = 0;
			}
		};
	},
	templateUrl: 'views/components/multiSelect.html'
};

angular.module('softvApp').component('multiSelect', multiSelect);
