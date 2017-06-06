'use strict';
angular.module('softvApp')
	.controller('TicketsCtrl', function ($uibModal, $rootScope, ngNotify, ticketsFactory, $filter) {
		function initialData() {
			ticketsFactory.getPlazas().then(function (data) {
				data.GetMuestra_Compania_RelUsuarioListResult.unshift({
					'razon_social': '----------------',
					'id_compania': 0
				});
				vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
				vm.selectedPlaza = vm.plazas[1];

				ticketsFactory.getTipoFactura().then(function (data) {
					data.GetMUESTRATIPOFACTURAListResult.unshift({
						'CONCEPTO': '----------------',
						'CLAVE': "0"
					});
					vm.tipos = data.GetMUESTRATIPOFACTURAListResult;
					vm.selectedTipo = vm.tipos[1];


					ticketsFactory.getSucursales().then(function (data) {
						vm.sucursales = data.GetObtieneSucursalesEspeciales_ReimpresionListResult;
						vm.selectedSucursal = vm.sucursales[1];


						ticketsFactory.getFacturas().then(function (data) {
							data.GetMUESTRATIPOFACTURA_ReimpresionListResult.unshift({
								'CONCEPTO': '----------------',
								'CLAVE': "0"
							});
							vm.facturas = data.GetMUESTRATIPOFACTURA_ReimpresionListResult;
							vm.selectedFactura = vm.facturas[1];
							buscarSucursal(1);

						});
					});


				});

			});





		}

		$rootScope.$on('actualiza_tickets', function () {
			buscarSucursal(vm.buscaID);
		});

		$rootScope.$on('actualiza_tickets_especial', function () {
			buscarEspecial();
		});

		function buscarSucursal(x) {
			vm.buscaID = x;
			if (vm.folio == '' || vm.folio == undefined) {
				vm.folio = 0;
			}
			if (vm.serie == undefined) {
				vm.serie = '';
			}
			var plaza = (vm.selectedPlaza == null) ? 0 : vm.selectedPlaza.id_compania;

			if (x == 1) {
				if (vm.folio == 0 && vm.serie == '') {
					var busqueda = {
						op: 0,
						serie: '',
						folio: 0,
						fecha: '',
						contrato: '',
						tipo: vm.selectedTipo.CLAVE,
						compania: vm.selectedPlaza.id_compania,
						nombre: ''
					};
					ticketsFactory.buscarTickets(busqueda).then(function (data) {
						vm.ticketsSucuarsales = data.GetBUSCAFACTURASListResult;
					});
				} else {
					var busqueda = {
						op: 1,
						serie: vm.serie,
						folio: vm.folio,
						fecha: '',
						contrato: '',
						tipo: vm.selectedTipo.CLAVE,
						compania: vm.selectedPlaza.id_compania,
						nombre: ''
					};
					ticketsFactory.buscarTickets(busqueda).then(function (data) {
						vm.ticketsSucuarsales = data.GetBUSCAFACTURASListResult;
					});
				}
			} else if (x == 2) {
				if (vm.fecha != '') {
					var fechaAux = $filter('date')(vm.fecha, 'dd/MM/yyyy');
					var busqueda = {
						op: 2,
						serie: '',
						folio: 0,
						fecha: fechaAux,
						contrato: '',
						tipo: vm.selectedTipo.CLAVE,
						compania: vm.selectedPlaza.id_compania,
						nombre: ''
					};
					ticketsFactory.buscarTickets(busqueda).then(function (data) {
						vm.ticketsSucuarsales = data.GetBUSCAFACTURASListResult;
					});
				}
			} else if (x == 3) {
				if (vm.contrato != '') {
					var busqueda = {
						op: 3,
						serie: '',
						folio: 0,
						fecha: '',
						contrato: vm.contrato,
						tipo: vm.selectedTipo.CLAVE,
						compania: vm.selectedPlaza.id_compania,
						nombre: ''
					};
					ticketsFactory.buscarTickets(busqueda).then(function (data) {
						vm.ticketsSucuarsales = data.GetBUSCAFACTURASListResult;
					});
				}
			} else if (x == 4) {
				if (vm.nombre != '') {
					var busqueda = {
						op: 4,
						serie: '',
						folio: 0,
						fecha: '',
						contrato: '',
						tipo: vm.selectedTipo.CLAVE,
						compania: vm.selectedPlaza.id_compania,
						nombre: vm.nombre
					};
					ticketsFactory.buscarTickets(busqueda).then(function (data) {
						vm.ticketsSucuarsales = data.GetBUSCAFACTURASListResult;
					});
				}
			}
			vm.showSucursales = true;
			vm.showEspeciales = false;
		}


		function buscarEspecial() {
			if (vm.selectedFactura.CLAVE == 0) {
				ngNotify.set('Selecciona un tipo de ticket', 'error');
			} else {
				if (vm.tipoBusE == undefined || vm.tipoBusE == 6) {
					var buscar = {
						op: 1,
						serie: '',
						folio: 0,
						fecha: '',
						tipo: vm.selectedFactura.CLAVE,
						contrato: '',
						sucursal: vm.selectedSucursal.CLV_SUCURSAL
					};
					ticketsFactory.buscarEspeciales(buscar).then(function (data) {
						vm.ticketsEspeciales = data.GetBuscaFacturasEspecialesListResult;
					});
				} else if (vm.tipoBusE == 1) {
					var buscar = {
						op: 2,
						serie: vm.serieE,
						folio: 0,
						fecha: '',
						tipo: vm.selectedFactura.CLAVE,
						contrato: '',
						sucursal: vm.selectedSucursal.CLV_SUCURSAL
					};
					ticketsFactory.buscarEspeciales(buscar).then(function (data) {
						vm.ticketsEspeciales = data.GetBuscaFacturasEspecialesListResult;
					});
				} else if (vm.tipoBusE == 2) {
					var buscar = {
						op: 2,
						serie: '',
						folio: vm.folioE,
						fecha: '',
						tipo: vm.selectedFactura.CLAVE,
						contrato: '',
						sucursal: vm.selectedSucursal.CLV_SUCURSAL
					};
					ticketsFactory.buscarEspeciales(buscar).then(function (data) {
						vm.ticketsEspeciales = data.GetBuscaFacturasEspecialesListResult;
					});
				} else if (vm.tipoBusE == 3) {
					if (vm.fechaE == null) {
						var buscar = {
							op: 1,
							serie: '',
							folio: 0,
							fecha: '',
							tipo: vm.selectedFactura.CLAVE,
							contrato: '',
							sucursal: vm.selectedSucursal.CLV_SUCURSAL
						};
						ticketsFactory.buscarEspeciales(buscar).then(function (data) {
							vm.ticketsEspeciales = data.GetBuscaFacturasEspecialesListResult;
						});
					} else {
						var fechaAux = $filter('date')(vm.fechaE, 'dd/MM/yyyy');
						var buscar = {
							op: 3,
							serie: '',
							folio: 0,
							fecha: fechaAux,
							tipo: vm.selectedFactura.CLAVE,
							contrato: '',
							sucursal: vm.selectedSucursal.CLV_SUCURSAL
						};
						ticketsFactory.buscarEspeciales(buscar).then(function (data) {
							vm.ticketsEspeciales = data.GetBuscaFacturasEspecialesListResult;
						});
					}
				} else if (vm.tipoBusE == 4) {
					var buscar = {
						op: 4,
						serie: '',
						folio: 0,
						fecha: '',
						tipo: vm.selectedFactura.CLAVE,
						contrato: vm.contratoE,
						sucursal: vm.selectedSucursal.CLV_SUCURSAL
					};
					ticketsFactory.buscarEspeciales(buscar).then(function (data) {
						vm.ticketsEspeciales = data.GetBuscaFacturasEspecialesListResult;
					});
				}
				vm.showSucursales = false;
				vm.showEspeciales = true;
			}
		}

		function reimprimirTicket(x, tipo) {
			x.tipo = tipo;
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalReimprimir.html',
				controller: 'ReimprimirCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					item: function () {
						return x;
					}
				}
			});
		}

		function cancelarTicket(x, tipo) {
			x.tipo = tipo;
			if (tipo == 'N') {
				vm.factura = x.clv_Factura;
			} else {
				vm.factura = x.Clv_Factura;
			}
			ticketsFactory.validaCancela(vm.factura).then(function (data) {
				if (data.GetValidaCancelacionFacturaListResult[0].Res == 1) {
					ngNotify.set(data.GetValidaCancelacionFacturaListResult[0].Msg, 'error');
				} else {
					var modalInstance = $uibModal.open({
						animation: true,
						ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						templateUrl: 'views/facturacion/modalCancelarTicket.html',
						controller: 'cancelarTicketCtrl',
						controllerAs: '$ctrl',
						backdrop: 'static',
						keyboard: false,
						size: 'md',
						resolve: {
							item: function () {
								return x;
							}
						}
					});
				}
			});

		}



		function cambioEspecial(id) {
			vm.tipoBusE = id;
			if (id == 1) {
				if (vm.serieE == '') {
					vm.tipoBusE = 6;
				}
				vm.folioE = 0;
				vm.fechaE = '';
				vm.contratoE = '';
			} else if (id == 2) {
				if (vm.folioE == '') {
					vm.tipoBusE = 6;
				}
				vm.serieE = '';
				vm.fechaE = '';
				vm.contratoE = '';
			} else if (id == 3) {
				if (vm.fechaE == '') {
					vm.tipoBusE = 6;
				}
				vm.folioE = 0;
				vm.serieE = '';
				vm.contratoE = '';
			} else if (id == 4) {
				if (vm.contratoE == '') {
					vm.tipoBusE = 6;
				}
				vm.folioE = 0;
				vm.fechaE = '';
				vm.serieE = '';
			}
		}

		function enviarCorreo(x) {
			var obj = {
				factura: x.clv_Factura,
				reimprimir: 0,
				cancelar: 0,
				correo: 1
			};
			ticketsFactory.getOptionsTickets(obj).then(function (opt) {
				ngNotify.set('Ticket enviado exitosamente.','success');
			});
		}

		var vm = this;
		initialData();
		vm.buscarSucursal = buscarSucursal;
		vm.buscarEspecial = buscarEspecial;
		vm.reimprimirTicket = reimprimirTicket;
		vm.cancelarTicket = cancelarTicket;
		vm.cambioEspecial = cambioEspecial;
		vm.enviarCorreo = enviarCorreo;
		vm.fecha = '';
		vm.contrato = '';
		vm.nombre = '';
	});
