'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.facturacion',
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'home.facturacion.cajas',
				data: {
					pageTitle: 'SAC | CAJAS',
					permissions: {
						only: ['cajasSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/cajas',
				templateUrl: 'views/facturacion/facturacionCajas.html',
				controller: 'FacturacionCajasCtrl',
				controllerAs: 'ctrl'
			},
			{
				name: 'home.facturacion.ventas',
				data: {
					pageTitle: 'SAC | VENTAS',
					permissions: {
						only: ['ventasSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/ventas',
				templateUrl: 'views/facturacion/facturacionVentas.html',
				controller: 'FacturacionVentasCtrl',
				controllerAs: 'ctrl'
			},
			{
				name: 'home.facturacion.desglose',
				data: {
					pageTitle: 'SAC | DESGLOSE',
					permissions: {
						only: ['desglosedemonedaSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/desglose',
				templateUrl: 'views/facturacion/DesgloseMoneda.html',
				controller: 'DesgloseMonedaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.desgloseNuevo',
				data: {
					pageTitle: 'SAC | NUEVO DESGLOSE DE MONEDA',
					permissions: {
						only: ['desglosedemonedaUpdate'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/desglose/nuevo',
				templateUrl: 'views/facturacion/nuevoDesgloseMoneda.html',
				controller: 'NuevoDesgloseCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.desgloseDetalle',
				data: {
					pageTitle: 'SAC | DETALLE DESGLOSE DE MONEDA',
					permissions: {
						only: ['desglosedemonedaSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/desglose/detalle/:id',
				templateUrl: 'views/facturacion/detalleDesglose.html',
				controller: 'DetalleDesgloseCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.desgloseEditar',
				data: {
					pageTitle: 'SAC | EDITAR DESGLOSE DE MONEDA',
					permissions: {
						only: ['editarPermission'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/desglose/editar/:id',
				templateUrl: 'views/facturacion/editarDesglose.html',
				controller: 'EditarDesgloseCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.entregas',
				data: {
					pageTitle: 'SAC | ENTREGAS',
					permissions: {
						only: ['entregasparcialesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/entregas',
				templateUrl: 'views/facturacion/EntregasParciales.html',
				controller: 'EntregasParcialesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.nuevaEntrega',
				data: {
					pageTitle: 'SAC | NUEVA ENTREGA',
					permissions: {
						only: ['entregasparcialesUpdate'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/entrega/nueva',
				templateUrl: 'views/facturacion/nuevaEntrega.html',
				controller: 'NuevaEntregaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.detalleEntrega',
				data: {
					pageTitle: 'SAC | DETALLE DE ENTREGA',
					permissions: {
						only: ['entregasparcialesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/entrega/detalle/:id',
				templateUrl: 'views/facturacion/detalleEntrega.html',
				controller: 'DetalleEntregaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.editarEntrega',
				data: {
					pageTitle: 'SAC | EDITAR ENTREGA',
					permissions: {
						only: ['entregasparcialesUpdate'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/entrega/editar/:id',
				templateUrl: 'views/facturacion/editarEntrega.html',
				controller: 'EditarEntregaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.arqueo',
				data: {
					pageTitle: 'SAC | ARQUEOS',
					permissions: {
						only: ['arqueodecajasSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/arqueos',
				templateUrl: 'views/facturacion/ArqueoCajas.html',
				controller: 'ArqueoCajasCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.tickets',
				data: {
					pageTitle: 'SAC | CANCELACIÓN Y REIMPRECIÓN DE TICKETS',
					permissions: {
						only: ['ticketsSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/tickets',
				templateUrl: 'views/facturacion/tickets.html',
				controller: 'TicketsCtrl',
				controllerAs: '$ctrl'
			}

		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
