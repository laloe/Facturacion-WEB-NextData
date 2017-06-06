'use strict';
angular
	.module('softvApp')
	.controller('ModalRegresarCtrl', function ($uibModalInstance, cajasFactory, items, $rootScope, ngNotify, $uibModal) {

		function initialData() {
			cajasFactory.dameAparatosAdeudo(items.Contrato, items.Session, items.CLV_DETALLE).then(function (data) {
				vm.aparatos = data.GetMuestraAparatosCobroAdeudoListResult;
				vm.aparatos.forEach(function (element) {
					element.checado = false;
					element.checado2 = false;
				});
			});
		}

		// function addRecibir(item, status) {
		// 	console.log(item);
		// 	if (status == true) {
		// 		vm.recibi.push(item);
		// 	} else {
		// 		vm.recibi.forEach(function (element, index, array) {
		// 			if (element.Id == item.Id) {
		// 				vm.recibi.splice(index, 1);
		// 			}
		// 		});
		// 	}
		// }

		function addCancelar(item, status) {
			if (item.Detalle.toLowerCase().includes('router') || item.Detalle.toLowerCase().includes('ups')) {
				var aparato = '';
				if (item.Detalle.toLowerCase().includes('router')) {
					aparato = 'ROUTER';
				} else {
					aparato = 'UPS';
				}
				cajasFactory.getContratoAdeudo(item.ContratoNet, aparato).then(function (data) {
					vm.auxConNet = data.GetConsultaContratoNetCAdeudoResult.ContratoNet;
					if (status == true) {
						vm.aparatos.forEach(function (element, index, array) {
							if (element.ContratoNet == vm.auxConNet) {
								element.checado = true;
							} else {
								if (element.Detalle.toLowerCase().includes('router') || element.Detalle.toLowerCase().includes('ups')) {
									var aparato = '';
									if (element.Detalle.toLowerCase().includes('router')) {
										aparato = 'ROUTER';
									} else {
										aparato = 'UPS';
									}
									cajasFactory.getContratoAdeudo(element.ContratoNet, aparato).then(function (data) {
										if (data.GetConsultaContratoNetCAdeudoResult.ContratoNet == vm.auxConNet) {
											element.checado = true;
										}
									});
								}
							}
						});
					} else {
						vm.aparatos.forEach(function (element, index, array) {
							if (element.ContratoNet == vm.auxConNet) {
								element.checado = false;
							} else {
								if (element.Detalle.toLowerCase().includes('router') || element.Detalle.toLowerCase().includes('ups')) {
									var aparato = '';
									if (element.Detalle.toLowerCase().includes('router')) {
										aparato = 'ROUTER';
									} else {
										aparato = 'UPS';
									}
									cajasFactory.getContratoAdeudo(element.ContratoNet, aparato).then(function (data) {
										if (data.GetConsultaContratoNetCAdeudoResult.ContratoNet == vm.auxConNet) {
											element.checado = false;
										}
									});
								}
							}
						});
					}
				});
			} else {
				if (status == true) {
					vm.aparatos.forEach(function (element, index, array) {
						if (element.ContratoNet == item.ContratoNet) {
							element.checado = true;
							//vm.seleccion.push(element);
						} else {
							if (element.Detalle.toLowerCase().includes('router') || element.Detalle.toLowerCase().includes('ups')) {
								var aparato = '';
								if (element.Detalle.toLowerCase().includes('router')) {
									aparato = 'ROUTER';
								} else {
									aparato = 'UPS';
								}
								cajasFactory.getContratoAdeudo(element.ContratoNet, aparato).then(function (data) {
									if (data.GetConsultaContratoNetCAdeudoResult.ContratoNet == item.ContratoNet) {
										element.checado = true;
									}
								});
							}
						}
					});
				} else {
					vm.aparatos.forEach(function (element, index, array) {
						if (element.ContratoNet == item.ContratoNet) {
							element.checado = false;
						} else {
							if (element.Detalle.toLowerCase().includes('router') || element.Detalle.toLowerCase().includes('ups')) {
								var aparato = '';
								if (element.Detalle.toLowerCase().includes('router')) {
									aparato = 'ROUTER';
								} else {
									aparato = 'UPS';
								}
								cajasFactory.getContratoAdeudo(element.ContratoNet, aparato).then(function (data) {
									if (data.GetConsultaContratoNetCAdeudoResult.ContratoNet == item.ContratoNet) {
										element.checado = false;
									}
								});
							}
						}
					});
				}
			}
		}


		function ok() {
			var arrAux = [];
			vm.aparatos.forEach(function (element, index, array) {
				if (element.checado) {
					arrAux.push(element);
				}
			});
			vm.seleccion = vm.aparatos;

			var lstDevolucionApa = [];
			var aparatosd = 0;
			var aparatosi = 0;
			var recibidosd = 0;
			var recibidosi = 0;
			if (arrAux.length == 0) {
				ngNotify.set('Debe seleccionar al menos un aparato para aplicar el cobro de adeudo.', 'error');
			} else {

				vm.aparatos.forEach(function (item) {
					var aparato = {};
					aparato.Id = item.Id;
					if(item.checado2){
						aparato.Recibi = 1;
					}else{
						aparato.Recibi = 0;
					}
					if(item.checado){
						aparato.Seleccion = 1;
					}else{
						aparato.Seleccion = 0;
					}
					
					aparato.TipoServicio = item.TipoServicio;
					aparato.aparato = item.Detalle;
					aparato.Tipo = item.Tipo;
					aparato.Clv_Session = items.Session;
					aparato.Clv_Detalle = items.CLV_DETALLE;
					lstDevolucionApa.push(aparato);
				});

				// for (var i = 0; i < vm.aparatos.length; i++) {
				// 	var aparato = {};
				// 	aparato.Id = vm.recibi[i].Id;
				// 	aparato.Recibi = 1;
				// 	aparato.TipoServicio = vm.recibi[i].TipoServicio;
				// 	aparato.aparato = vm.recibi[i].Detalle;
				// 	aparato.Tipo = vm.recibi[i].Tipo;
				// 	aparato.Clv_Session = items.Session;
				// 	aparato.Clv_Detalle = items.CLV_DETALLE;
				// 	aparato.Seleccion = 0;
				// 	lstDevolucionApa.push(aparato);
				// }
				// var objLen = lstDevolucionApa.length;
				// for (var x = 0; x < vm.seleccion.length; x++) {
				// 	var cont = 0;
				// 	for (var j = 0; j < objLen; j++) {
				// 		if (lstDevolucionApa[j].Id == vm.seleccion[x].Id) {
				// 			lstDevolucionApa[j].Seleccion = 1;
				// 		} else {
				// 			cont = cont + 1;
				// 			lstDevolucionApa[j].Seleccion = 0;
				// 		}
				// 	}

				// 	if (cont == objLen) {
				// 		var aparato = {};
				// 		aparato.Id = vm.seleccion[x].Id;
				// 		aparato.Recibi = 0;
				// 		aparato.TipoServicio = vm.seleccion[x].TipoServicio;
				// 		aparato.aparato = vm.seleccion[x].Detalle;
				// 		aparato.Tipo = vm.seleccion[x].Tipo;
				// 		aparato.Clv_Session = items.Session;
				// 		aparato.Clv_Detalle = items.CLV_DETALLE;
				// 		aparato.Seleccion = 1;
				// 		lstDevolucionApa.push(aparato);
				// 	}
				// }


				lstDevolucionApa.forEach(function (element, index, array) {
					if (element.Tipo == 'Aparato') {
						if (element.TipoServicio == 2) {
							aparatosi = aparatosi + 1;
							if (element.Seleccion == 1) {
								recibidosi = recibidosi + 1;
							}
						} else if (element.TipoServicio == 3) {
							aparatosd = aparatosd + 1
							if (element.Seleccion == 1) {
								recibidosd = recibidosd + 1;
							}
						}
					}
				});

				if (aparatosi != recibidosi) {
					cajasFactory.quitarAntena(items.Session, 2).then(function (data) { });
				} else if (aparatosd != recibidosd) {
					cajasFactory.quitarAntena(items.Session, 3).then(function (data) { });
				}

				cajasFactory.cobrarAdeudo(lstDevolucionApa).then(function (data) {
					$uibModalInstance.dismiss('cancel');
					var modalInstance = $uibModal.open({
						animation: true,
						ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						templateUrl: 'views/facturacion/modalMotivoCancelacion.html',
						controller: 'ModalMotivoCancelacionCtrl',
						controllerAs: 'ctrl',
						backdrop: 'static',
						keyboard: false,
						size: 'sm',
						resolve: {
							items: function () {
								return items;
							}
						}
					});
				});

			}

		}

		function cancel() {
			cajasFactory.borrarAdeudo(items.Session).then(function (data) {
				$uibModalInstance.dismiss('cancel');
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.addCancelar = addCancelar;
		vm.aparatos = '';
		vm.ok = ok;
		initialData();
	});
