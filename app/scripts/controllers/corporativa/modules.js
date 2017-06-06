'use strict';
angular.module('softvApp').config(corporativaConf);

function corporativaConf($stateProvider) {
	var states = [{
		name: 'home.corporativa',
		abstract: true,
		template: '<div ui-view></div>'
	},
	{
		name: 'home.corporativa.maestro',
		data: {
			pageTitle: 'SAC | CONTRATO MAESTRO',
			permissions: {
				only: ['contratomaestroSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/contratoMaestro',
		templateUrl: 'views/corporativa/contratoMaestro.html',
		controller: 'ContratoMaestroCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.maestroNuevo',
		data: {
			pageTitle: 'SAC | NUEVO CONTRATO MAESTRO',
			permissions: {
				only: ['contratomaestroAdd'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/nuevo/contrato',
		templateUrl: 'views/corporativa/nuevoContratoMaestro.html',
		controller: 'NuevoMaestroCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.maestroEditar',
		data: {
			pageTitle: 'SAC | EDITAR CONTRATO MAESTRO',
			permissions: {
				only: ['contratomaestroUpdate'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/editar/contrato/:id',
		templateUrl: 'views/corporativa/editarContratoMaestro.html',
		controller: 'EditarMaestroCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.recepcionpago',
		data: {
			pageTitle: 'SAC | RECEPCIÓN DE PAGOS',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/recepcionpago',
		templateUrl: 'views/corporativa/Recepcionpago.html',
		controller: 'RecepcionPagoCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.pago',
		data: {
			pageTitle: 'SOFTV | PAGO CONTRATO MAESTRO',
			permissions: {
				only: ['contratomaestroUpdate'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/pagoContratoMaestro',
		templateUrl: 'views/corporativa/pagoContratoMaestro.html',
		controller: 'PagoContratoMaestroCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reporteRecepcion',
		data: {
			pageTitle: 'SOFTV | REPORTES CONTRATO MAESTRO',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reporteRecepcion',
		templateUrl: 'views/corporativa/reporteRecepcion.html',
		controller: 'ReporteRecepcionCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportesCortes',
		data: {
			pageTitle: 'SAC | REPORTES',
			permissions: {
				only: ['contratomaestroSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportesCortesCorporativa',
		templateUrl: 'views/corporativa/reportesCortesCorporativa.html',
		controller: 'reportesCortesCorporativaCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.tickets',
		data: {
			pageTitle: 'SAC | FACTURAS',
			permissions: {
				only: ['ticketsSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/tickets',
		templateUrl: 'views/corporativa/tickets.html',
		controller: 'ticketsCorporativaCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.notas',
		data: {
			pageTitle: 'SAC | NOTA DE CREDITO',
			permissions: {
				only: ['notasdecreditoSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/notacredito',
		templateUrl: 'views/corporativa/notaCredito.html',
		controller: 'notaCreditoCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.nuevanota',
		data: {
			pageTitle: 'SAC |NUEVA NOTA DE CREDITO',
			permissions: {
				only: ['notasdecreditoAdd'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/nuevanota',
		templateUrl: 'views/corporativa/nuevaNotaCredito.html',
		controller: 'nuevaNotaCreditoCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportesPendientes',
		data: {
			pageTitle: 'SOFTV | REPORTES PAGOS PENDIENTES',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportePendientes',
		templateUrl: 'views/corporativa/reportesPendientes.html',
		controller: 'ReportesPendientesCtrl',
		controllerAs: '$ctrl'
	}


	];
	states.forEach(function (state) {
		$stateProvider.state(state);
	});
}
