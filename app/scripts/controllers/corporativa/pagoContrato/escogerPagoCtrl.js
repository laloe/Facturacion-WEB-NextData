'use strict';
angular.module('softvApp').controller('EscogerPagoCtrl', EscogerPagoCtrl);

function EscogerPagoCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, $uibModalInstance, $localStorage, metodo, pagosMaestrosFactory, x, elem1) {

    function cambio(pago) {
		if (pago == 1){
			vm.fijos = true;
			vm.variables = false;
			vm.botonFijo = true;
			vm.botonVariable = false;
		}
		else if (pago == 2){
			vm.fijos = false;
			vm.variables = true;
			vm.botonFijo = false;
			vm.botonVariable = true;
		}
	}

	function abonoMenor() {
		if (vm.abono > vm.monto) {
			vm.abono = vm.monto;
		}
	}
	
	function guardarFijo() {
		if (vm.pagoInicial == undefined || vm.pagoInicial == null || vm.pagoInicial == 0 || vm.pagoInicial < 0 || vm.numeroPagos == undefined || vm.numeroPagos == null || vm.numeroPagos == 0 || vm.numeroPagos < 0) {
			ngNotify.set('Los campos no deben de ir nulos, negativos o en 0', 'error');
		}else {
			var elem = {
				ClvFacturaMaestro: x.Clv_FacturaMaestro,
				Credito: metodo,
				NoPago: vm.numeroPagos,
				PagoInicial: vm.pagoInicial
			};
			// var elem = {
			// 	PagoInicial: vm.pagoInicial,
			// };
			// console.log(objPagar);
			// pagosMaestrosFactory.actFactura(elem).then(function(dataGraba) {
				$uibModalInstance.dismiss('cancel');
				vm.animationsEnabled = true;
				var modalInstance = $uibModal.open({
					animation: vm.animationsEnabled,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/corporativa/pagarCredito.html',
					controller: 'PagarCreditoCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					size: 'md',
					resolve: {
						elem: function() {
							return elem;
						},
						x: function() {
							return x;
						}
					}
				});
			// });
		}
	}

	function guardarVariable() {
		if (vm.abono == undefined || vm.abono == null || vm.abono == 0 || vm.abono < 0) {
			ngNotify.set('Los campos no deben de ir nulos, negativos o en 0', 'error');
		}else {
			var elem = {
				ClvFacturaMaestro: x.Clv_FacturaMaestro,
				Credito: metodo,
				NoPago: 0,
				PagoInicial: vm.abono
			};
			// var elem = {
			// 	PagoInicial: vm.abono,
			// };
			// console.log(objPagar);
			// pagosMaestrosFactory.actFactura(elem).then(function(dataGraba) {
				$uibModalInstance.dismiss('cancel');
				vm.animationsEnabled = true;
				var modalInstance = $uibModal.open({
					animation: vm.animationsEnabled,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/corporativa/pagarCredito.html',
					controller: 'PagarCreditoCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					size: 'md',
					resolve: {
						elem: function() {
							return elem;
						},
						x: function() {
							return x;
						}
					}
				});
			// });
		}
	}

	function operacion() {
		if (vm.pagoInicial > vm.monto) {
			vm.pagoInicial = 0;
		}else {
			vm.primer = (vm.monto  - vm.pagoInicial);
			if (vm.numeroPagos == 0 || vm.numeroPagos == undefined || vm.numeroPagos == null) {
				vm.mensualidad = 0;
			}else {
				vm.mensualidad = vm.primer / vm.numeroPagos; 
			}
		}
	}

    function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

    var vm = this;
	vm.numeroPagos = 1;
    vm.cambio = cambio;
	vm.abonoMenor = abonoMenor;
	vm.guardarFijo = guardarFijo;
	vm.guardarVariable = guardarVariable;
	vm.operacion = operacion;
    vm.cancel = cancel;
	vm.monto = elem1;
}
