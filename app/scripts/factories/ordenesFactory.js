'use strict';
angular
    .module('softvApp')
    .factory('ordenesFactory', function ($http, $q, globalService, $localStorage) {
        var factory = {};
        var paths = {
            plazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
            usuarios: '/MUESTRAUSUARIOS/GetMUESTRAUSUARIOSList',
            colonias: '/uspConsultaColonias/GetuspConsultaColoniasList',
            buscarOrdenes: '/uspBuscaOrdSer_BuscaOrdSerSeparado2/GetuspBuscaOrdSer_BuscaOrdSerSeparado2List',
            buscarClientes: '/uspBuscaContratoSeparado2/GetuspBuscaContratoSeparado2List',
            buscarColonia: '/uspConsultaColoniasPorUsuario/GetuspConsultaColoniasPorUsuarioList',
            buscarCliPorContrato: '/BUSCLIPORCONTRATO_OrdSer/GetDeepBUSCLIPORCONTRATO_OrdSer',
            serviciosCliente: '/DameSerDelCliFac/GetDameSerDelCliFacList',
            dimeServicio: '/Dime_Que_servicio_Tiene_cliente/GetDime_Que_servicio_Tiene_clienteList',
            muestraTrabajo: '/MUESTRATRABAJOSPorTipoUsuario/GetMUESTRATRABAJOSPorTipoUsuarioList',
            getCiudadCamdo: '/CAMDO/GetllenaCiudadCamdoList',
            getLocalidadCamdo: '/CAMDO/GetllenaLocalidadCamdoList',
            getColoniaCamdo: '/CAMDO/GetllenaColoniaCamdoList',
            getCalleCamdo: '/CAMDO/GetllenaCalleCamdoList',
            addBitacoraReproceso: '/Bitacora/AddReprocesarEdoCuenta',
            addBitacoraReenviar: '/Bitacora/AddReenviarEdoCuenta',
            addOrdenServicio: '/OrdSer/AddOrdSer',
            validaOrden: '/VALIDAOrdenQueja/GetDeepVALIDAOrdenQueja',
            addDetalleOrden: '/DetOrdSer/AddDetOrdSer',
            addCambioDomicilio: '/CAMDO/AddCAMDO',
            consultaTablaServicios: '/BUSCADetOrdSer/GetBUSCADetOrdSerList',
            consultaCambioDomicilio: '/CAMDO/GetDeepCAMDO',
            getCableModemsCli: '/MuestraGuaBor/GetMUESTRACABLEMODEMSDELCLI_porOpcion',
            detalleCableModem: '/MuestraGuaBor/GetMUESTRACONTNET_PorOpcion',
            addIpaqu: '/IPAQU/AddIPAQU',
            guardaMotivoCancelacion: '/GuardaMotivoCanServ/GetDeepGuardaMotivoCanServ'
        };

        factory.guardaMotivoCancelacion = function (objeto) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.guardaMotivoCancelacion, JSON.stringify(objeto), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.addIpaqu = function (obIpaqu) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.addIpaqu, JSON.stringify(obIpaqu), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.detalleCableModem = function (modem) {
            var deferred = $q.defer();
            var Parametros = {
                'ContratoNet': modem.contrato,
                'Status': '',
                'Op': modem.op,
                'ClvOS': modem.orden,
                'ClvDetOs': modem.detalle
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.detalleCableModem, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getCableModemsCli = function (contrato) {
            var deferred = $q.defer();
            var Parametros = {
                'Contrato': contrato,
                'Status': 'P',
                'Op': 14
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.getCableModemsCli, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.consultaCambioDomicilio = function (detalle, orden, contrato) {
            var deferred = $q.defer();
            var Parametros = {
                'CLAVE': detalle,
                'Clv_Orden': orden,
                'CONTRATO': contrato

            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.consultaCambioDomicilio, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.consultaTablaServicios = function (orden) {
            var deferred = $q.defer();
            var Parametros = {
                'Clv_Orden': orden
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.consultaTablaServicios, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.addCambioDomicilio = function (obj) {
            var deferred = $q.defer();
            var Parametros = {
                'objCAMDO':
                {
                    'CLAVE': obj.clv_detalle,
                    'Clv_Orden': obj.clv_orden,
                    'CONTRATO': obj.contrato,
                    'Clv_Calle': obj.calle,
                    'NUMERO': obj.numero,
                    'ENTRECALLES': obj.entrecalles,
                    'Clv_Colonia': obj.colonia,
                    'TELEFONO': obj.telefono,
                    'ClvTecnica': 0,
                    'Clv_Ciudad': obj.ciudad,
                    'Num_int': obj.numinterior,
                    'Clv_Sector': 0,
                    'Clv_Localidad': obj.localidad
                }
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.addCambioDomicilio, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.addDetalleOrden = function (obj) {
            var deferred = $q.defer();
            var Parametros = {
                'objDetOrdSer':
                {
                    'Clv_Orden': obj.clave,
                    'Clv_Trabajo': obj.trabajo,
                    'Obs': obj.observaciones,
                    'SeRealiza': obj.seRealiza,
                }

            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.addDetalleOrden, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.validaOrden = function (contrato, servicio) {
            var deferred = $q.defer();
            var Parametros = {
                'Contrato': contrato,
                'TipSer': servicio,
                'Usuario': $localStorage.currentUser.usuario
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.validaOrden, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.addOrdenServicio = function (obj) {
            var deferred = $q.defer();
            var Parametros = {
                'objOrdSer':
                {
                    'Clv_TipSer': 0,
                    'Contrato': obj.contrato,
                    'Fec_Sol': obj.fecha,
                    'Fec_Eje': '',
                    'Visita1': '',
                    'Visita2': '',
                    'Status': 'P',
                    'Clv_Tecnico': 0,
                    'IMPRESA': 0,
                    'Clv_FACTURA': 0,
                    'Obs': obj.observaciones,
                    'ListadeArticulos': ''
                }

            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.addOrdenServicio, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getPlazas = function () {
            var deferred = $q.defer();
            var user = $localStorage.currentUser.idUsuario;
            var Parametros = {
                'ClvUsuario': user,
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.plazas, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getContratoReal = function (contrato) {
            var deferred = $q.defer();
            var Parametros = {
                'ContratoCom': contrato,
                'Nombre': '',
                'Apellido_Paterno': '',
                'Apellido_Materno': '',
                'CALLE': '',
                'NUMERO': '',
                'ClvColonia': 0,
                'SetupBox': '',
                'IdUsuario': $localStorage.currentUser.idUsuario,
                'TipoSer': 0,
                'Op': 0
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.buscarClientes, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.addBitacoraReenviar = function (contrato) {
            var deferred = $q.defer();
            var user = $localStorage.currentUser.usuario;
            var Parametros = {
                'objReenviarEdoCuenta':
                {
                    'Usuario': user,
                    'Contrato': contrato
                }

            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.addBitacoraReenviar, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.addBitacoraReproceso = function (contrato) {
            var deferred = $q.defer();
            var user = $localStorage.currentUser.usuario;
            var Parametros = {
                'objReprocesarEdoCuenta':
                {
                    'Usuario': user,
                    'Contrato': contrato
                }

            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.addBitacoraReproceso, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getUsuarios = function () {
            var deferred = $q.defer();
            var Parametros = {
                'OP': 2
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.usuarios, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.buscarOrdenes = function (objOrd) {
            var deferred = $q.defer();
            var Parametros = {
                'Op': objOrd.op,
                'Clv_Orden': objOrd.orden,
                'Contrato': objOrd.contrato,
                'Nombre': objOrd.nombre,
                'Apellido_Paterno': objOrd.paterno,
                'Apellido_Materno': objOrd.materno,
                'CALLE': objOrd.calle,
                'NUMERO': objOrd.numero,
                'ClvColonia': objOrd.colonia,
                'IdCompania': objOrd.compania,
                'SetupBox': objOrd.setupbox,
                'ClvUsuario': $localStorage.currentUser.idUsuario,
                'STATUS': objOrd.status,
                'Auto': objOrd.auto
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.buscarOrdenes, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getColonias = function (idcomp) {
            var deferred = $q.defer();
            var Parametros = {
                'idcompania': idcomp
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.colonias, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getColoniasUser = function () {
            var deferred = $q.defer();
            var Parametros = {
                'IdUsuario': $localStorage.currentUser.idUsuario
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.buscarColonia, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.buscarClientes = function (obj) {
            var deferred = $q.defer();
            var Parametros = {
                'ContratoCom': obj.contrato,
                'Nombre': obj.nombre,
                'Apellido_Paterno': obj.paterno,
                'Apellido_Materno': obj.materno,
                'CALLE': obj.calle,
                'NUMERO': obj.numero,
                'ClvColonia': obj.colonia,
                'SetupBox': obj.setupbox,
                'IdUsuario': $localStorage.currentUser.idUsuario,
                'TipoSer': 0,
                'Op': obj.op

            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.buscarClientes, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.buscarCliPorContrato = function (contrato) {
            var deferred = $q.defer();
            var Parametros = {
                'CONTRATO': contrato,
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.buscarCliPorContrato, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.serviciosCliente = function (contrato) {
            var deferred = $q.defer();
            var Parametros = {
                'Contrato': contrato,
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.serviciosCliente, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.dimeServicio = function (contrato) {
            var deferred = $q.defer();
            var Parametros = {
                'Contrato': contrato,
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.dimeServicio, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.muestraTrabajo = function (tipo, usua) {
            var deferred = $q.defer();
            var Parametros = {
                'ClvTipSer': tipo,
                'TipoUser': usua
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.muestraTrabajo, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getCiudadCamdo = function (contrato) {
            var deferred = $q.defer();
            var Parametros = {
                'CONTRATO': contrato
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.getCiudadCamdo, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getLocalidadCamdo = function (contrato, idCiudad) {
            var deferred = $q.defer();
            var Parametros = {
                'CONTRATO': contrato,
                'Clv_Ciudad': idCiudad
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.getLocalidadCamdo, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getColoniaCamdo = function (contrato, idLocalidad) {
            var deferred = $q.defer();
            var Parametros = {
                'CONTRATO': contrato,
                'Clv_Localidad': idLocalidad
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.getColoniaCamdo, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        factory.getCalleCamdo = function (contrato, idColonia) {
            var deferred = $q.defer();
            var Parametros = {
                'CONTRATO': contrato,
                'Clv_Colonia': idColonia
            };
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.getCalleCamdo, JSON.stringify(Parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        };

        return factory;
    });
