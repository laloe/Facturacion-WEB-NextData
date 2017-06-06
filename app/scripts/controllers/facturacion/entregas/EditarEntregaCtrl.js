'use strict';
angular
	.module('softvApp')
	.controller('EditarEntregaCtrl', function(entregasFactory, $state, $stateParams, $filter, $rootScope, globalService, ngNotify) {
		function initialData() {
			vm.showClave = true;
			vm.showRecibo = true;
			vm.showCajero = false;
			vm.showReferencia = false;
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
			vm.showGuardar = true;
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

		function guardarEntrega() {
			changeImportes();
			var objEntrega = {
				Total: vm.importe,
				Recibio: vm.recibo,
				B1000: vm.entrega.b1000,
				B500: vm.entrega.b500,
				B200: vm.entrega.b200,
				B100: vm.entrega.b100,
				B50: vm.entrega.b50,
				B20: vm.entrega.b20,
				M100: vm.entrega.m100,
				M50: vm.entrega.m50,
				M20: vm.entrega.m20,
				M10: vm.entrega.m10,
				M5: vm.entrega.m5,
				M2: vm.entrega.m2,
				M1: vm.entrega.m1,
				M050: vm.entrega.m050,
				M020: vm.entrega.m020,
				M010: vm.entrega.m010,
				M005: vm.entrega.m005,
				Referencia: vm.referencia,
				Consecutivo: vm.clvEntrega
			};
			entregasFactory.editarEntrada(objEntrega).then(function(data) {
				ngNotify.set('Entrega Parcial Editada correctamente.', 'success');
				$rootScope.$emit('updateEntrada', {});
				$state.go('home.facturacion.entregas');
			});
		}

		var vm = this;
		vm.changeImportes = changeImportes;
		vm.guardarEntrega = guardarEntrega;
		vm.buttonTitle = 'Cancelar';
		vm.entrega = {};
		vm.showReporte = false;
		vm.showDatosInit = true;
		vm.showGuardar = true;
		initialData();
	});
