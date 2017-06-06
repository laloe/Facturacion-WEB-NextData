'use strict';
angular
	.module('softvApp')
	.controller('ReporteCortesCtrl', function($state, $rootScope, reportesFactory, $filter, globalService, ngNotify) {
		function initialData() {
			reportesFactory.getOpcionsMenu().then(function(data) {
				data.GetOpcionesCortesFacturasListResult.unshift({
					'Nombre': '----------------',
					'Clv_Vendedor': 999
				});
				getDatosDistribuidores();
				vm.selectMenu = data.GetOpcionesCortesFacturasListResult;
				vm.selectedMenu = data.GetOpcionesCortesFacturasListResult[0];
			});
		}

		function getDatosDistribuidores() {
			reportesFactory.getDistribuidores().then(function(data) {
				vm.distribuidoresObj = {
					filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
					labelAll: 'Distribuidores Disponibles',
					labelSelected: 'Distribuidores Seleccionadas',
					labelShow: 'Nombre',
					orderProperty: 'Nombre',
					items: data.GetDistribuidorReporteListResult,
					selectedItems: []
				};
			});
		}

		function menuChange() {
			if (vm.selectedMenu.Clv_Vendedor != 999) {
				vm.showMenus = true;
				reportesFactory.getOptionsSubMenu(vm.selectedMenu.Clv_Vendedor).then(function(data) {
					vm.subMenu = data.GetCatalogoReportesFacListResult;
				});
			} else {
				vm.showMenus = false;
			}
		}

		function secuenciaReporte(x) {
			getDatosDistribuidores();
			vm.secuencia = x;
			ocultarPaneles();
			vm.titulo = 'Seleccion ' + vm.secuencia;
			switch (x) {
				case 'General':
					vm.showDistribuidores = true;
					break;
				case 'Por Caja':
					vm.showDistribuidores = true;
					break;
				case 'Por Cajero(a)':
					vm.showDistribuidores = true;
					break;
				case 'Por Cajero(a) con puntos':
					vm.showDistribuidores = true;
					break;
				case 'Por Plaza':
					vm.showDistribuidores = true;
					break;
				case 'Por Sucursal':
					vm.showDistribuidores = true;
					break;
				case 'Por Sucursal De Facturas Fiscales':
					vm.showDistribuidores = true;
					break;
				case 'Por Vendedor(a)':
					vm.showDistribuidores = true;
					break;
				case 'General de Facturas Fiscales':
					vm.showDistribuidores = true;
					break;
				case 'Resumen de Ingresos por Sucursal':
					vm.showDistribuidores = true;
					break;
				case 'Resumen de Ingresos por Sucursal Fiscal':
					vm.showDistribuidores = true;
					break;
			}
		}

		function okDistribuidores() {
			switch (vm.secuencia) {
				case 'General':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'General de Facturas Fiscales':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Por Caja':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Por Cajero(a)':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Por Cajero(a) con puntos':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Por Plaza':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						vm.showGeneralDate = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Por Sucursal':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Por Sucursal De Facturas Fiscales':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Por Vendedor(a)':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Resumen de Ingresos por Sucursal':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
				case 'Resumen de Ingresos por Sucursal Fiscal':
					if (vm.distribuidoresObj.selectedItems.length > 0) {
						vm.showDistribuidores = false;
						reportesFactory.getPlazasByDistribuidor(vm.distribuidoresObj.selectedItems).then(function(data) {
							vm.plazasObj = {
								filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
								labelAll: 'Plazas Disponibles',
								labelSelected: 'Plazas Seleccionadas',
								labelShow: 'Nombre',
								orderProperty: 'Nombre',
								items: data.GetPlazaDListResult,
								selectedItems: []
							};;
						});
						vm.showPlazas = true;
					} else {
						ngNotify.set('Selecciona al menos un distribuidor.', 'error');
					}
					break;
			}
		}

		function backPlazas() {
			switch (vm.secuencia) {
				case 'General':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'General de Facturas Fiscales':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Por Caja':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Por Cajero(a)':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Por Cajero(a) con puntos':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Por Plaza':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Por Sucursal':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Por Sucursal De Facturas Fiscales':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Por Vendedor(a)':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Resumen de Ingresos por Sucursal':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
				case 'Resumen de Ingresos por Sucursal Fiscal':
					vm.showDistribuidores = true;
					vm.showPlazas = false;
					break;
			}
		}

		function okPlazas() {
			switch (vm.secuencia) {
				case 'General':
					if (vm.plazasObj.selectedItems.length > 0) {
						vm.showPlazas = false;
						vm.showGeneralDate = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'General de Facturas Fiscales':
					if (vm.selectedMenu.Clv_Vendedor == 2) {
						if (vm.plazasObj.selectedItems.length > 0) {
							console.log('generar pdf');
						} else {
							ngNotify.set('Selecciona al menos una plaza.', 'error');
						}
					} else {
						if (vm.plazasObj.selectedItems.length > 0) {
							vm.showPlazas = false;
							vm.showGeneralDate = true;
						} else {
							ngNotify.set('Selecciona al menos una plaza.', 'error');
						}
					}
					break;
				case 'Por Caja':
					if (vm.plazasObj.selectedItems.length > 0) {
						reportesFactory.getCajas().then(function(data) {
							vm.cajas = data.GetMuestra_CajasCortesListResult;
							vm.selectedCaja = data.GetMuestra_CajasCortesListResult[0];
							$('#cajasSelect').select2();
						});
						vm.showPlazas = false;
						vm.showGeneralDate = true;
						vm.showEscojeCaja = true;
						vm.showResumen = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'Por Cajero(a)':
					if (vm.plazasObj.selectedItems.length > 0) {
						reportesFactory.getUsuarios().then(function(data) {
							vm.usuarios = data.GetMuestra_UsuariosCortesListResult;
							vm.selectedUsuario = data.GetMuestra_UsuariosCortesListResult[0];
							$('#usuarioSelect').select2();
						});
						vm.showPlazas = false;
						vm.showGeneralDate = true;
						vm.showEscojeCajero = true;
						vm.showResumen = true;

					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'Por Cajero(a) con puntos':
					if (vm.plazasObj.selectedItems.length > 0) {
						reportesFactory.getUsuarios().then(function(data) {
							vm.usuarios = data.GetMuestra_UsuariosCortesListResult;
							vm.selectedUsuario = data.GetMuestra_UsuariosCortesListResult[0];
							$('#usuariolSelect').select2();
						});
						vm.showPlazas = false;
						vm.showGeneralDate = true;
						vm.showEscojeCajero = true;
						vm.showResumen = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'Por Plaza':
					if (vm.plazasObj.selectedItems.length > 0) {
						vm.showPlazas = false;
						vm.showGeneralDate = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'Por Sucursal':
					if (vm.plazasObj.selectedItems.length > 0) {
						reportesFactory.getSucursales().then(function(data) {
							vm.sucursales = data.GetMuestra_SucursalesCortesListResult;
							vm.selectedSucursal = data.GetMuestra_SucursalesCortesListResult[0];
							$('#sucursalSelect').select2();
						});
						vm.showPlazas = false;
						vm.showGeneralDate = true;
						vm.showResumen = true;
						vm.showEscojeSucursal = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'Por Sucursal De Facturas Fiscales':
					if (vm.plazasObj.selectedItems.length > 0) {
						reportesFactory.getSucursales().then(function(data) {
							vm.sucursales = data.GetMuestra_SucursalesCortesListResult;
							vm.selectedSucursal = data.GetMuestra_SucursalesCortesListResult[0];
							$('#sucursalSelect').select2();
						});
						vm.showPlazas = false;
						vm.showGeneralDate = true;
						vm.showResumen = true;
						vm.showEscojeSucursal = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'Por Vendedor(a)':
					if (vm.plazasObj.selectedItems.length > 0) {
						reportesFactory.getVendedores().then(function(data) {
							vm.vendedores = data.GetMuestra_VendedoresCortesListResult;
							vm.selectedVendedor = data.GetMuestra_VendedoresCortesListResult[0];
							$('#vendedorSelect').select2();
						});
						vm.showPlazas = false;
						vm.showGeneralDate = true;

						vm.showResumen = true;
						vm.showEscojeVendedor = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'Resumen de Ingresos por Sucursal':
					if (vm.plazasObj.selectedItems.length > 0) {
						reportesFactory.getSucursales().then(function(data) {
							vm.sucursales = data.GetMuestra_SucursalesCortesListResult;
							vm.selectedSucursal = data.GetMuestra_SucursalesCortesListResult[0];
							$('#sucursalSelect').select2();
						});
						vm.showPlazas = false;
						vm.showGeneralDate = true;
						vm.showEscojeSucursal = true;
						vm.showResumen = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
				case 'Resumen de Ingresos por Sucursal Fiscal':
					if (vm.plazasObj.selectedItems.length > 0) {
						reportesFactory.getSucursales().then(function(data) {
							vm.sucursales = data.GetMuestra_SucursalesCortesListResult;
							vm.selectedSucursal = data.GetMuestra_SucursalesCortesListResult[0];
							$('#sucursalSelect').select2();
						});
						vm.showPlazas = false;
						vm.showGeneralDate = true;
						vm.showEscojeSucursal = true;
						vm.showResumen = true;
					} else {
						ngNotify.set('Selecciona al menos una plaza.', 'error');
					}
					break;
			}
		}

		function backFechaGeneral() {
			switch (vm.secuencia) {
				case 'General':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'General de Facturas Fiscales':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'Por Caja':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'Por Cajero(a)':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'Por Cajero(a) con puntos':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'Por Plaza':
					vm.showDistribuidores = true;
					vm.showGeneralDate = false;
					break;
				case 'Por Sucursal':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'Por Sucursal De Facturas Fiscales':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'Por Vendedor(a)':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'Resumen de Ingresos por Sucursal':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break;
				case 'Resumen de Ingresos por Sucursal Fiscal':
					vm.showPlazas = true;
					vm.showGeneralDate = false;
					break
			}
		}

		function generarReporte() {
			switch (vm.secuencia) {
				case 'General':
					if (vm.selectedMenu.Clv_Vendedor == 0) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objGeneralReporte = {
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
								status: vm.auxOrdenarStatus
							};
							reportesFactory.reporteGeneralCajas(objGeneralReporte).then(function(data) {
								var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesFListResult[0].Cajera;
								$('#reporteID').attr('src', url);
								vm.showReporte = true;
								vm.showGeneralDate = false;
							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objGeneralReporte = {
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
								status: vm.auxOrdenarStatus
							};
							reportesFactory.reportesGeneralVentas(objGeneralReporte).then(function(data) {
								var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesGralVentasListResult[0].Cajera;
								$('#reporteID').attr('src', url);
								vm.showReporte = true;
								vm.showGeneralDate = false;
							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 2) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objGeneralReporte = {
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
								status: vm.auxOrdenarStatus
							};
							reportesFactory.reportesGeneralResumen(objGeneralReporte).then(function(data) {
								var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesGralResumenListResult[0].Cajera;
								$('#reporteID').attr('src', url);
								vm.showReporte = true;
								vm.showGeneralDate = false;
							});
						}
					}
					break;
				case 'Por Vendedor(a)':
					if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								vendedor: vm.selectedVendedor.Clv_Vendedor,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesPorVendedor(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesPorVendedorListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesPorVendedorListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					}
					break;
				case 'Por Cajero(a)':
					if (vm.selectedMenu.Clv_Vendedor == 0) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajeraReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								cajera: vm.selectedUsuario.CLV_USUARIO,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesPorCajero(objCajeraReporte).then(function(data) {
								if (data.GetReporteCortesCajeroListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesCajeroListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}

							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajeraReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								cajera: vm.selectedUsuario.CLV_USUARIO,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesCajeroVentas(objCajeraReporte).then(function(data) {
								if (data.GetReporteCortesCajeroVentasListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesCajeroVentasListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 2) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajeraReporte = {
								status: vm.auxOrdenarStatus,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								resumen: vm.auxResumen,
								cajera: vm.selectedUsuario.CLV_USUARIO,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesCajeroResumen(objCajeraReporte).then(function(data) {
								if (data.GetReporteCortesCajeroResumenListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesCajeroResumenListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					}
					break;
				case 'Por Caja':
					if (vm.selectedMenu.Clv_Vendedor == 0) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								caja: vm.selectedCaja.CLV_USUARIO,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesPorCaja(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesCajaListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesCajaListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								caja: vm.selectedCaja.CLV_USUARIO,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesCajasVentas(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesCajasVentasListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesCajasVentasListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					}
					break;
				case 'Por Sucursal':
					if (vm.selectedMenu.Clv_Vendedor == 0) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								sucursal: vm.selectedSucursal.CLV_SUCURSAL,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesPorSucursal(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesSucursalListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesSucursalListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}

							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								sucursal: vm.selectedSucursal.CLV_SUCURSAL,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesSucursalesVentas(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesSucursalVentasListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesSucursalVentasListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}

							});
						}
					}
					break;
				case 'General de Facturas Fiscales':
					if (vm.selectedMenu.Clv_Vendedor == 0) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reporteGeneralCajasFiscales(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesGralFacFisListResult[0].NomCajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesGralFacFisListResult[0].NomCajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesGeneralFiscalesVentas(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesGralFacFisVentasListResult[0].NomCajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesGralFacFisVentasListResult[0].NomCajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					}
					break;
				case 'Por Sucursal De Facturas Fiscales':
					if (vm.selectedMenu.Clv_Vendedor == 0) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus = 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								sucursal: vm.selectedSucursal.CLV_SUCURSAL,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesPorSucursalFiscales(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesSucFacFisListResult[0].NomCajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesSucFacFisListResult[0].NomCajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}

							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus = 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								sucursal: vm.selectedSucursal.CLV_SUCURSAL,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesPorSucursalFiscalesVentas(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesSucFacFisVentasListResult[0].NomCajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesSucFacFisVentasListResult[0].NomCajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					}
					break;
				case 'Por Cajero(a) con puntos':
					if (vm.selectedMenu.Clv_Vendedor == 0) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus = 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								cajera: vm.selectedUsuario.CLV_USUARIO,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesPorCajeroPuntos(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesCajeroConPuntosListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesCajeroConPuntosListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus = 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								resumen: vm.auxResumen,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								cajera: vm.selectedUsuario.CLV_USUARIO,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesCajeroPuntos(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesCajeroConPuntosVentasListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesCajeroConPuntosVentasListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}

							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 2) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus = 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							if (vm.resumen == true) {
								vm.auxResumen = 1;
							} else {
								vm.auxResumen = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							vm.plazasObj.selectedItems.forEach(function(item) {
								auxPlaza.push({
									IdPlaza: item.Clave,
									Plaza: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								resumen: vm.auxResumen,
								cajera: vm.selectedUsuario.CLV_USUARIO,
								objdistribuidores: auxDist,
								objPlaza: auxPlaza,
							};
							reportesFactory.reportesCajeroPuntosResumen(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesCajeroConPuntosResumenListResult[0].Cajera == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesCajeroConPuntosResumenListResult[0].Cajera;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}

							});
						}
					}
					break;
				case 'Por Plaza':
					if (vm.selectedMenu.Clv_Vendedor == 0) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								objdistribuidores: auxDist,
							};
							reportesFactory.reportePorPlaza(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesPlazaCajasListResult[0].Compania == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesPlazaCajasListResult[0].Compania;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 1) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								objdistribuidores: auxDist,
							};
							reportesFactory.reportesPlazasVentas(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesPlazaVentasListResult[0].Compania == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesPlazaVentasListResult[0].Compania;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					} else if (vm.selectedMenu.Clv_Vendedor == 2) {
						vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
						vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
						if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
							ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						} else {
							if (vm.ordenarStatus == true) {
								vm.auxOrdenarStatus == 1;
							} else {
								vm.auxOrdenarStatus = 0;
							}
							var auxDist = [];
							var auxPlaza = [];
							vm.distribuidoresObj.selectedItems.forEach(function(item) {
								auxDist.push({
									IdDis: item.Clave,
									Distribuidores: item.Nombre
								});
							});
							var objCajaReporte = {
								status: vm.auxOrdenarStatus,
								fechaInicial: vm.auxFechaInicio,
								fechaFinal: vm.auxFechaFinal,
								objdistribuidores: auxDist,
							};
							reportesFactory.reportesPlazaResumen(objCajaReporte).then(function(data) {
								if (data.GetReporteCortesPlazaResumenListResult[0].Compania == 'Sin Registros') {
									ngNotify.set('No se encontraron registros.', 'error');
								} else {
									var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesPlazaResumenListResult[0].Compania;
									$('#reporteID').attr('src', url);
									vm.showReporte = true;
									vm.showGeneralDate = false;
								}
							});
						}
					}
					break;
				case 'Resumen de Ingresos por Sucursal':
					vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
					vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
					if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
						ngNotify.set('Seleccione un rago de fechas válido.', 'error');
					} else {
						if (vm.ordenarStatus == true) {
							vm.auxOrdenarStatus == 1;
						} else {
							vm.auxOrdenarStatus = 0;
						}
						if (vm.resumen == true) {
							vm.auxResumen = 1;
						} else {
							vm.auxResumen = 0;
						}
						var auxDist = [];
						var auxPlaza = [];
						vm.distribuidoresObj.selectedItems.forEach(function(item) {
							auxDist.push({
								IdDis: item.Clave,
								Distribuidores: item.Nombre
							});
						});
						vm.plazasObj.selectedItems.forEach(function(item) {
							auxPlaza.push({
								IdPlaza: item.Clave,
								Plaza: item.Nombre
							});
						});
						var objCajaReporte = {
							status: vm.auxOrdenarStatus,
							fechaInicial: vm.auxFechaInicio,
							resumen: vm.auxResumen,
							fechaFinal: vm.auxFechaFinal,
							sucursal: vm.selectedSucursal.CLV_SUCURSAL,
							objdistribuidores: auxDist,
							objPlaza: auxPlaza,
						};
						reportesFactory.reporteSucursalesResumen(objCajaReporte).then(function(data) {
							if (data.GetReporteCortesSucursalResumenListResult[0].Cajera == 'Sin Registros') {
								ngNotify.set('No se encontraron registros.', 'error');
							} else {
								var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesSucursalResumenListResult[0].Cajera;
								$('#reporteID').attr('src', url);
								vm.showReporte = true;
								vm.showGeneralDate = false;
							}

						});
					}
					break;
				case 'Resumen de Ingresos por Sucursal Fiscal':
					vm.auxFechaInicio = $filter('date')(vm.fechaInicio, 'dd/MM/yyyy');
					vm.auxFechaFinal = $filter('date')(vm.fechaFinal, 'dd/MM/yyyy');
					if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
						ngNotify.set('Seleccione un rango de fechas válido.', 'error');
					} else {
						if (vm.ordenarStatus == true) {
							vm.auxOrdenarStatus = 1;
						} else {
							vm.auxOrdenarStatus = 0;
						}
						if (vm.resumen == true) {
							vm.auxResumen = 1;
						} else {
							vm.auxResumen = 0;
						}
						var auxDist = [];
						var auxPlaza = [];
						vm.distribuidoresObj.selectedItems.forEach(function(item) {
							auxDist.push({
								IdDis: item.Clave,
								Distribuidores: item.Nombre
							});
						});
						vm.plazasObj.selectedItems.forEach(function(item) {
							auxPlaza.push({
								IdPlaza: item.Clave,
								Plaza: item.Nombre
							});
						});
						var objCajaReporte = {
							status: vm.auxOrdenarStatus,
							fechaInicial: vm.auxFechaInicio,
							resumen: vm.auxResumen,
							fechaFinal: vm.auxFechaFinal,
							sucursal: vm.selectedSucursal.CLV_SUCURSAL,
							objdistribuidores: auxDist,
							objPlaza: auxPlaza,
						};
						reportesFactory.reportesSucursalFisResumen(objCajaReporte).then(function(data) {
							if (data.GetReporteCortesSucFacFisResumenListResult[0].NomCajera == 'Sin Registros') {
								ngNotify.set('No se encontraron registros.', 'error');
							} else {
								var url = globalService.getUrlReportes() + '/Reportes/' + data.GetReporteCortesSucFacFisResumenListResult[0].NomCajera;
								$('#reporteID').attr('src', url);
								vm.showReporte = true;
								vm.showGeneralDate = false;
							}

						});
					}
					break;
			}
		}

		function cancelarPanel() {
			ocultarPaneles();
		}

		function ocultarPaneles() {
			vm.showReporte = false;
			vm.showPlazas = false;
			vm.resumen = false;
			vm.ordenarStatus = false;
			vm.showGeneralDate = false;
			vm.showDistribuidores = false;
			vm.showEscojeCaja = false;
			vm.showEscojeCajero = false;
			vm.showEscojeSucursal = false;
			vm.showEscojeVendedor = false;
			vm.showResumen = false;
			vm.fechaInicio = '';
			vm.fechaFinal = '';
			try {
				vm.plazasObj.selectedItems = [];
				vm.distribuidoresObj.selectedItems = [];
			} catch (err) {}
		}

		var vm = this;
		vm.menuChange = menuChange;
		vm.secuenciaReporte = secuenciaReporte;
		vm.okDistribuidores = okDistribuidores;
		vm.backPlazas = backPlazas;
		vm.okPlazas = okPlazas;
		vm.backFechaGeneral = backFechaGeneral;
		vm.cancelarPanel = cancelarPanel;
		vm.generarReporte = generarReporte;
		initialData();
	});
