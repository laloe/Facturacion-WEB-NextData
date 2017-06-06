'use strict';
angular
	.module('softvApp')
	.controller('ModalBuscaClienteCtrl', function($uibModalInstance, $uibModal, atencionFactory, $rootScope, ngNotify, $localStorage) {

		function initialData() {
			var obje = {};
			obje.servicio = 3;
			obje.op = 3;
			obje.colonia = 0;
			atencionFactory.buscarCliente(obje).then(function(data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
			});
		}

		function BusquedaporContrato() {
			var obje = {};
			obje.contrato = vm.BUcontrato;
			obje.servicio = 3;
			obje.colonia = 0;
			obje.op = 0;
			atencionFactory.buscarCliente(obje).then(function(data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
			});
		}

		function BusquedaporNombre() {
			var obje = {};
			obje.nombre = vm.BUnombre;
			obje.paterno = vm.BUapaterno;
			obje.materno = vm.BUamaterno;
			obje.colonia = 0;
			obje.servicio = 3;
			obje.op = 1;
			atencionFactory.buscarCliente(obje).then(function(data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
			});
		}

		function BusquedaporDireccion() {
			var obje = {};
			obje.servicio = 3;
			obje.calle = vm.BUcalle;
			obje.numero = vm.BUnumero;
			obje.colonia = 0;
			//obje.colonia
			obje.op = 2;
			atencionFactory.buscarCliente(obje).then(function(data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
			});
		}

		function BusquedaporAparato() {
			var obje = {};
			obje.servicio = 3;
			obje.setupbox = vm.BUaparato;
			obje.op = 5;
			obje.colonia = 0;
			atencionFactory.buscarCliente(obje).then(function(data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
			});
		}

		function Seleccionar(cliente) {
			$uibModalInstance.dismiss('cancel');
			$rootScope.$emit('cliente_seleccionado', cliente);
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.Seleccionar = Seleccionar;
		initialData();
		vm.BusquedaporNombre = BusquedaporNombre;
		vm.BusquedaporDireccion = BusquedaporDireccion;
		vm.BusquedaporAparato = BusquedaporAparato;
		vm.BusquedaporContrato = BusquedaporContrato;
	});
