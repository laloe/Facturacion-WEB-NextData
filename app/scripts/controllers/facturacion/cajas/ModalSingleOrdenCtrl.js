'user strict';
angular
	.module('softvApp')
	.controller('ModalSingleOrdenCtrl', function($uibModalInstance, cajasFactory, clave, globalService) {

		function initialData() {
			cajasFactory.dameOrdenServicio(clave).then(function(data) {
				vm.url = globalService.getUrlReportes() + '/Reportes/' + data.GetUrlOrdSerResult[0].Url;
				$('#ordenesURL').attr('src', vm.url);
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
		var vm = this;
		vm.cancel = cancel;
		initialData();

	});
