(function () {
	'use strict';

	angular
		.module('softvApp')
		.controller('OrdenesServicioCtrl', OrdenesServicioCtrl);

	OrdenesServicioCtrl.inject = ['$state', 'ngNotify', '$location', 'ordenesFactory'];
	function OrdenesServicioCtrl($state, ngNotify, $location, ordenesFactory) {
		var vm = this;
		vm.showdatosPlaza = false;
		vm.cambioPlaza = cambioPlaza;
		vm.cambioReporte = cambioReporte;
		vm.buscarOrden = buscarOrden;
		vm.status = 0;
		vm.sinRegistros = false;
		vm.conRegistros = true;
		vm.buscarNombres = buscarNombres;
		vm.buscarColonia = buscarColonia;
		vm.buscarSetup = buscarSetup;
		vm.buscarStatus = buscarStatus;

		this.$onInit = function () {
			ordenesFactory.getPlazas().then(function (data) {
				data.GetMuestra_Compania_RelUsuarioListResult.unshift({
					'razon_social': '----------------',
					'id_compania': 0
				});
				vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
				vm.selectedPlaza = vm.plazas[0];
			});
			ordenesFactory.getUsuarios().then(function (data) {
				vm.usuarios = data.GetMUESTRAUSUARIOSListResult;
				vm.selectedUsuario = vm.usuarios[0];
			});
			var obj = {
				op: 6,
				orden: 0,
				contrato: '',
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				compania: 0,
				setupbox: '',
				status: '',
				auto: 0
			};
			ordenesFactory.buscarOrdenes(obj).then(function (data) {
				vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
			});
		}

		function cambioPlaza() {
			if (vm.selectedPlaza.id_compania > 0) {
				ordenesFactory.getColonias(vm.selectedPlaza.id_compania).then(function (data) {
					vm.colonias = data.GetuspConsultaColoniasListResult;
					vm.selectedColonia = vm.colonias[0];
				});
			}
		}

		function cambioReporte(x) {
			if (x == 1) {
				vm.contrato = '';
				vm.op = 33;
			} else {
				vm.orden = 0;
				vm.op = 30;
			}
		}

		function buscarOrden() {
			if (vm.auto == undefined) {
				vm.auto = 0;
			} else {
				vm.auto = 1;
			}

			if (vm.selectedPlaza.id_compania == 0) {
				ngNotify.set('Selecciona una plaza valida.', 'error');
			} else if (vm.contrato == undefined && vm.orden == undefined) {
				ngNotify.set('Introduce un número de contrato ó un número de orden.', 'error');
			} else if (vm.contrato == '' && vm.orden == '') {
				ngNotify.set('Introduce un número de contrato ó un número de orden.', 'error');
			} else {
				var obj = {
					op: vm.op,
					orden: vm.orden,
					contrato: vm.contrato,
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					compania: vm.selectedPlaza.id_compania,
					setupbox: '',
					// clvUsuario:vm.selectedUsuario.Clave,
					status: '',
					auto: vm.auto
				};
				ordenesFactory.buscarOrdenes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
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

		function buscarColonia() {
			if (vm.auto == undefined) {
				vm.auto = 0;
			} else {
				vm.auto = 1;
			}

			if (vm.selectedPlaza.id_compania == 0) {
				ngNotify.set('Selecciona una plaza valida.', 'error');
			} else if (vm.calle == '' && vm.numero == '' && vm.selectedColonia.clvColonia == 0) {
				ngNotify.set('Introduce un domicilio válido.', 'error');
			} else if (vm.calle == undefined && vm.numero == undefined && vm.selectedColonia.clvColonia == 0) {
				ngNotify.set('Introduce un domicilio válido.', 'error');
			} else {
				var obj = {
					op: 32,
					orden: 0,
					contrato: '',
					nombre: '',
					paterno: '',
					materno: '',
					calle: vm.calle,
					numero: vm.numero,
					colonia: vm.selectedColonia.clvColonia,
					compania: vm.selectedPlaza.id_compania,
					setupbox: '',
					status: '',
					auto: vm.auto
				};
				ordenesFactory.buscarOrdenes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
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
			if (vm.auto == undefined) {
				vm.auto = 0;
			} else {
				vm.auto = 1;
			}

			if (vm.selectedPlaza.id_compania == 0) {
				ngNotify.set('Selecciona una plaza valida.', 'error');
			} else if (vm.nombre == '' && vm.paterno == '' && vm.materno == '') {
				ngNotify.set('Introduce un nombre válido.', 'error');
			} else if (vm.nombre == undefined && vm.paterno == undefined && vm.materno == undefined) {
				ngNotify.set('Introduce un nombre válido.', 'error');
			} else {
				var obj = {
					op: 31,
					orden: 0,
					contrato: '',
					nombre: vm.nombre,
					paterno: vm.paterno,
					materno: vm.materno,
					calle: '',
					numero: '',
					colonia: 0,
					compania: vm.selectedPlaza.id_compania,
					setupbox: '',
					// clvUsuario:vm.selectedUsuario.Clave,
					status: '',
					auto: vm.auto
				};
				ordenesFactory.buscarOrdenes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
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

		function buscarSetup() {
			if (vm.auto == undefined) {
				vm.auto = 0;
			} else {
				vm.auto = 1;
			}

			if (vm.selectedPlaza.id_compania == 0) {
				ngNotify.set('Selecciona una plaza valida.', 'error');
			} else if (vm.status == '' && vm.status == undefined) {
				ngNotify.set('Introduce un SetupBox válido.', 'error');
			} else {
				var obj = {
					op: 5,
					orden: 0,
					contrato: '',
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					compania: vm.selectedPlaza.id_compania,
					setupbox: vm.setupbox,
					status: '',
					auto: vm.auto
				};
				ordenesFactory.buscarOrdenes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
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

		function buscarStatus() {
			if (vm.auto == undefined) {
				vm.auto = 0;
			} else {
				vm.auto = 1;
			}

			if (vm.status == 1) {
				vm.stat = 'P';
			} else if (vm.status == 2) {
				vm.stat = 'E';
			} else if (vm.status == 3) {
				vm.stat = 'V';
			}

			if (vm.selectedPlaza.id_compania == 0) {
				ngNotify.set('Selecciona una plaza valida.', 'error');
			} else {
				var obj = {
					op: 399,
					orden: 0,
					contrato: '',
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					compania: vm.selectedPlaza.id_compania,
					setupbox: '',
					status: vm.stat,
					auto: vm.auto
				};
				ordenesFactory.buscarOrdenes(obj).then(function (data) {
					vm.ordenes = data.GetuspBuscaOrdSer_BuscaOrdSerSeparado2ListResult;
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
	}
})();
