'use strict';
angular
	.module('softvApp')
	.controller('DesgloseMonedaCtrl', function($rootScope, $state, $uibModal, desgloseFactory, $filter, ngNotify, $localStorage, globalService) {

		function initialData() {
			desgloseFactory.busquedaDesglose(0, $localStorage.currentUser.usuario, vm.fecha).then(function(data) {
				vm.desglose = data.GetBuscaDesgloseDeMonedaListResult;
				vm.sinDatos = false;
				vm.showPaginator = true;
			});
			desgloseFactory.checarDesglose($localStorage.currentUser.usuario, vm.fechaChecar).then(function(data) {
				vm.resultado = data.GetDeepuspChecaSiTieneDesgloseResult.Resultado;
			});
		}

		function verTodo() {
			initialData();
		}

		$rootScope.$on('updateDesglose', function() {
			initialData();
		});

		function buscarPorFecha(fechaBusqueda) {
			if (fechaBusqueda == undefined || fechaBusqueda == '') {
				ngNotify.set('Seleccione una fecha.', 'error');
			} else {
				vm.seleccion = 2;
				vm.auxFechaInicio = $filter('date')(fechaBusqueda, 'dd/MM/yyyy');
				desgloseFactory.busquedaDesglose(vm.seleccion, $localStorage.currentUser.usuario, vm.auxFechaInicio).then(function(data) {
					if (data.GetBuscaDesgloseDeMonedaListResult.length == 0) {
						ngNotify.set('No se encontraron registros.', 'error');
						vm.sinDatos = true;
						vm.desglose = '';
						vm.showPaginator = false;
					} else {
						vm.sinDatos = false;
						vm.desglose = data.GetBuscaDesgloseDeMonedaListResult;
						vm.showPaginator = true;
					}
				});
			}
		}

		function validar(id, consecutivo) {
			var items = {
				id: id,
				consecutivo: consecutivo
			};
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalValidar.html',
				controller: 'ModalValidarCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					items: function() {
						return items;
					}
				}
			});
		}

		// autenticar

		function nuevo() {

			if (vm.resultado == 0) {
				$state.go('home.facturacion.desgloseNuevo');
			} else {
				ngNotify.set('Ya existe desglose generado del día, proceda a eliminar el anterior para ingresar uno nuevo.', 'error');;
			}
		}

		// editar

		function detalleDesglose(consecutivo) {
			$state.go('home.facturacion.desgloseDetalle', {
				id: consecutivo
			});
		}

		function printDesglose(x) {
			desgloseFactory.printDesglose(x).then(function(data) {
				var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteDesgloseMonedaResult[0].Cajera;
				var obj = {
					url: url,
					titulo: 'Imprimir Desglose De Mondeda'
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
		vm.showPanel = true;
		vm.nuevo = nuevo;
		vm.date = new Date();
		vm.fecha = '';
		vm.fechaChecar = $filter('date')(vm.date, 'dd/MM/yyyy');
		vm.detalleDesglose = detalleDesglose;
		vm.buscarPorFecha = buscarPorFecha;
		vm.validar = validar;
		vm.verTodo = verTodo;
		vm.printDesglose = printDesglose;
		initialData();
	});
