'use strict';
angular.module('softvApp').controller('PagarContadoCtrl', PagarContadoCtrl);

function PagarContadoCtrl($uibModal, $state, $rootScope, ngNotify, inMenu, $uibModalInstance, metodo, x, elem1, $localStorage, pagosMaestrosFactory, cajasFactory) {
	function initialData() {
		vm.monto = elem1;
		pagosMaestrosFactory.getMedios().then(function (data) {
			data.GetObtieneMediosPagoListResult.unshift({
				'Nombre': '----------------',
				'IdMedioPago': 0
			});
			vm.medios = data.GetObtieneMediosPagoListResult;
			vm.selectedMedio = data.GetObtieneMediosPagoListResult[0];
		});
		cajasFactory.dameBancos().then(function (data) {
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
		vm.maxmonto = vm.monto * 10;
		if (vm.efectivo > vm.maxmonto) {
			vm.efectivo = vm.maxmonto;
		}
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

	// function ok() {
	// 	if (vm.selectedMedio.IdMedioPago == 0) {
	// 		ngNotify.set('Seleccione el medio de pago', 'error');
	// 	} else {
	// 		var objPagar = {
	// 			'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
	// 			'ContratoMaestro': x.ContratoMaestro,
	// 			'Cajera': $localStorage.currentUser.usuario,
	// 			'IpMaquina': $localStorage.currentUser.maquina,
	// 			'Sucursal': $localStorage.currentUser.sucursal,
	// 			'Monto': vm.monto,
	// 			'IdMedioPago': vm.selectedMedio.IdMedioPago,
	// 			'IdCompania': x.IdCompania,
	// 			'IdDistribuidor': x.IdDistribuidor
	// 		};
	// 		var objact = {
	// 			'ClvFacturaMaestro': x.Clv_FacturaMaestro,
	// 			'Credito': metodo,
	// 			'NoPago': 0,
	// 			'PagoInicial': 0
	// 		};
	// 		pagosMaestrosFactory.actFactura(objact).then(function(dataGraba) {
	// 			pagosMaestrosFactory.pagoGrabaFactura(objPagar).then(function (data) {
	// 				vm.res = data.GetGuardaPagoFacturaMaestroResult;
	// 				if (vm.res[0].Clv_Pago < 1) {
	// 					ngNotify.set('No se grabo la factura', 'error');
	// 				}else {
	// 					$uibModalInstance.dismiss('cancel');
	// 					ngNotify.set('Pago grabado correctamente', 'success');
	// 					$rootScope.$emit('realoadBrowse', {});
	// 				}
	// 			});
	// 		});
	// 	}
	// }

	function ok() {
		var obj = {
			'ContratoMaestro': x.ContratoMaestro,
			'Credito': metodo,
			'Cajera': $localStorage.currentUser.usuario,
			'IpMaquina': $localStorage.currentUser.maquina,
			'Sucursal': $localStorage.currentUser.sucursal,
			'IdCompania': x.IdCompania,
			'IdDistribuidor': x.IdDistribuidor,
			'ClvSessionPadre': x.Clv_SessionPadre,
			'Tipo': 0,
			'ToKen2': $localStorage.currentUser.token,
			'NoPagos': 0,
			'PagoInicial': 0
		};
		if (vm.casePago == undefined || vm.selectedMedio.IdMedioPago == 0) {
			ngNotify.set('Por favor seleccione el medio de pago y llene un metodo de pago.', 'error');
		} else {
			var objact = {
				'ClvFacturaMaestro': x.Clv_FacturaMaestro,
				'Credito': metodo,
				'NoPago': 0,
				'PagoInicial': 0
			};
			switch (vm.casePago) {
				case 1:
					if (x.tipo == 'pagos') {
						pagosMaestrosFactory.generaFactura(obj).then(function (data) {
							vm.r1 = data.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
							x.Clv_FacturaMaestro = vm.r1;
							objact.ClvFacturaMaestro = x.Clv_FacturaMaestro;
							if (vm.efectivo >= vm.monto) {
								var objPagar = {
									'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
									'ContratoMaestro': x.ContratoMaestro,
									'Cajera': $localStorage.currentUser.usuario,
									'IpMaquina': $localStorage.currentUser.maquina,
									'Sucursal': $localStorage.currentUser.sucursal,
									'Monto': vm.monto,
									'GLOEFECTIVO2': vm.efectivo,
									'GLOCHEQUE2': 0,
									'GLOCLV_BANCOCHEQUE2': 0,
									'NUMEROCHEQUE2': '',
									'GLOTARJETA2': 0,
									'GLOCLV_BANCOTARJETA2': 0,
									'NUMEROTARJETA2': '',
									'TARJETAAUTORIZACION2': '',
									'CLV_Nota3': 0,
									'GLONOTA3': 0,
									'IdMedioPago': vm.selectedMedio.IdMedioPago,
									'IdCompania': x.IdCompania,
									'IdDistribuidor': x.IdDistribuidor
								};
								pagosMaestrosFactory.actFactura(objact).then(function (dataAct) {
									pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
										vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;
										pagosMaestrosFactory.nuePagoEfectivoMaestro(vm.pago, vm.efectivo, vm.cambio).then(function (dataNuevo) {
										});
										if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
											ngNotify.set('Pago grabado correctamente', 'error');
										} else {
											$uibModalInstance.dismiss('cancel');
											ngNotify.set('Pago grabado correctamente', 'success');
											$state.reload();
										}
									});
								});
							} else {
								ngNotify.set('No se ha saldado la factura.', 'error');
							}
						});
					} else {
						if (vm.efectivo >= vm.monto) {
							var objPagar = {
								'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
								'ContratoMaestro': x.ContratoMaestro,
								'Cajera': $localStorage.currentUser.usuario,
								'IpMaquina': $localStorage.currentUser.maquina,
								'Sucursal': $localStorage.currentUser.sucursal,
								'Monto': vm.monto,
								'GLOEFECTIVO2': vm.efectivo,
								'GLOCHEQUE2': 0,
								'GLOCLV_BANCOCHEQUE2': 0,
								'NUMEROCHEQUE2': '',
								'GLOTARJETA2': 0,
								'GLOCLV_BANCOTARJETA2': 0,
								'NUMEROTARJETA2': '',
								'TARJETAAUTORIZACION2': '',
								'CLV_Nota3': 0,
								'GLONOTA3': 0,
								'IdMedioPago': vm.selectedMedio.IdMedioPago,
								'IdCompania': x.IdCompania,
								'IdDistribuidor': x.IdDistribuidor
							};
							pagosMaestrosFactory.actFactura(objact).then(function (dataAct) {
								pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
									vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;
									pagosMaestrosFactory.nuePagoEfectivoMaestro(vm.pago, vm.efectivo, vm.cambio).then(function (dataNuevo) {
									});
									if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
										ngNotify.set('Pago grabado correctamente', 'error');
									} else {
										$uibModalInstance.dismiss('cancel');
										ngNotify.set('Pago grabado correctamente', 'success');
										$rootScope.$emit('realoadBrowse', {});
									}
								});
							});
						} else {
							ngNotify.set('No se ha saldado la factura.', 'error');
						}
					}
					break;
				case 2:
					if (x.tipo == 'pagos') {
						pagosMaestrosFactory.generaFactura(obj).then(function (data) {
							vm.r1 = data.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
							x.Clv_FacturaMaestro = vm.r1;
							objact.ClvFacturaMaestro = x.Clv_FacturaMaestro;

							if (vm.selectedBancoCheque.Clave == 0) {
								ngNotify.set('Selecciona un banco.', 'error');
							} else if (vm.numeroCheque == "" || vm.numeroCheque == undefined) {
								ngNotify.set('Digita el número del cheque.', 'error');
							} else {
								if (vm.dineroCheque == vm.monto) {
									var objPagar = {
										'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
										'ContratoMaestro': x.ContratoMaestro,
										'Cajera': $localStorage.currentUser.usuario,
										'IpMaquina': $localStorage.currentUser.maquina,
										'Sucursal': $localStorage.currentUser.sucursal,
										'Monto': vm.monto,
										'GLOEFECTIVO2': 0,
										'GLOCHEQUE2': vm.dineroCheque,
										'GLOCLV_BANCOCHEQUE2': vm.selectedBancoCheque.Clave,
										'NUMEROCHEQUE2': vm.numeroCheque,
										'GLOTARJETA2': 0,
										'GLOCLV_BANCOTARJETA2': 0,
										'NUMEROTARJETA2': '',
										'TARJETAAUTORIZACION2': '',
										'CLV_Nota3': 0,
										'GLONOTA3': 0,
										'IdMedioPago': vm.selectedMedio.IdMedioPago,
										'IdCompania': x.IdCompania,
										'IdDistribuidor': x.IdDistribuidor
									};
									pagosMaestrosFactory.actFactura(objact).then(function (dataAct) {
										pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
											if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
												ngNotify.set('Pago grabado correctamente', 'error');
											} else {
												$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$state.reload();
											}
										});
									});
								} else {
									ngNotify.set('No se ha saldado la factura', 'error');
								}
							}
						});
					} else {
						if (vm.selectedBancoCheque.Clave == 0) {
							ngNotify.set('Selecciona un banco.', 'error');
						} else if (vm.numeroCheque == "" || vm.numeroCheque == undefined) {
							ngNotify.set('Digita el número del cheque.', 'error');
						} else {
							if (vm.dineroCheque == vm.monto) {
								var objPagar = {
									'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
									'ContratoMaestro': x.ContratoMaestro,
									'Cajera': $localStorage.currentUser.usuario,
									'IpMaquina': $localStorage.currentUser.maquina,
									'Sucursal': $localStorage.currentUser.sucursal,
									'Monto': vm.monto,
									'GLOEFECTIVO2': 0,
									'GLOCHEQUE2': vm.dineroCheque,
									'GLOCLV_BANCOCHEQUE2': vm.selectedBancoCheque.Clave,
									'NUMEROCHEQUE2': vm.numeroCheque,
									'GLOTARJETA2': 0,
									'GLOCLV_BANCOTARJETA2': 0,
									'NUMEROTARJETA2': '',
									'TARJETAAUTORIZACION2': '',
									'CLV_Nota3': 0,
									'GLONOTA3': 0,
									'IdMedioPago': vm.selectedMedio.IdMedioPago,
									'IdCompania': x.IdCompania,
									'IdDistribuidor': x.IdDistribuidor
								};
								pagosMaestrosFactory.actFactura(objact).then(function (dataAct) {
									pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
										if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
											ngNotify.set('Pago grabado correctamente', 'error');
										} else {
											$uibModalInstance.dismiss('cancel');
											ngNotify.set('Pago grabado correctamente', 'success');
											$rootScope.$emit('realoadBrowse', {});
										}
									});
								});
							} else {
								ngNotify.set('No se ha saldado la factura', 'error');
							}
						}
					}
					break;
				case 3:
					if (x.tipo == 'pagos') {
						pagosMaestrosFactory.generaFactura(obj).then(function (data) {
							vm.r1 = data.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
							x.Clv_FacturaMaestro = vm.r1;
							objact.ClvFacturaMaestro = x.Clv_FacturaMaestro;

							if (vm.selectedBancoTransferencia.Clave == 0) {
								ngNotify.set('Selecciona un banco', 'error');
							} else if (vm.cuentaTransferencia == "" || vm.cuentaTransferencia == undefined) {
								ngNotify.set('Digita el número de cuenta por favor.', 'error');
							} else if (vm.autorizacionTransferencia == "" || vm.autorizacionTransferencia == undefined) {
								ngNotify.set('Digita el número de autorizacion.', 'error');
							} else {
								if (vm.dineroTransferencia == vm.monto) {
									var objPagar = {
										'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
										'ContratoMaestro': x.ContratoMaestro,
										'Cajera': $localStorage.currentUser.usuario,
										'IpMaquina': $localStorage.currentUser.maquina,
										'Sucursal': $localStorage.currentUser.sucursal,
										'Monto': vm.monto,
										'GLOEFECTIVO2': 0,
										'GLOCHEQUE2': 0,
										'GLOCLV_BANCOCHEQUE2': 0,
										'NUMEROCHEQUE2': '',
										'GLOTARJETA2': vm.dineroTransferencia,
										'GLOCLV_BANCOTARJETA2': vm.selectedBancoTransferencia.Clave,
										'NUMEROTARJETA2': vm.cuentaTransferencia,
										'TARJETAAUTORIZACION2': vm.autorizacionTransferencia,
										'CLV_Nota3': 0,
										'GLONOTA3': 0,
										'IdMedioPago': vm.selectedMedio.IdMedioPago,
										'IdCompania': x.IdCompania,
										'IdDistribuidor': x.IdDistribuidor
									};
									pagosMaestrosFactory.actFactura(objact).then(function (dataAct) {
										pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
											if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
												ngNotify.set('Pago grabado correctamente', 'error');
											} else {
												$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$state.reload();
											}
										});
									});
								} else {
									ngNotify.set('No se ha saldado la factura', 'error');
								}
							}
						});
					} else {
						if (vm.selectedBancoTransferencia.Clave == 0) {
							ngNotify.set('Selecciona un banco', 'error');
						} else if (vm.cuentaTransferencia == "" || vm.cuentaTransferencia == undefined) {
							ngNotify.set('Digita el número de cuenta por favor.', 'error');
						} else if (vm.autorizacionTransferencia == "" || vm.autorizacionTransferencia == undefined) {
							ngNotify.set('Digita el número de autorizacion.', 'error');
						} else {
							if (vm.dineroTransferencia == vm.monto) {
								var objPagar = {
									'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
									'ContratoMaestro': x.ContratoMaestro,
									'Cajera': $localStorage.currentUser.usuario,
									'IpMaquina': $localStorage.currentUser.maquina,
									'Sucursal': $localStorage.currentUser.sucursal,
									'Monto': vm.monto,
									'GLOEFECTIVO2': 0,
									'GLOCHEQUE2': 0,
									'GLOCLV_BANCOCHEQUE2': 0,
									'NUMEROCHEQUE2': '',
									'GLOTARJETA2': vm.dineroTransferencia,
									'GLOCLV_BANCOTARJETA2': vm.selectedBancoTransferencia.Clave,
									'NUMEROTARJETA2': vm.cuentaTransferencia,
									'TARJETAAUTORIZACION2': vm.autorizacionTransferencia,
									'CLV_Nota3': 0,
									'GLONOTA3': 0,
									'IdMedioPago': vm.selectedMedio.IdMedioPago,
									'IdCompania': x.IdCompania,
									'IdDistribuidor': x.IdDistribuidor
								};
								pagosMaestrosFactory.actFactura(objact).then(function (dataAct) {
									pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
										if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
											ngNotify.set('Pago grabado correctamente', 'error');
										} else {
											$uibModalInstance.dismiss('cancel');
											ngNotify.set('Pago grabado correctamente', 'success');
											$rootScope.$emit('realoadBrowse', {});
										}
									});
								});
							} else {
								ngNotify.set('No se ha saldado la factura', 'error');
							}
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
	vm.ok = ok;
	initialData();
}