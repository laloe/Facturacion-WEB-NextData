'use strict';
angular.module('softvApp')
	.controller('DetalleDesgloseCtrl', function(desgloseFactory, $stateParams, $filter, $rootScope, globalService, ngNotify, $localStorage) {
		function initialData() {
			vm.showClave = true;
			vm.showCajero = true;
			vm.showb1000 = true;
			vm.showb500 = true;
			vm.showb200 = true;
			vm.showb100 = true;
			vm.showb50 = true;
			vm.showb20 = true;
			vm.showm100 = true;
			vm.showm50 = true;
			vm.showm20 = true;
			vm.showm10 = true;
			vm.showm5 = true;
			vm.showm2 = true;
			vm.showm1 = true;
			vm.showm050 = true;
			vm.showm020 = true;
			vm.showm010 = true;
			vm.showm005 = true;
			vm.showCheques = true;
			vm.showGastos = true;
			vm.showImporte = true;
			vm.showCambio = true;
			vm.showConversion = true;
			vm.showSaldoAnterior = true;
			vm.showFecha = true;
			vm.showTransferencia = true;
			vm.showTotal = true;
			vm.showGranTotal = true;
			vm.showNota = false;
			vm.showGuardar = false;
			vm.showNota2 = false;
			desgloseFactory.consultaDesglose($stateParams.id).then(function(data) {
				var objDesglose = data.GetDeepDesgloseDeMonedaResult;
				vm.selectedCajero = objDesglose.Cajera;
				vm.desglose.b1000 = objDesglose.B1000;
				vm.desglose.b500 = objDesglose.B500;
				vm.desglose.b200 = objDesglose.B200;
				vm.desglose.b100 = objDesglose.B100;
				vm.desglose.b50 = objDesglose.B50;
				vm.desglose.b20 = objDesglose.B20;
				vm.desglose.m100 = objDesglose.M100;
				vm.desglose.m50 = objDesglose.M50;
				vm.desglose.m20 = objDesglose.M20;
				vm.desglose.m10 = objDesglose.M10;
				vm.desglose.m5 = objDesglose.M5;
				vm.desglose.m2 = objDesglose.M2;
				vm.desglose.m1 = objDesglose.M1;
				vm.desglose.m050 = objDesglose.M050;
				vm.desglose.m020 = objDesglose.M020;
				vm.desglose.m010 = objDesglose.M010;
				vm.desglose.m005 = objDesglose.M005;
				vm.clave = objDesglose.Consecutivo;
				vm.fecha = objDesglose.Fecha;
				vm.desglose.cheques = objDesglose.Cheques;
				vm.desglose.gastos = objDesglose.Gastos;
				vm.desglose.saldoAnterior = objDesglose.SaldoAnterior;
				vm.fecha = objDesglose.Fecha;
				vm.desglose.transferencia = objDesglose.Tarjeta;
				vm.granTotal = objDesglose.Total;
				vm.desglose.dolares = objDesglose.ImporteDolar;
				vm.desglose.cambio = objDesglose.TipoCambio;
				vm.desglose.conversion = objDesglose.TotalDolar;
				vm.cajeros = [];
				vm.billetes = (vm.desglose.b1000 * 1000) + (vm.desglose.b500 * 500) + (vm.desglose.b200 * 200) + (vm.desglose.b100 * 100) + (vm.desglose.b50 * 50) + (vm.desglose.b20 * 20);
				vm.monedas = (vm.desglose.m100 * 100) + (vm.desglose.m50 * 50) + (vm.desglose.m20 * 20) + (vm.desglose.m10 * 10) + (vm.desglose.m5 * 5) + (vm.desglose.m2 * 2) + (vm.desglose.m1 * 1) +
					(vm.desglose.m050 * 0.50) + (vm.desglose.m020 * 0.20) + (vm.desglose.m010 * 0.10) + (vm.desglose.m005 * 0.05);
				vm.total = vm.billetes + vm.monedas + vm.desglose.transferencia + vm.desglose.cheques;
			});
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


		var vm = this;
		vm.changeImportes = changeImportes;
		vm.showModal = true;
		vm.showReporte = false;
		vm.desglose = {};
		vm.total = 0;
		vm.importeBillete = 0;
		vm.granTotal = 0;
		vm.importeMoneda = 0;
		initialData();
	});
