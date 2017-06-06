(function () {
	'use strict';

	angular
		.module('softvApp')
		.controller('BuscarNuevoCtrl', BuscarNuevoCtrl);

	BuscarNuevoCtrl.inject = ['$state', 'ngNotify', 'ordenesFactory', '$uibModalInstance', '$rootScope'];
	function BuscarNuevoCtrl($state, ngNotify, ordenesFactory, $uibModalInstance, $rootScope) {
		var vm = this;
		$('.buscarContrato').collapse('show');
		vm.buscarNombres = buscarNombres;
		vm.buscarDomicilio = buscarDomicilio;
		vm.sinRegistros = false;
		vm.conRegistros = true;
		vm.buscarSetupbox = buscarSetupbox;
		vm.buscarContrato = buscarContrato;
		vm.seleccionar = seleccionar;
		vm.cancel = cancel;
		initial()

		function initial() {
			var obj = {
				contrato: '',
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				// clvUsuario:vm.selectedUsuario.Clave,
				op: 3
			};
			ordenesFactory.buscarClientes(obj).then(function (data) {
				vm.ordenes = data.GetuspBuscaContratoSeparado2ListResult;
			});
			// ordenesFactory.getColoniasUser().then(function(data) {
			// 	vm.colonias = data.GetuspConsultaColoniasPorUsuarioListResult;
			// 	console.log(vm.colonias);
			// });
		}

		function seleccionar(cliente) {
			$uibModalInstance.dismiss('cancel');
			$rootScope.$emit('cliente_select', cliente);
		}

		function buscarContrato() {
			if (vm.contrato == undefined || vm.contrato == '') {
				ngNotify.set('Introduce un contrato valido.', 'error');
			} else {
				$('.buscarContrato').collapse('hide');
				var obj = {
					contrato: vm.contrato,
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					// clvUsuario:vm.selectedUsuario.Clave,
					op: 0
				};
				ordenesFactory.buscarClientes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaContratoSeparado2ListResult;
					if (vm.ordenes.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
		}

		function buscarNombres() {
			if (vm.nombre == undefined && vm.paterno == undefined && vm.materno == undefined) {
				ngNotify.set('Introduce un nombre valido.', 'error');
			} else if (vm.nombre == '' && vm.paterno == '' && vm.materno == '') {
				ngNotify.set('Introduce un nombre valido.', 'error');
			} else {
				$('.buscarContrato').collapse('hide');
				// if (vm.paterno == undefined) {
				// 	vm.paterno = '';
				// }
				var obj = {
					contrato: '',
					nombre: vm.nombre,
					paterno: vm.paterno,
					materno: vm.materno,
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					// clvUsuario:vm.selectedUsuario.Clave,
					op: 1
				};
				ordenesFactory.buscarClientes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaContratoSeparado2ListResult;
					if (vm.ordenes.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
		}

		function buscarDomicilio() {
			if (vm.calle == undefined && vm.numero == undefined && vm.colonia == undefined) {
				ngNotify.set('Introduce un domicilio valido.', 'error');
			} else if (vm.calle == '' && vm.numero == '' && vm.colonia == '') {
				ngNotify.set('Introduce un domicilio valido.', 'error');
			} else {
				$('.buscarContrato').collapse('hide');
				var obj = {
					contrato: '',
					nombre: '',
					paterno: '',
					materno: '',
					calle: vm.calle,
					numero: vm.numero,
					colonia: 0,
					setupbox: '',
					// clvUsuario:vm.selectedUsuario.Clave,
					op: 2
				};
				ordenesFactory.buscarClientes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaContratoSeparado2ListResult;
					if (vm.ordenes.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
		}

		function buscarSetupbox() {
			if (vm.setupbox == undefined || vm.setupbox == '') {
				ngNotify.set('Introduce un setupbox valido.', 'error');
			} else {
				$('.buscarContrato').collapse('hide');
				var obj = {
					contrato: '',
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: vm.setupbox,
					// clvUsuario:vm.selectedUsuario.Clave,
					op: 5
				};
				ordenesFactory.buscarClientes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaContratoSeparado2ListResult;
					if (vm.ordenes.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();