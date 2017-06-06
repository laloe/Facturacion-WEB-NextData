'use strict';
angular
	.module('softvApp')
	.controller('NuevaEntregaCtrl', function(entregasFactory, $filter, $rootScope, globalService, ngNotify) {
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
			vm.importe = 0;
			vm.entrega.b1000 = 0;
			vm.entrega.b500 = 0;
			vm.entrega.b200 = 0;
			vm.entrega.b100 = 0;
			vm.entrega.b50 = 0;
			vm.entrega.b20 = 0;
			vm.entrega.m100 = 0;
			vm.entrega.m50 = 0;
			vm.entrega.m20 = 0;
			vm.entrega.m10 = 0;
			vm.entrega.m5 = 0;
			vm.entrega.m2 = 0;
			vm.entrega.m1 = 0;
			vm.entrega.m050 = 0;
			vm.entrega.m020 = 0;
			vm.entrega.m010 = 0;
			vm.entrega.m005 = 0;
			vm.fechaEntrada = $filter('date')(new Date(), 'dd/MM/yyyy');
			vm.horaEntrada = $filter('date')(new Date(), 'HH:mm:ss');
			entregasFactory.getCajeros().then(function(data) {
				data.GetMuestraCajerosProcesosListResult.unshift({
					'Nombre': '----------------',
					'Clv_Usuario': 0
				});
				vm.cajeros = data.GetMuestraCajerosProcesosListResult;
				vm.selectedCajero = data.GetMuestraCajerosProcesosListResult[0];
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
			if (vm.referencia == '' || vm.referencia == undefined) {
				ngNotify.set('Por Favor llena todos los datos correctamente.', 'error');
			} else {
				if (vm.selectedCajero.Clv_Usuario == 0) {
					ngNotify.set('Por Favor llena todos los datos correctamente.', 'error');
				} else {
					if (vm.importe == 0) {
						ngNotify.set('El importe es incorrecto.', 'error');
					} else {
						var objEntrega = {
							Importe: vm.importe,
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
							Referencia: vm.referencia
						};
						entregasFactory.guardarEntrega(objEntrega).then(function(data) {
							vm.titulo = 'Reporte de Entrega Parcial';
							vm.btnTitle = 'Cerrar';
							ngNotify.set('Entrega Parcial generada correctamente.', 'success');
							$rootScope.$emit('updateEntrada', {});
							var url = globalService.getUrlReportes() + '/Reportes/' + data.GetEntregaParcialListResult[0].NombreCajera;
							$('#myReporte').attr('src', url);
							vm.showReporte = true;
							vm.showDatosInit = false;
							vm.showGuardar = false;
							vm.buttonTitle = 'Salir';
						});
					}
				}
			}

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
