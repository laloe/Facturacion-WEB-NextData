'use strict';
angular
	.module('softvApp')
	.controller('ModalPagarCtrl', function($uibModalInstance, $uibModal, items, cajasFactory, $state, $rootScope, ngNotify) {

		function initialData() {
			vm.monto = items.monto;
			cajasFactory.dameBancos().then(function(data) {
				data.GetMuestraBancosListResult.unshift({
					'nombre': '----------------',
					'Clave': 0
				});
				vm.bancos = data.GetMuestraBancosListResult;
				vm.selectedBancoTransferencia = data.GetMuestraBancosListResult[0];
				vm.selectedBancoCheque = data.GetMuestraBancosListResult[0];
			});
		}


		function cambioEfectivo() {
			vm.cambio = vm.efectivo - vm.monto;
			if (vm.cambio < 0) {
				vm.cambio = 0;
			}
			vm.TotalAbonado = vm.efectivo;
			if (vm.TotalAbonado > vm.monto) {
				vm.TotalAbonado = vm.monto;
			}
			vm.casePago = 1;
			vm.dineroCheque = '';
			vm.numeroCheque = '';
			vm.cuentaTransferencia = '';
			vm.autorizacionTransferencia = '';
			vm.dineroCredito = '';
			vm.dineroTransferencia = '';
			vm.pagoNota = '';
		}

		function cambioCheque() {
			vm.cambio = '';
			vm.TotalAbonado = '';
			if (vm.dineroCheque > vm.monto) {
				vm.dineroCheque = vm.monto;
			}
			vm.TotalAbonado = vm.dineroCheque;
			if (vm.TotalAbonado > vm.monto) {
				vm.TotalAbonado = vm.monto;
			}
			vm.efectivo = '';
			vm.casePago = 2;
			vm.cuentaTransferencia = '';
			vm.autorizacionTransferencia = '';
			vm.dineroCredito = '';
			vm.pagoNota = '';
			vm.dineroTransferencia = '';
		}

		function cambioTransferencia() {
			vm.cambio = '';
			vm.TotalAbonado = '';
			if (vm.dineroTransferencia > vm.monto) {
				vm.dineroTransferencia = vm.monto;
			}
			vm.TotalAbonado = vm.dineroTransferencia;
			if (vm.TotalAbonado > vm.monto) {
				vm.TotalAbonado = vm.monto;
			}
			vm.dineroCheque = '';
			vm.numeroCheque = '';
			vm.efectivo = '';
			vm.casePago = 3;
			vm.dineroCredito = '';
			vm.pagoNota = '';
		}

		function cambioCredito() {
			vm.cuentaTransferencia = '';
			vm.dineroTransferencia = '';
			vm.autorizacionTransferencia = '';
			vm.dineroCheque = '';
			vm.numeroCheque = '';
			vm.efectivo = '';
			vm.casePago = 4;
			cajasFactory.dameMontoCredito(vm.dineroCredito, items.Contrato).then(function(data) {
				vm.pagoNota = data.GetDeepMontoNotaCreditoResult.Monto;
				vm.TotalAbonado = vm.pagoNota;
				if (vm.TotalAbonado > vm.monto) {
					vm.TotalAbonado = vm.monto;
				}
			});
		}

		function ok() {
			if (vm.casePago == undefined) {
				ngNotify.set('Por favor llena un metodo de pago.', 'error');
			} else {
				switch (vm.casePago) {
					case 1:
						if (vm.efectivo >= vm.monto) {
							var objPagar = {
								'contrato': items.Contrato,
								'clv_session': items.IdSession,
								'tipo': items.Tipo,
								'serie_v': items.Serie,
								'folio_v': items.Folio,
								'clv_vendedor': items.Vendedor,
								'tipo1': 0,
								'monto1': vm.monto,
								'GLOEFECTIVO2': vm.monto,
								'GLOCHEQUE2': 0,
								'GLOCLV_BANCOCHEQUE2': 0,
								'NUMEROCHEQUE2': '',
								'GLOTARJETA2': 0,
								'GLOCLV_BANCOTARJETA2': 0,
								'NUMEROTARJETA2': '',
								'TARJETAAUTORIZACION2': '',
								'CLV_Nota3': 0,
								'GLONOTA3': 0
							};
							cajasFactory.insertSeguridadToken(items.IdSession).then(function(dataToken) {
								cajasFactory.nuevoPago(items.IdSession, vm.efectivo, vm.cambio).then(function(dataNuevo) {
									cajasFactory.grabaPago(objPagar).then(function(dataGraba) {
										$uibModalInstance.dismiss('cancel');
										$rootScope.$emit('ocultarPagar', {});
										$rootScope.$emit('getVendedores', {});
										ngNotify.set('Pago Exitoso', 'success');
										vm.Clv_Factura = dataGraba.GetDeepGrabaFacturas2Result.Clv_FacturaSalida;
										cajasFactory.getOrden(vm.Clv_Factura).then(function(orden) {
											if (orden.GetDamelasOrdenesque_GeneroFacturaAgendaOrdserResult.Orden > 0) {
												cajasFactory.tieneFactura(vm.Clv_Factura).then(function(dataTiene) {
													var modalInstance = $uibModal.open({
														animation: true,
														ariaLabelledBy: 'modal-title',
														ariaDescribedBy: 'modal-body',
														templateUrl: 'views/facturacion/modalSingleTicket.html',
														controller: 'ModalSingleTicketCtrl',
														controllerAs: 'ctrl',
														backdrop: 'static',
														keyboard: false,
														size: 'sm',
														resolve: {
															factura: function() {
																return vm.Clv_Factura;
															},
															imprimir: function() {
																return true;
															}
														}
													});
													if (dataTiene.GetValidaExistenciaOrdenPorFacturaResult.valida == 1) {
														var modalInstance = $uibModal.open({
															animation: true,
															ariaLabelledBy: 'modal-title',
															ariaDescribedBy: 'modal-body',
															templateUrl: 'views/facturacion/modalAgenda.html',
															controller: 'ModalAgendaVentasCtrl',
															controllerAs: 'ctrl',
															backdrop: 'static',
															keyboard: false,
															size: 'sm',
															resolve: {
																orden: function() {
																	return orden.GetDamelasOrdenesque_GeneroFacturaAgendaOrdserResult.Orden;
																}
															}
														});
													}

												});
											} else {
												var modalInstance = $uibModal.open({
													animation: true,
													ariaLabelledBy: 'modal-title',
													ariaDescribedBy: 'modal-body',
													templateUrl: 'views/facturacion/modalSingleTicket.html',
													controller: 'ModalSingleTicketCtrl',
													controllerAs: 'ctrl',
													backdrop: 'static',
													keyboard: false,
													size: 'sm',
													resolve: {
														factura: function() {
															return vm.Clv_Factura;
														},
														imprimir: function() {
															return true;
														}
													}
												});
											}
										});
									});
								});
							});
						} else {
							ngNotify.set('No se ha saldado la factura.', 'error');
						}
						break;
					case 2:
						if (vm.selectedBancoCheque.Clave == 0) {
							ngNotify.set('Selecciona un banco.', 'error');
						} else if (vm.numeroCheque == "" || vm.numeroCheque == undefined) {
							ngNotify.set('Digita el número del cheque.', 'error');
						} else {
							if (vm.dineroCheque == vm.monto) {
								var objPagar = {
									'contrato': items.Contrato,
									'clv_session': items.IdSession,
									'tipo': items.Tipo,
									'serie_v': items.Serie,
									'folio_v': items.Folio,
									'clv_vendedor': items.Vendedor,
									'tipo1': 0,
									'monto1': vm.monto,
									'GLOEFECTIVO2': 0,
									'GLOCHEQUE2': vm.dineroCheque,
									'GLOCLV_BANCOCHEQUE2': vm.selectedBancoCheque.Clave,
									'NUMEROCHEQUE2': vm.numeroCheque,
									'GLOTARJETA2': 0,
									'GLOCLV_BANCOTARJETA2': 0,
									'NUMEROTARJETA2': '',
									'TARJETAAUTORIZACION2': '',
									'CLV_Nota3': 0,
									'GLONOTA3': 0
								};
								cajasFactory.insertSeguridadToken(items.IdSession).then(function(data) {
									cajasFactory.grabaPago(objPagar).then(function(dataGraba) {
										$uibModalInstance.dismiss('cancel');
										$rootScope.$emit('ocultarPagar', {});
										$rootScope.$emit('getVendedores', {});
										ngNotify.set('Pago Exitoso', 'success');
										vm.Clv_Factura = dataGraba.GetDeepGrabaFacturas2Result.Clv_FacturaSalida;
										cajasFactory.getOrden(vm.Clv_Factura).then(function(orden) {
											if (orden.GetDamelasOrdenesque_GeneroFacturaAgendaOrdserResult.Orden > 0) {
												cajasFactory.tieneFactura(vm.Clv_Factura).then(function(dataTiene) {
													var modalInstance = $uibModal.open({
														animation: true,
														ariaLabelledBy: 'modal-title',
														ariaDescribedBy: 'modal-body',
														templateUrl: 'views/facturacion/modalSingleTicket.html',
														controller: 'ModalSingleTicketCtrl',
														controllerAs: 'ctrl',
														backdrop: 'static',
														keyboard: false,
														size: 'sm',
														resolve: {
															factura: function() {
																return vm.Clv_Factura;
															},
															imprimir: function() {
																return true;
															}
														}
													});
													if (dataTiene.GetValidaExistenciaOrdenPorFacturaResult.valida == 1) {
														var modalInstance = $uibModal.open({
															animation: true,
															ariaLabelledBy: 'modal-title',
															ariaDescribedBy: 'modal-body',
															templateUrl: 'views/facturacion/modalAgenda.html',
															controller: 'ModalAgendaVentasCtrl',
															controllerAs: 'ctrl',
															backdrop: 'static',
															keyboard: false,
															size: 'sm',
															resolve: {
																orden: function() {
																	return orden.GetDamelasOrdenesque_GeneroFacturaAgendaOrdserResult.Orden;
																}
															}
														});
													}

												});
											} else {
												var modalInstance = $uibModal.open({
													animation: true,
													ariaLabelledBy: 'modal-title',
													ariaDescribedBy: 'modal-body',
													templateUrl: 'views/facturacion/modalSingleTicket.html',
													controller: 'ModalSingleTicketCtrl',
													controllerAs: 'ctrl',
													backdrop: 'static',
													keyboard: false,
													size: 'sm',
													resolve: {
														factura: function() {
															return vm.Clv_Factura;
														},
														imprimir: function() {
															return true;
														}
													}
												});
											}
										});
									});
								});
							} else {
								ngNotify.set('No se ha saldado la factura', 'error');
							}
						}
						break;
					case 3:
						if (vm.selectedBancoTransferencia.Clave == 0) {
							ngNotify.set('Selecciona un banco', 'error');
						} else if (vm.cuentaTransferencia == "" || vm.cuentaTransferencia == undefined) {
							ngNotify.set('Digita el número de cuenta por favor.', 'error');
						} else if (vm.autorizacionTransferencia == "" || vm.autorizacionTransferencia == undefined) {
							ngNotify.set('Digita el número de autorizacion.', 'error');
						} else {
							if (vm.dineroTransferencia == vm.monto) {
								var objPagar = {
									'contrato': items.Contrato,
									'clv_session': items.IdSession,
									'tipo': items.Tipo,
									'serie_v': items.Serie,
									'folio_v': items.Folio,
									'clv_vendedor': items.Vendedor,
									'tipo1': 0,
									'monto1': vm.monto,
									'GLOEFECTIVO2': 0,
									'GLOCHEQUE2': 0,
									'GLOCLV_BANCOCHEQUE2': 0,
									'NUMEROCHEQUE2': '',
									'GLOTARJETA2': vm.dineroTransferencia,
									'GLOCLV_BANCOTARJETA2': vm.selectedBancoTransferencia.Clave,
									'NUMEROTARJETA2': vm.cuentaTransferencia,
									'TARJETAAUTORIZACION2': vm.autorizacionTransferencia,
									'CLV_Nota3': 0,
									'GLONOTA3': 0
								};
								cajasFactory.insertSeguridadToken(items.IdSession).then(function(data) {
									cajasFactory.grabaPago(objPagar).then(function(dataGraba) {
										$uibModalInstance.dismiss('cancel');
										$rootScope.$emit('ocultarPagar', {});
										$rootScope.$emit('getVendedores', {});
										ngNotify.set('Pago Exitoso', 'success');
										vm.Clv_Factura = dataGraba.GetDeepGrabaFacturas2Result.Clv_FacturaSalida;
										cajasFactory.getOrden(vm.Clv_Factura).then(function(orden) {
											if (orden.GetDamelasOrdenesque_GeneroFacturaAgendaOrdserResult.Orden > 0) {
												cajasFactory.tieneFactura(vm.Clv_Factura).then(function(dataTiene) {
													var modalInstance = $uibModal.open({
														animation: true,
														ariaLabelledBy: 'modal-title',
														ariaDescribedBy: 'modal-body',
														templateUrl: 'views/facturacion/modalSingleTicket.html',
														controller: 'ModalSingleTicketCtrl',
														controllerAs: 'ctrl',
														backdrop: 'static',
														keyboard: false,
														size: 'sm',
														resolve: {
															factura: function() {
																return vm.Clv_Factura;
															},
															imprimir: function() {
																return true;
															}
														}
													});
													if (dataTiene.GetValidaExistenciaOrdenPorFacturaResult.valida == 1) {
														var modalInstance = $uibModal.open({
															animation: true,
															ariaLabelledBy: 'modal-title',
															ariaDescribedBy: 'modal-body',
															templateUrl: 'views/facturacion/modalAgenda.html',
															controller: 'ModalAgendaVentasCtrl',
															controllerAs: 'ctrl',
															backdrop: 'static',
															keyboard: false,
															size: 'sm',
															resolve: {
																orden: function() {
																	return orden.GetDamelasOrdenesque_GeneroFacturaAgendaOrdserResult.Orden;
																}
															}
														});
													}

												});
											} else {
												var modalInstance = $uibModal.open({
													animation: true,
													ariaLabelledBy: 'modal-title',
													ariaDescribedBy: 'modal-body',
													templateUrl: 'views/facturacion/modalSingleTicket.html',
													controller: 'ModalSingleTicketCtrl',
													controllerAs: 'ctrl',
													backdrop: 'static',
													keyboard: false,
													size: 'sm',
													resolve: {
														factura: function() {
															return vm.Clv_Factura;
														},
														imprimir: function() {
															return true;
														}
													}
												});
											}
										});
									});
								});
							} else {
								ngNotify.set('No se ha saldado la factura', 'error');
							}
						}
						break;
					case 4:
						if (vm.dineroCredito == '' || vm.dineroCredito == undefined) {
							ngNotify.set('Seleccione un número de nota por favor', 'error');
						} else {
							if (vm.pagoNota >= vm.monto) {
								var objPagar = {
									'contrato': items.Contrato,
									'clv_session': items.IdSession,
									'tipo': items.Tipo,
									'serie_v': items.Serie,
									'folio_v': items.Folio,
									'clv_vendedor': items.Vendedor,
									'tipo1': 0,
									'monto1': vm.monto,
									'GLOEFECTIVO2': 0,
									'GLOCHEQUE2': 0,
									'GLOCLV_BANCOCHEQUE2': 0,
									'NUMEROCHEQUE2': '',
									'GLOTARJETA2': 0,
									'GLOCLV_BANCOTARJETA2': 0,
									'NUMEROTARJETA2': '',
									'TARJETAAUTORIZACION2': '',
									'CLV_Nota3': vm.dineroCredito,
									'GLONOTA3': vm.pagoNota
								};
								cajasFactory.insertSeguridadToken(items.IdSession).then(function(data) {
									cajasFactory.grabaPago(objPagar).then(function(dataGraba) {
										$uibModalInstance.dismiss('cancel');
										$rootScope.$emit('ocultarPagar', {});
										$rootScope.$emit('getVendedores', {});
										ngNotify.set('Pago Exitoso', 'success');
										vm.Clv_Factura = dataGraba.GetDeepGrabaFacturas2Result.Clv_FacturaSalida;
										cajasFactory.getOrden(vm.Clv_Factura).then(function(orden) {
											if (orden.GetDamelasOrdenesque_GeneroFacturaAgendaOrdserResult.Orden > 0) {
												cajasFactory.tieneFactura(vm.Clv_Factura).then(function(dataTiene) {
													var modalInstance = $uibModal.open({
														animation: true,
														ariaLabelledBy: 'modal-title',
														ariaDescribedBy: 'modal-body',
														templateUrl: 'views/facturacion/modalSingleTicket.html',
														controller: 'ModalSingleTicketCtrl',
														controllerAs: 'ctrl',
														backdrop: 'static',
														keyboard: false,
														size: 'sm',
														resolve: {
															factura: function() {
																return vm.Clv_Factura;
															},
															imprimir: function() {
																return true;
															}
														}
													});
													if (dataTiene.GetValidaExistenciaOrdenPorFacturaResult.valida == 1) {
														var modalInstance = $uibModal.open({
															animation: true,
															ariaLabelledBy: 'modal-title',
															ariaDescribedBy: 'modal-body',
															templateUrl: 'views/facturacion/modalAgenda.html',
															controller: 'ModalAgendaVentasCtrl',
															controllerAs: 'ctrl',
															backdrop: 'static',
															keyboard: false,
															size: 'sm',
															resolve: {
																orden: function() {
																	return orden.GetDamelasOrdenesque_GeneroFacturaAgendaOrdserResult.Orden;
																}
															}
														});
													}

												});
											} else {
												var modalInstance = $uibModal.open({
													animation: true,
													ariaLabelledBy: 'modal-title',
													ariaDescribedBy: 'modal-body',
													templateUrl: 'views/facturacion/modalSingleTicket.html',
													controller: 'ModalSingleTicketCtrl',
													controllerAs: 'ctrl',
													backdrop: 'static',
													keyboard: false,
													size: 'sm',
													resolve: {
														factura: function() {
															return vm.Clv_Factura;
														},
														imprimir: function() {
															return true;
														}
													}
												});
											}
										});
									});
								});
							} else {
								ngNotify.set('No se ha saldado la factura', 'error');
							}
						}
						break;
					default:
						console.log('sasasas');
				}
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.cambioEfectivo = cambioEfectivo;
		vm.cambioCheque = cambioCheque;
		vm.cambioTransferencia = cambioTransferencia;
		vm.cambioCredito = cambioCredito;
		vm.cambio = '';
		vm.TotalAbonado = '';
		vm.ok = ok;
		initialData();
	});
