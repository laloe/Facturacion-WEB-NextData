'user strict';
angular.module('softvApp')
	.controller('ModalInformacionCobroCtrl', function($uibModalInstance, cajasFactory, items, $rootScope, ngNotify) {

		function init() {
			console.log(items);
			cajasFactory.InformacionCobro(items.Clv_Session, items.CLV_DETALLE).then(function(data) {
				vm.Msg = data.Getsp_dameInfodelCobroResult.Msg;
			});

		}

		function ok() {

		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		init();
		vm.cancel = cancel;
		vm.ok = ok;
	});
