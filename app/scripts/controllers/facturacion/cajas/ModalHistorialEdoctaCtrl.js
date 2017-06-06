'use strict';
angular
	.module('softvApp')
	.controller('modalHistorialEdoctaCtrl', function ($uibModal, $uibModalInstance, contrato, ordenesFactory, cajasFactory, ngNotify, $rootScope) {
		function init() {
			cajasFactory.ObtieneEdoCuentaPorContrato(contrato).then(function (data) {
				vm.ListaEstados = data.GetObtieneEdoCuentaPorContratoListResult;
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function ok() {

		}

		function Reprocesar(IdEstadoCuenta, contrato) {
			cajasFactory.ValidaReprocesoPorContrato(IdEstadoCuenta).then(function (data) {
				if (data.GetDeepValidaReprocesoPorContratoResult.reproceso > 0) {
					cajasFactory.ReprocesaEdoCuentaContrato(IdEstadoCuenta, contrato).then(function (data) {
						ordenesFactory.addBitacoraReproceso(contrato).then(function (dataBit) {
							$rootScope.$emit('realoadPagos', {});
							ngNotify.set('El estado de cuenta se reproceso correctamente.');
							init();
						});
					});
				} else {
					ngNotify.set('Solo es posible reprocesar el estado de cuenta actual o el cliente tiene un cambio de servicio pendiente', 'error');
				}

			});


		}

		function Reenviar(detalle) {
			var IdEstadoCuenta = detalle.IdEstadoCuenta;
			var contrato = detalle.ContratoBueno;
			var id = detalle.Id;
			var contratocomp = detalle.Contrato;

			cajasFactory.ReenviaEstadosCuentaPorContrato(IdEstadoCuenta).then(function (data) {
				var reenvia = data.GetDeepReenviaEstadosCuentaPorContratoResult.reenvia;
				if (reenvia > 0) {
					cajasFactory.EnviaCorreoEstadoCuenta(contrato, id, contratocomp, IdEstadoCuenta).then(function (data) {
						ordenesFactory.addBitacoraReenviar(contrato).then(function (dataBit) {
							ngNotify.set('El estado de cuenta se reenvió correctamente.');
						});
					});

				} else {
					ngNotify.set('solo es posible reenviar el estado de cuenta actual', 'error');
				}
			});
		}

		function Imprimir(detalle) {
			console.log(detalle);
			var options = {};
			options.Id = detalle.Id;
			options.IdEstadoCuenta = detalle.IdEstadoCuenta;
			options.Contrato = detalle.Contrato;
			options.Tipo = 2;
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/ModalEdoCuenta.html',
				controller: 'ModalNuevoEdoctaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				resolve: {
					options: function () {
						return options;
					}
				}
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		init();
		vm.Reenviar = Reenviar;
		vm.Reprocesar = Reprocesar;
		vm.Imprimir = Imprimir;

	});
