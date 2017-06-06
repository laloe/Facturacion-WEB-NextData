'use strict';
angular
	.module('softvApp')
	.controller('EntregasParcialesCtrl', function($state, $uibModal, globalService, $rootScope, entregasFactory, $filter, ngNotify) {
		function initialData() {
			entregasFactory.getPlazas().then(function(data) {
				vm.plazas = data.GetMuestraPlazasProcesosListResult;
				vm.selectedPlaza = data.GetMuestraPlazasProcesosListResult[0];
				changePlaza();
			});
		}

		function buscarEntrada() {
			if (vm.selectedPlaza.id_compania != 0) {
				if (vm.busquedaTipo == 1) {
					if (vm.buscarReferencia == '') {
						changePlaza();
					} else {
						var objEntrada = {
							op: 1,
							referencia: vm.buscarReferencia,
							cajera: '',
							fecha: '',
							IdCompania: vm.selectedPlaza.id_compania
						};
						entregasFactory.buscarEntrada(objEntrada).then(function(data) {
							vm.entregas = data.GetBuscaParcialesListResult;
							if (data.GetBuscaParcialesListResult.length == 0) {
								ngNotify.set('No se encontraron registros.', 'error');
								vm.sinDatos = true;
							} else {
								vm.sinDatos = false;
							}
						});
					}

				} else if (vm.busquedaTipo == 2) {
					if (vm.buscarCajero == '') {
						changePlaza();
					} else {
						var objEntrada = {
							op: 4,
							referencia: '',
							cajera: vm.buscarCajero,
							fecha: '',
							IdCompania: vm.selectedPlaza.id_compania
						};
						entregasFactory.buscarEntrada(objEntrada).then(function(data) {
							vm.entregas = data.GetBuscaParcialesListResult;
							if (data.GetBuscaParcialesListResult.length == 0) {
								vm.sinDatos = true;
								ngNotify.set('No se encontraron registros.', 'error');
							} else {
								vm.sinDatos = false;
							}
						});
					}
				} else if (vm.busquedaTipo == 3) {
					if (vm.buscarFecha == '') {
						changePlaza();
					} else {
						vm.auxFecha = $filter('date')(vm.buscarFecha, 'dd/MM/yyyy');
						var objEntrada = {
							op: 5,
							referencia: '',
							cajera: '',
							fecha: vm.auxFecha,
							IdCompania: vm.selectedPlaza.id_compania
						};
						entregasFactory.buscarEntrada(objEntrada).then(function(data) {
							vm.entregas = data.GetBuscaParcialesListResult;
							if (data.GetBuscaParcialesListResult.length == 0) {
								vm.sinDatos = true;
								ngNotify.set('No se encontraron registros.', 'error');
							} else {
								vm.sinDatos = false;
							}
						});
					}
				}
			} else {
				ngNotify.set('Por Favor selecciona una plaza válida.', 'error');
			}

		}

		function eliminarEntrada(consecutivo) {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/eliminarEntrada.html',
				controller: 'EliminarEntregaCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					consecutivo: function() {
						return consecutivo;
					}
				}
			});
		}

		function cambiarBusqueda(x) {
			vm.busquedaTipo = x;
			if (x == 1) {
				vm.buscarCajero = '';
				vm.buscarFecha = '';
			} else if (x == 2) {
				vm.buscarFecha = '';
				vm.buscarReferencia = '';
			} else if (x == 3) {
				vm.buscarReferencia = '';
				vm.buscarCajero = '';
			}
		}

		$rootScope.$on('updateEntrada', function() {
			changePlaza();
		});

		function changePlaza() {
			vm.buscarFecha = '';
			vm.buscarReferencia = '';
			vm.Cajero = '';
			if (vm.selectedPlaza.id_compania != 0) {
				entregasFactory.getEntregas(vm.selectedPlaza.id_compania).then(function(data) {
					vm.showPaginator = true;
					vm.entregas = data.GetBuscaParcialesListResult;
					if (data.GetBuscaParcialesListResult.length == 0) {
						vm.sinDatos = true;
					} else {
						vm.sinDatos = false;
					}
				});
			}
		}

		function printEntrega(x) {
			entregasFactory.printEntrega(x).then(function(data) {
				var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteEntregasParcialesResult[0].NombreCajera;
				var obj = {
					url: url,
					titulo: 'Imprimir Entrega Parcial'
				};
				var modalInstance = $uibModal.open({
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/facturacion/printArchivos.html',
					controller: 'PrintArchivosCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					windowClass: 'app-modal-window',
					size: 'lg',
					resolve: {
						items: function() {
							return obj;
						}
					}
				});
			});
		}

		var vm = this;
		vm.changePlaza = changePlaza;
		vm.eliminarEntrada = eliminarEntrada;
		vm.cambiarBusqueda = cambiarBusqueda;
		vm.buscarEntrada = buscarEntrada;
		vm.showPaginator = false;
		vm.printEntrega = printEntrega;
		initialData();

	});
