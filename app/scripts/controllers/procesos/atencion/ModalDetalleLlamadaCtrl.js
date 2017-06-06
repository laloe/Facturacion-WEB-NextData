'use strict';
angular
	.module('softvApp')
	.controller('ModalDetalleLlamadaCtrl', function ($uibModalInstance, $uibModal, options, atencionFactory, $rootScope, ngNotify, $localStorage) {
		function initialData() {
			atencionFactory.ConsultaLLamada(options.llamada).then(function (data) {
				var conceptos = data.GetLLamadasdeInternetListResult[0];
				vm.Servicio = conceptos.Concepto;
				vm.Problema = conceptos.Descripcion;
				vm.CProblema = conceptos.ClasificacionProblema;
				vm.Solucion = conceptos.Solucion;
				vm.CSolucion = conceptos.ClasificacionSolucion;
				vm.Atencion = conceptos.TipoAtencion;
				vm.Contrato = conceptos.ContratoCom;
				vm.Fecha = conceptos.Fecha;
				vm.Hora = conceptos.HoraInicial;

				var param = {};
				param.contrato = vm.Contrato
				param.servicio = options.servicio;
				param.op = 0;
				atencionFactory.buscarCliente(param).then(function (data) {
					var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
					var contrato = detalle.ContratoBueno;
					vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
					vm.DireccionCliente = "Calle: " + detalle.CALLE + " #" + detalle.NUMERO + " Colonia: " + detalle.COLONIA + " Ciudad:" + detalle.CIUDAD;
					atencionFactory.getServiciosCliente(contrato).then(function (data) {
						vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;
					});
				});
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
		var vm = this;
		vm.cancel = cancel;
		vm.NumeroLlamada = options.llamada;
		console.log(options);
		initialData();
	});
