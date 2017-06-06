'use strict';
angular.module('softvApp')
	.factory('reportesVariosFactory', function ($http, $q, globalService, $localStorage) { //, sessionFactory) {
		var factory = {};
		var paths = {
			mostrarTipServ: '/compania/GetTipServicioList',
			mostrarCompania: '/compania/GetcompaniaList',
			mostrarDistribuidorByUsuario: '/compania/GetDistribuidorByUsuario',
			mostrarPlazaByDistribuidor: '/compania/GetPlazasByDistribuidor',
			mostrarEstadoByPlaza: '/compania/GetEstadosByplaza',
			mostrarCiudad: '/compania/GetCiudadesBy_PlazasEstado',
			mostrarLocalidadByCiudad: '/compania/GetLocalidadesbyCiudad',
			mostrarColonia: '/compania/GetColoniasBy_Ciudad_Localidad',
			mostrarCalle: '/compania/GetCallesBy_Ciudad_Localidad_Colonia',
			mostrarServInternet: '/compania/GetServInternetList',
			mostrarServDigital: '/compania/GetServDigitalList',
			mostrarTipoCliente: '/compania/GetTipoClienteList',
			mostrarPeriodo: '/compania/GetPeriodosRepVarList',
			mostrarMotivoCan: '/compania/GetMotCancelacionList',
			getPlazas: '/MuestraPlazasProcesos/GetMuestraPlazasProcesosList',
			getXml: '/compania/GetCreateXmlBeforeReport',
			//----------- Reportes Varios	
			ReporteDig_1: '/compania/GetReporteDig_1',
			ReporteDig_2: '/compania/GetReporteDig_2',
			ReporteDig_3: '/compania/GetReporteDig_3',
			ReporteDig_4: '/compania/GetReporteDig_4',
			ReporteDig_5: '/compania/GetReporteDig_5',
			ReporteDig_6: '/compania/GetReporteDig_6',
			ReporteDig_7: '/compania/GetReporteDig_7',
			ReporteDig_8: '/compania/GetReporteDig_8',
			ReporteDig_9: '/compania/GetReporteDig_9',
			ReporteDig_10: '/compania/GetReporteDig_10',
			ReporteDig_11: '/compania/GetReporteDig_11',
			ReporteDig_12: '/compania/GetReporteDig_12',
			ReporteDig_13: '/compania/GetReporteDig_13',
			ReporteDig_14: '/compania/GetReporteDig_14',
			ReporteDig_15: '/compania/GetReporteDig_15',
			ReporteDig_16: '/compania/GetReporteDig_16',
			ReporteInt_1: '/compania/GetReporteInt_1',
			ReporteInt_2: '/compania/GetReporteInt_2',
			ReporteInt_3: '/compania/GetReporteInt_3',
			ReporteInt_4: '/compania/GetReporteInt_4',
			ReporteInt_5: '/compania/GetReporteInt_5',
			ReporteInt_6: '/compania/GetReporteInt_6',
			ReporteInt_7: '/compania/GetReporteInt_7'
		};


		factory.getXml = function (objPrincipal, objParametros, objRangoFechas, estatusCliente, Distribuidores,
			Plazas, Estados, Ciudades, Localidades, Colonias, Servicios, TipoClientes, Periodos, Calles) {

			var deferred = $q.defer();
			var Parametros = {
				'objPrincipal': objPrincipal,
				'objParametros': objParametros,
				'objRangoFechas': objRangoFechas,
				'estatusCliente': estatusCliente,
				'distriArray': Distribuidores,
				'plazaArray': Plazas,
				'estadoArray': Estados,
				'ciudadArray': Ciudades,
				'localidadArray': Localidades,
				'coloniaArray': Colonias,
				'servicioArray': Servicios,
				'tipoCliArray': TipoClientes,
				'periodoArray': Periodos,
				'calleArray': Calles
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getXml, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.ReporteDig_1 = function (reporteSeleccionado, servSelec, clv_usuario, elOrden, laBaja,
			OtrosFiltrosXml, distribuidoresXML, CompaniasXml, CiudadesXml,
			LocalidadesXml, ColoniaXml, ServiciosXml, PeriodosXml, TipoClientesXml, localidadF, coloniaF, calleF) {

			var deferred = $q.defer();
			var Parametros = {
				'reportData': {
					'clv_usuario': clv_usuario, 'OtrosFiltrosXml': OtrosFiltrosXml, 'distribuidoresXML': distribuidoresXML, 'CompaniasXml': CompaniasXml,
					'CiudadesXml': CiudadesXml, 'LocalidadesXml': LocalidadesXml, 'ColoniaXml': ColoniaXml, 'ServiciosXml': ServiciosXml,
					'PeriodosXml': PeriodosXml, 'TipoClientesXml': TipoClientesXml, 'localidadF': localidadF, 'coloniaF': coloniaF, 'calleF': calleF
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ReporteDig_1, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.creaReporte = function (reporteSeleccionado, servSelec, clv_usuario, elOrden, laBaja,
			OtrosFiltrosXml, distribuidoresXML, CompaniasXml, CiudadesXml, CalleXml,
			LocalidadesXml, ColoniaXml, ServiciosXml, PeriodosXml, TipoClientesXml, localidadF, coloniaF, calleF) {
			var rutaServicio;

			if (reporteSeleccionado === 13)  // 13 ciudad
			{
				if (elOrden === 1) {
					if (laBaja === 0)//cualquiera SIN bajas
					{
						rutaServicio = paths.ReporteDig_12; // url = 'ReportesVarios/Reporte_Digital_12'; 
					}
					else if (laBaja === 1) //cualquiera CON bajas
					{
						rutaServicio = paths.ReporteDig_13; // url = 'ReportesVarios/Reporte_Digital_13'; 
					}
				}
				else if (elOrden === 2) {
					if (laBaja === 0)//cualquiera SIN bajas
					{
						rutaServicio = paths.ReporteDig_15; // url = 'ReportesVarios/Reporte_Digital_15';
					}
					if (laBaja === 1)  //cualquiera CON bajas
					{
						rutaServicio = paths.ReporteDig_14; // url = 'ReportesVarios/Reporte_Digital_14'; 
					}
				}
			}
			else if (reporteSeleccionado === 14) // 14 resumen por colonia y status
			{
				rutaServicio = paths.ReporteDig_5;// url = 'ReportesVarios/Reporte_Digital_5';
			}
			else if ((reporteSeleccionado !== 13) && (reporteSeleccionado !== 14)) {
				if (servSelec === 3) // ---------------- S E R V I C I O   D I G I T A L
				{   //Contrato | Colonia y Calle; Orden = 1 | 2              
					if ((reporteSeleccionado === 1) || (reporteSeleccionado === 2) || (reporteSeleccionado === 7)) //1 desconectados, 2 suspendidos, 7 por pagar 
					{
						rutaServicio = paths.ReporteDig_1;// url = 'ReportesVarios/Reporte_Digital_1'; 


					}
					else if (reporteSeleccionado === 12)// 12 paquetes de cortesía
					{
						rutaServicio = paths.ReporteDig_4; //url = 'ReportesVarios/Reporte_Digital_4';
					}
					if (elOrden === 1) //Contrato
					{
						if ((reporteSeleccionado === 3) || (reporteSeleccionado === 10))//3 al corriente, 10 por instalar
						{
							rutaServicio = paths.ReporteDig_2; //url = 'ReportesVarios/Reporte_Digital_2'; 
						}
						else if (reporteSeleccionado === 4) // 4 adelantados
						{
							rutaServicio = paths.ReporteDig_3; //url = 'ReportesVarios/Reporte_Digital_3'; 
						}
						//else if ((reporteSeleccionado === 5) || (reporteSeleccionado === 8) || (reporteSeleccionado === 9) || (reporteSeleccionado === 11))//5 contrataciones principales, 8 instalaciones, 9 cancelaciones, 11 fueras de área
						//{    rutaServicio = paths.ReporteDig_6; //url = 'ReportesVarios/Reporte_Digital_6'; 
						//}
						else if (reporteSeleccionado === 9)// 9 cancelaciones
						{
							rutaServicio = paths.ReporteDig_6;  //url = 'ReportesVarios/Reporte_Digital_6'; 
						}
						else if ((reporteSeleccionado === 5) || (reporteSeleccionado === 8) || (reporteSeleccionado === 11))//5 contrataciones principales, 8 instalaciones, 11 fueras de área
						{
							rutaServicio = paths.ReporteDig_16; //url = 'ReportesVarios/Reporte_Digital_6'; 
						}

						else if (reporteSeleccionado === 6)// 6 contrataciones
						{
							rutaServicio = paths.ReporteDig_7; //url = 'ReportesVarios/Reporte_Digital_7'; 
						}
					}
					else if (elOrden === 2) // Colonia y calle
					{
						if ((reporteSeleccionado === 3) || (reporteSeleccionado === 10))//3 al corriente, 10 por instalar
						{
							rutaServicio = paths.ReporteDig_8; //url = 'ReportesVarios/Reporte_Digital_8'; 
						}
						else if (reporteSeleccionado === 4)// 4 adelantados
						{
							rutaServicio = paths.ReporteDig_9; //url = 'ReportesVarios/Reporte_Digital_9'; 
						}
						else if ((reporteSeleccionado === 5) || (reporteSeleccionado === 8) || (reporteSeleccionado === 9) || (reporteSeleccionado === 11))//5 contrataciones principales, 8 instalaciones, 9 cancelaciones, 11 fueras de área
						{
							rutaServicio = paths.ReporteDig_11; //url = 'ReportesVarios/Reporte_Digital_11'; 
						}
						else if (reporteSeleccionado === 6)// 6 contrataciones
						{
							rutaServicio = paths.ReporteDig_10; //url = 'ReportesVarios/Reporte_Digital_10'; 
						}
					}
				}
				else if (servSelec === 2)// ---------------- S E R V I C I O   I N T E R N E T
				{
					//Contrato | Colonia y Calle; Orden = 1 | 2                   
					if ((reporteSeleccionado === 1) || (reporteSeleccionado === 2)) //1 desconectados, 2 suspendidos
					{
						rutaServicio = paths.ReporteInt_1; //url = 'ReportesVarios/Reporte_Internet_1'; 
					}
					else if (reporteSeleccionado === 7)// 7 por pagar
					{
						rutaServicio = paths.ReporteInt_2; //url = 'ReportesVarios/Reporte_Internet_2'; 
					}
					else if (reporteSeleccionado === 12)// 12 paquetes de cortesía
					{
						rutaServicio = paths.ReporteInt_7; //url = 'ReportesVarios/Reporte_Internet_7'; 
					}
					if (elOrden === 1) //Contrato
					{
						if ((reporteSeleccionado === 3) || (reporteSeleccionado === 4) || (reporteSeleccionado === 10))//3 al corriente, 4 adelantados, 10 por instalar
						{
							rutaServicio = paths.ReporteInt_3; //url = 'ReportesVarios/Reporte_Internet_3'; 
						}
						else if ((reporteSeleccionado === 6) || (reporteSeleccionado === 8) || (reporteSeleccionado === 9) || (reporteSeleccionado === 11))//6 contrataciones, 8 instalaciones, 9 cancelaciones, 11 fueras de área
						{
							rutaServicio = paths.ReporteInt_5; //url = 'ReportesVarios/Reporte_Internet_5'; 
						}
					}
					else if (elOrden === 2) //Colonia y calle
					{
						if ((reporteSeleccionado === 3) || (reporteSeleccionado === 4) || (reporteSeleccionado === 10))//3 al corriente, 4 adelantados, 10 por instalar
						{
							rutaServicio = paths.ReporteInt_4; //url = 'ReportesVarios/Reporte_Internet_4'; 
						}
						else if ((reporteSeleccionado === 6) || (reporteSeleccionado === 8) || (reporteSeleccionado === 9) || (reporteSeleccionado === 11))//6 contrataciones, 8 instalaciones, 9 cancelaciones, 11 fueras de área
						{
							rutaServicio = paths.ReporteInt_6; //url = 'ReportesVarios/Reporte_Internet_6'; 
						}
					}
				}
			}
			//---------------------------------------------------
			var deferred = $q.defer();
			var Parametros = {
				'reportData': {
					'clv_usuario': clv_usuario, 'OtrosFiltrosXml': OtrosFiltrosXml, 'distribuidoresXML': distribuidoresXML, 'CompaniasXml': CompaniasXml,
					'CiudadesXml': CiudadesXml, 'LocalidadesXml': LocalidadesXml, 'ColoniaXml': ColoniaXml, 'ServiciosXml': ServiciosXml,
					'PeriodosXml': PeriodosXml, 'TipoClientesXml': TipoClientesXml, 'CalleXml': CalleXml, 'localidadF': localidadF, 'coloniaF': coloniaF, 'calleF': calleF
				}
			};

			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + rutaServicio, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		//-----------------------------------------------------------------------------
		// Tipos de servicio
		factory.mostrarTipServ = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.get(globalService.getUrl() + paths.mostrarTipServ, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		//mostrarMotivoCan
		factory.mostrarMotivoCan = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.get(globalService.getUrl() + paths.mostrarMotivoCan, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		//mostrar Periodo
		factory.mostrarPeriodo = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};

			$http.get(globalService.getUrl() + paths.mostrarPeriodo, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		//mostrar Serv Digital
		factory.mostrarServDigital = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};

			$http.get(globalService.getUrl() + paths.mostrarServDigital, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};
		//mostrar Serv Internet
		factory.mostrarServInternet = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};

			$http.get(globalService.getUrl() + paths.mostrarServInternet, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.mostrarTipoCliente = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};

			$http.get(globalService.getUrl() + paths.mostrarTipoCliente, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};


		factory.mostrarDistribuidorByUsuario = function (clv_usuario) {
			var deferred = $q.defer();
			var Parametros = {
				'clv_usuario': clv_usuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarDistribuidorByUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		// banderas, Distribuidores <--- clv_usuario + plazas (o sea distribuidores)
		factory.mostrarPlazaByDistribuidor = function (clv_usuario, Distribuidores) {
			var deferred = $q.defer();
			var Parametros = {
				'clv_usuario': clv_usuario,
				'plazas': Distribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarPlazaByDistribuidor, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.mostrarEstadoByPlaza = function (Plazas) {
			var deferred = $q.defer();
			var Parametros = {
				'plazas': Plazas
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarEstadoByPlaza, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.mostrarCiudad = function (Plazas, Estados) {
			var deferred = $q.defer();
			var Parametros = {
				'Plazas': Plazas,
				'Estados': Estados
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarCiudad, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.mostrarLocalidadByCiudad = function (clv_usuario, Ciudades) {
			var deferred = $q.defer();
			var Parametros = {
				'clv_usuario': clv_usuario,
				'Ciudades': Ciudades
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarLocalidadByCiudad, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.mostrarColonia = function (clv_usuario, banderaLocalidad, Ciudades, Localidades) {
			var deferred = $q.defer();
			var Parametros = {
				'clv_usuario': clv_usuario,
				'banderaLocalidad': banderaLocalidad,
				'Ciudades': Ciudades,
				'Localidades': Localidades
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarColonia, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};



		factory.mostrarCalle = function (clv_usuario, banderaLocalidad, banderaColonia, Distribuidores, Ciudades, Localidades, Colonias) {
			var deferred = $q.defer();
			var Parametros = {
				'clv_usuario': clv_usuario,
				'banderaLocalidad': banderaLocalidad,
				'banderaColonia': banderaColonia,
				'Distribuidores': Distribuidores,
				'Ciudades': Ciudades,
				'Localidades': Localidades,
				'Colonias': Colonias
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarCalle, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		return factory;
	});
