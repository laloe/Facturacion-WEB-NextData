'use strict';
angular
	.module('softvApp')
	.controller('ModalSingleQuejaCtrl', function($uibModalInstance, cajasFactory, clave, globalService) {

		function initialData() {
			cajasFactory.dameSingleQueja(clave).then(function(data) {
				vm.url = globalService.getUrlReportes() + '/Reportes/' + data.GetConsultarQuejasTableListResult[0].Colonia;
				$('#reporteURL').attr('src', vm.url);
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		initialData();
	});
