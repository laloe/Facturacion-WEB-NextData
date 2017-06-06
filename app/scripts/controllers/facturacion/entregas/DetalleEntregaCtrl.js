'use strict';
angular.module('softvApp')
	.controller('DetalleEntregaCtrl', function(entregasFactory, $stateParams, $filter, $rootScope, globalService, ngNotify) {
		function initialData() {
			vm.showClave = true;
			vm.showRecibo = true;
			vm.showCajero = true;
			vm.showReferencia = true;
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
			vm.showGuardar = false;
			entregasFactory.getSingleEntrega($stateParams.id).then(function(data) {
				var objEntrega = data.GetDeepEntregaParcialResult;
				vm.entrega.b1000 = objEntrega.B1000;
				vm.entrega.b500 = objEntrega.B500;
				vm.entrega.b200 = objEntrega.B200;
				vm.entrega.b100 = objEntrega.B100;
				vm.entrega.b50 = objEntrega.B50;
				vm.entrega.b20 = objEntrega.B20;
				vm.entrega.m100 = objEntrega.M100;
				vm.entrega.m50 = objEntrega.M50;
				vm.entrega.m20 = objEntrega.M20;
				vm.entrega.m10 = objEntrega.M10;
				vm.entrega.m5 = objEntrega.M5;
				vm.entrega.m2 = objEntrega.M2;
				vm.entrega.m1 = objEntrega.M1;
				vm.entrega.m050 = objEntrega.M050;
				vm.entrega.m020 = objEntrega.M020;
				vm.entrega.m010 = objEntrega.M010;
				vm.entrega.m005 = objEntrega.M005;
				vm.clvEntrega = objEntrega.Consecutivo;
				vm.fechaEntrada = objEntrega.Fecha;
				vm.recibo = objEntrega.Recibio;
				vm.horaEntrada = objEntrega.Hora;
				vm.cajeros = [];
				var cajero = {
					Nombre: objEntrega.Cajera,
					Clv_Usuario: 0
				}
				vm.cajeros.push(cajero);
				vm.selectedCajero = vm.cajeros[0];
				vm.referencia = objEntrega.Referencia;
				vm.importe = objEntrega.Importe;
			});
		}

		function changeImportes() {
			for (var key in vm.entrega) {
				if (vm.entrega[key] == null || vm.entrega[key] == '') {
					vm.entrega[key] = 0;
				}
			}
			vm.importe = vm.entrega.b1000 * 1000;
			vm.importe = vm.importe + (vm.entrega.b500 * 500);
			vm.importe = vm.importe + (vm.entrega.b200 * 200);
			vm.importe = vm.importe + (vm.entrega.b100 * 100);
			vm.importe = vm.importe + (vm.entrega.b50 * 50);
			vm.importe = vm.importe + (vm.entrega.b20 * 20);
			vm.importe = vm.importe + (vm.entrega.m100 * 100);
			vm.importe = vm.importe + (vm.entrega.m50 * 50);
			vm.importe = vm.importe + (vm.entrega.m20 * 20);
			vm.importe = vm.importe + (vm.entrega.m10 * 10);
			vm.importe = vm.importe + (vm.entrega.m5 * 5);
			vm.importe = vm.importe + (vm.entrega.m2 * 2);
			vm.importe = vm.importe + (vm.entrega.m1 * 1);
			vm.importe = vm.importe + (vm.entrega.m050 * 0.50);
			vm.importe = vm.importe + (vm.entrega.m020 * 0.20);
			vm.importe = vm.importe + (vm.entrega.m010 * 0.10);
			vm.importe = vm.importe + (vm.entrega.m005 * 0.05);

		}

		var vm = this;
		vm.changeImportes = changeImportes;
		vm.entrega = {};
		vm.showReporte = false;
		vm.showDatosInit = true;
		vm.showGuardar = true;
		initialData();
	});
