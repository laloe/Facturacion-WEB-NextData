'use strict';
angular.module('softvApp')
	.controller('NuevoDesgloseCtrl', function(desgloseFactory, $filter, $rootScope, globalService, ngNotify, $localStorage) {
		function initialData() {
			vm.showClave = true;
			vm.showCajero = true;
			vm.showb1000 = false;
			vm.showb500 = false;
			vm.showb200 = false;
			vm.showb100 = false;
			vm.showb50 = false;
			vm.showb20 = false;
			vm.showm100 = false;
			vm.showm50 = false;
			vm.showm20 = false;
			vm.showm10 = false;
			vm.showm5 = false;
			vm.showm2 = false;
			vm.showm1 = false;
			vm.showm050 = false;
			vm.showm020 = false;
			vm.showm010 = false;
			vm.showm005 = false;
			vm.showCheques = false;
			vm.showGastos = true;
			vm.showImporte = false;
			vm.showCambio = false;
			vm.showConversion = false;
			vm.showSaldoAnterior = true;
			vm.showFecha = true;
			vm.showTransferencia = false;
			vm.showGuardar = true;
			vm.showConversion = true;
			vm.showTotal = true;
			vm.showGranTotal = true;
			vm.showNota = true;
			vm.showNota2 = true;
			vm.desglose.b1000 = 0;
			vm.desglose.b500 = 0;
			vm.desglose.b200 = 0;
			vm.desglose.b100 = 0;
			vm.desglose.b50 = 0;
			vm.desglose.b20 = 0;
			vm.desglose.m100 = 0;
			vm.desglose.m50 = 0;
			vm.desglose.m20 = 0;
			vm.desglose.m10 = 0;
			vm.desglose.m5 = 0;
			vm.desglose.m2 = 0;
			vm.desglose.m1 = 0;
			vm.desglose.m050 = 0;
			vm.desglose.m020 = 0;
			vm.desglose.m010 = 0;
			vm.desglose.m005 = 0;
			vm.desglose.cheques = 0;
			vm.desglose.transferencia = 0;
			vm.desglose.dolares = 0;
			vm.desglose.cambio = 0;
			vm.desglose.conversion = 0;
			vm.fecha = $filter('date')(new Date(), 'dd/MM/yyyy');
			vm.selectedCajero = $localStorage.currentUser.usuario;
		}

		function changeImportes() {
			for (var key in vm.desglose) {
				if (vm.desglose[key] == null || vm.desglose[key] == '') {
					vm.desglose[key] = 0;
				}
			}

			vm.importeBillete = vm.desglose.b1000 * 1000;
			vm.importeBillete = vm.importeBillete + (vm.desglose.b500 * 500);
			vm.importeBillete = vm.importeBillete + (vm.desglose.b200 * 200);
			vm.importeBillete = vm.importeBillete + (vm.desglose.b100 * 100);
			vm.importeBillete = vm.importeBillete + (vm.desglose.b50 * 50);
			vm.importeBillete = vm.importeBillete + (vm.desglose.b20 * 20);
			vm.importeMoneda = vm.desglose.m100 * 100;
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m50 * 50);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m20 * 20);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m10 * 10);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m5 * 5);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m2 * 2);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m1 * 1);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m050 * 0.50);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m020 * 0.20);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m010 * 0.10);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m005 * 0.05);
			vm.total = vm.importeBillete + vm.importeMoneda + vm.desglose.cheques + vm.desglose.transferencia;
			vm.desglose.conversion = vm.desglose.dolares * vm.desglose.cambio;
			vm.granTotal = vm.total + vm.desglose.conversion;
		}

		function guardarDesglose() {
			if (vm.granTotal == 0) {
				ngNotify.set('No pueden ir todos los campos en cero para generar el desglose.', 'error');
			} else {
				if (vm.granTotal == 0 || vm.granTotal == null) {
					ngNotify.set('No pueden ir todos los campos en cero para generar el desglose.', 'error');
				} else {
					var objDesglose = {
						Cajera: vm.selectedCajero,
						B1000: vm.desglose.b1000,
						B500: vm.desglose.b500,
						B200: vm.desglose.b200,
						B100: vm.desglose.b100,
						B50: vm.desglose.b50,
						B20: vm.desglose.b20,
						M100: vm.desglose.m100,
						M50: vm.desglose.m50,
						M20: vm.desglose.m20,
						M10: vm.desglose.m10,
						M5: vm.desglose.m5,
						M2: vm.desglose.m2,
						M1: vm.desglose.m1,
						M050: vm.desglose.m050,
						M020: vm.desglose.m020,
						M010: vm.desglose.m010,
						M005: vm.desglose.m005,
						Cheques: vm.desglose.cheques,
						Tarjeta: vm.desglose.transferencia,
						Total: vm.granTotal,
						Referencia: null,
						Gastos: vm.desglose.gastos,
						ImporteDolar: vm.desglose.dolares,
						TipoCambio: vm.desglose.cambio,
						SaldoAnterior: vm.saldoAnterior,
						TotalDolar: vm.desglose.conversion
					};
					desgloseFactory.agregarDesglose(objDesglose).then(function(data) {
						ngNotify.set('Desglose de Moneda generado correctamente', 'success');
						var url = globalService.getUrlReportes() + '/Reportes/' + data.GetDesgloseDeMonedaListResult[0].Cajera;
						$('#reporteID').attr('src', url);
						vm.showModal = false;
						vm.showGuardar = false;
						vm.showReporte = true;
						vm.buttonTitle = 'Salir';
						$rootScope.$emit('updateDesglose', {});
					});
				}
			}
		}

		var vm = this;
		vm.changeImportes = changeImportes;
		vm.guardarDesglose = guardarDesglose;
		vm.showModal = true;
		vm.showReporte = false;
		vm.desglose = {};
		vm.buttonTitle = 'Cancelar';
		vm.total = 0;
		vm.importeBillete = 0;
		vm.granTotal = 0;
		vm.importeMoneda = 0;
		initialData();
	});
