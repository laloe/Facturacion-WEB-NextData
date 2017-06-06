'use strict';
angular.module('softvApp')
    .controller('ReportesVariosCtrl', function ($state, ngNotify, $localStorage, reportesVariosFactory, globalService, $sce) // servicio
    {
        var vm = this;

        this.$onInit = function () {
            reportesVariosFactory.mostrarTipServ().then(function (data) {
                vm.tipoServicios = data.GetTipServicioListResult;
                vm.ServicioDigitalInternet = data.GetTipServicioListResult[1];
            });

            reportesVariosFactory.mostrarMotivoCan().then(function (data) {
                //---- para cancelaciones
                vm.motivos1 = data.GetMotCancelacionListResult;
                vm.selectedMotcan1 = data.GetMotCancelacionListResult[0];
                //---- para ciudad y resumen por colonia
                vm.motivos2 = data.GetMotCancelacionListResult;
                vm.selectedMotcan2 = data.GetMotCancelacionListResult[0];
            });

            vm.ordenRadio = '1';
            ListaDistribuidores();

        }


        //------------------Distribuidores -------------------------------

        function ExisteDistribuidor(id) {
            var result = $.grep(Distribuidores, function (obj) { return obj.Clv_Plaza == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }

        function distribuidorPadre() {
            if (banderas.banderaDistribuidor == 1) {

                banderas.banderaDistribuidor = 0;
                Distribuidores = [];

                for (var i = 0; i < vm.DistribuidoresTable.length; i++) {
                    vm.DistribuidoresTable[i].selected = false;
                }
            }
            else if (banderas.banderaDistribuidor == 0) {
                Distribuidores = [];
                reportesVariosFactory.mostrarDistribuidorByUsuario(clv_usuario).then(function (data) {
                    DistribuidoresTodos = data.GetDistribuidorByUsuarioResult;
                    var i;
                    for (i = 0; i < DistribuidoresTodos.length; i++) {
                        vm.DistribuidoresTable[i].selected = true;
                        AddToArray(Distribuidores, DistribuidoresTodos[i]);
                    }
                });
                banderas.banderaDistribuidor = 1;
            }
        }


        function distribuidorHijo(obj) {

            if (banderas.banderaDistribuidor == 1) {
                vm.distriTodo = false;
                if (ExisteDistribuidor(obj.Clv_Plaza)) {
                    DeleteFromArray(Distribuidores, 'Clv_Plaza', obj.Clv_Plaza);
                }
                banderas.banderaDistribuidor = 0;
            }
            else {
                AddDistribuidor(obj);
            }
        }


        function AddDistribuidor(obj) {
            if (ExisteDistribuidor(obj.Clv_Plaza)) {
                DeleteFromArray(Distribuidores, 'Clv_Plaza', obj.Clv_Plaza)
            }
            else {
                AddToArray(Distribuidores, obj);
            }
        }

        var DistribuidoresTodos = [];


        function ListaDistribuidores() {
            reportesVariosFactory.mostrarDistribuidorByUsuario(clv_usuario).then(function (data) {
                vm.DistribuidoresTable = data.GetDistribuidorByUsuarioResult;
                DistribuidoresTodos = data.GetDistribuidorByUsuarioResult;
            });
        }

        //------------------ Plazas -------------------------------

        function ExistePlaza(id) {
            var result = $.grep(Plazas, function (obj) { return obj.id_compania == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }


        function plazaPadre() {
            if (pla == 1) {
                pla = 0;
                Plazas = [];
                for (var i = 0; i < vm.PlazasTable.length; i++) {
                    vm.PlazasTable[i].selected = false;
                }
            }
            else if (pla == 0) {
                Plazas = [];
                reportesVariosFactory.mostrarPlazaByDistribuidor(clv_usuario, Distribuidores).then(function (data) {
                    PlazasTodos = data.GetPlazasByDistribuidorResult;

                    for (var i = 0; i < PlazasTodos.length; i++) {
                        vm.PlazasTable[i].selected = true;
                        AddToArray(Plazas, PlazasTodos[i]);
                    }
                });
                pla = 1;
            }
        }


        function plazaHijo(obj) {
            if (pla == 1) {
                vm.plazaTodo = false;
                if (ExistePlaza(obj.id_compania)) {
                    DeleteFromArray(Plazas, 'id_compania', obj.id_compania);
                }
                pla = 0;
            }
            else {
                AddPlazas(obj);
            }
        }


        function AddPlazas(obj) {
            if (pla == 1) {
                pla = 0;
                Plazas = [];
                AddToArray(Plazas, obj);
            }
            else if (pla == 0) {
                if (ExistePlaza(obj.id_compania)) {
                    DeleteFromArray(Plazas, 'id_compania', obj.id_compania);
                }
                else {
                    AddToArray(Plazas, obj);
                }
            }

        }


        //------------------Estado  -------------------------------

        function ExisteEstado(id) {
            var result = $.grep(Estados, function (obj) { return obj.Clv_Estado == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }


        function estadoPadre() {
            if (est == 1) {
                est = 0;
                Estados = [];
                for (var i = 0; i < vm.EstadosTable.length; i++) {
                    vm.EstadosTable[i].selected = false;
                }
            }
            else if (est == 0) {
                Estados = [];
                reportesVariosFactory.mostrarEstadoByPlaza(Plazas).then(function (data) {
                    EstadosTodos = data.GetEstadosByplazaResult;
                    for (var i = 0; i < EstadosTodos.length; i++) {
                        vm.EstadosTable[i].selected = true;
                        AddToArray(Estados, EstadosTodos[i]);
                    }
                });
                est = 1;
            }
        }


        function estadoHijo(obj) {
            if (est == 1) {
                vm.estadoTodo = false;
                if (ExisteEstado(obj.Clv_Estado)) {
                    DeleteFromArray(Estados, 'Clv_Estado', obj.Clv_Estado)
                }
                est = 0;
            }
            else {
                AddEstados(obj);
            }
        }


        function AddEstados(obj) {
            if (est == 1) {
                est = 0;

                Estados = [];
                AddToArray(Estados, obj);
            }
            else if (est == 0) {
                if (ExisteEstado(obj.Clv_Estado)) {
                    DeleteFromArray(Estados, 'Clv_Estado', obj.Clv_Estado)
                }
                else {
                    AddToArray(Estados, obj);
                }
            }
        }

        //----------------- Ciudad

        function ExisteCiudad(id) {
            var result = $.grep(Ciudades, function (obj) { return obj.Clv_Ciudad == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }


        function ciudadPadre() {

            if (banderas.banderaCiudad == 1) {
                banderas.banderaCiudad = 0;
                Ciudades = [];

                for (var i = 0; i < vm.CiudadesTable.length; i++) {
                    vm.CiudadesTable[i].selected = false;
                }
            }
            else if (banderas.banderaCiudad == 0) {
                Ciudades = [];
                reportesVariosFactory.mostrarCiudad(Plazas, Estados).then(function (data) {
                    CiudadesTodos = data.GetCiudadesBy_PlazasEstadoResult;
                    for (var i = 0; i < CiudadesTodos.length; i++) {
                        vm.CiudadesTable[i].selected = true;
                        AddToArray(Ciudades, CiudadesTodos[i]);
                    }
                });
                banderas.banderaCiudad = 1;
            }
        }


        function ciudadHijo(obj) {
            if (banderas.banderaCiudad == 1) {
                vm.ciudadTodo = false;
                if (ExisteCiudad(obj.Clv_Ciudad)) {
                    DeleteFromArray(Ciudades, 'Clv_Ciudad', obj.Clv_Ciudad)
                }
                banderas.banderaCiudad = 0;
            }
            else {
                AddCiudades(obj);
            }
        }



        function AddCiudades(obj) {
            if (banderas.banderaCiudad == 1) {
                banderas.banderaCiudad = 0;
                Ciudades = [];
                AddToArray(Ciudades, obj);
            }
            else if (banderas.banderaCiudad == 0) {
                if (ExisteCiudad(obj.Clv_Ciudad)) {
                    DeleteFromArray(Ciudades, 'Clv_Ciudad', obj.Clv_Ciudad)
                }
                else {
                    AddToArray(Ciudades, obj);
                }
            }
        }

        //----------------- Localidad

        function ExisteLocalidad(id) {
            var result = $.grep(Localidades, function (obj) { return obj.Clv_Localidad == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }


        function localidadPadre() {
            if (banderas.banderaLocalidad == 1) {
                banderas.banderaLocalidad = 0;
                Localidades = [];
                for (var i = 0; i < vm.LocalidadesTable.length; i++) {
                    vm.LocalidadesTable[i].selected = false;
                }
            }
            else if (banderas.banderaLocalidad == 0) {
                Localidades = [];

                reportesVariosFactory.mostrarLocalidadByCiudad(clv_usuario, Ciudades).then(function (data) {
                    LocalidadesTodos = data.GetLocalidadesbyCiudadResult;
                    for (var i = 0; i < LocalidadesTodos.length; i++) {
                        vm.LocalidadesTable[i].selected = true;
                        AddToArray(Localidades, LocalidadesTodos[i]);
                    }
                });
                banderas.banderaLocalidad = 1;
            }
        }


        function localidadHijo(obj) {

            if (banderas.banderaLocalidad == 1) {

                vm.localidadTodo = false;
                if (ExisteLocalidad(obj.Clv_Localidad)) {
                    DeleteFromArray(Localidades, 'Clv_Localidad', obj.Clv_Localidad)
                }
                banderas.banderaLocalidad = 0;
            }
            else {
                AddLocalidades(obj);
            }
        }



        function AddLocalidades(obj) {
            if (banderas.banderaLocalidad == 1) {
                banderas.banderaLocalidad = 0;
                Localidades = [];
                AddToArray(Localidades, obj);
            }
            else if (banderas.banderaLocalidad == 0) {
                if (ExisteLocalidad(obj.Clv_Localidad)) {
                    DeleteFromArray(Localidades, 'Clv_Localidad', obj.Clv_Localidad);
                }
                else {
                    AddToArray(Localidades, obj);
                }
            }
        }


        //----------------- Colonia

        function ExisteColonia(id) {
            var result = $.grep(Colonias, function (obj) { return obj.CLV_COLONIA == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }


        function coloniaPadre() {

            if (banderas.banderaColonia == 1) {
                banderas.banderaColonia = 0;
                Colonias = [];
                for (var i = 0; i < vm.ColoniasTable.length; i++) {
                    vm.ColoniasTable[i].selected = false;
                }
            }
            else if (banderas.banderaColonia == 0) {
                Colonias = [];

                reportesVariosFactory.mostrarColonia(clv_usuario, banderas.banderaLocalidad, Ciudades, Localidades).then(function (data) {
                    ColoniasTodos = data.GetColoniasBy_Ciudad_LocalidadResult;

                    for (var i = 0; i < ColoniasTodos.length; i++) {
                        vm.ColoniasTable[i].selected = true;
                        AddToArray(Colonias, ColoniasTodos[i]);
                    }
                });
                banderas.banderaColonia = 1;
            }
        }



        function coloniaHijo(obj) {

            if (banderas.banderaColonia == 1) {

                vm.coloniaTodo = false;
                if (ExisteColonia(obj.CLV_COLONIA)) {
                    DeleteFromArray(Colonias, 'CLV_COLONIA', obj.CLV_COLONIA);
                }
                banderas.banderaColonia = 0;
            }
            else {
                AddColonias(obj);
            }

        }


        function AddColonias(obj) {
            if (banderas.banderaColonia == 1) {
                banderas.banderaColonia = 0;
                Colonias = [];
                AddToArray(Colonias, obj);
            }
            else if (banderas.banderaColonia == 0) {
                if (ExisteColonia(obj.CLV_COLONIA)) {
                    DeleteFromArray(Colonias, 'CLV_COLONIA', obj.CLV_COLONIA)
                }
                else {
                    AddToArray(Colonias, obj)
                }
            }
        }


        //------------------- Serv Internet

        function ExisteServicioInternet(id) {
            var result = $.grep(ServiciosInternet, function (obj) { return obj.Clv_Servicio == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }



        function serviciosInternetPadre() {

            if (sinter == 1) {
                sinter = 0;
                ServiciosInternet = [];
                for (var i = 0; i < vm.ServInternetTable.length; i++) {
                    vm.ServInternetTable[i].selected = false;
                }
            }
            else if (sinter == 0) {
                ServiciosInternet = [];

                reportesVariosFactory.mostrarServInternet().then(function (data) {


                    ServiciosInternetTodos = data.GetServInternetListResult;
                    for (var i = 0; i < ServiciosInternetTodos.length; i++) {
                        vm.ServInternetTable[i].selected = true;
                        AddToArray(ServiciosInternet, ServiciosInternetTodos[i]);

                    }

                });
                sinter = 1;
            }

        }


        function serviciosInternetHijo(obj) {
            if (sinter == 1) {

                vm.serviciosInternetTodo = false;
                if (ExisteServicioInternet(obj.Clv_Servicio)) {
                    DeleteFromArray(ServiciosInternet, 'Clv_Servicio', obj.Clv_Servicio)
                }
                sinter = 0;
            }
            else {
                AddServiciosInternet(obj);
            }
        }


        function AddServiciosInternet(obj) {
            if (sinter == 1) {
                sinter = 0;
                ServiciosInternet = [];
                AddToArray(ServiciosInternet, obj);
            }
            else if (sinter == 0) {
                if (ExisteServicioInternet(obj.Clv_Servicio)) {
                    DeleteFromArray(ServiciosInternet, 'Clv_Servicio', obj.Clv_Servicio)
                }
                else {
                    AddToArray(ServiciosInternet, obj);
                }
            }
        }



        //------------------- Serv Digital

        function ExisteServicioDigital(id) {
            var result = $.grep(ServiciosDigital, function (obj) { return obj.Clv_Servicio == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }


        function serviciosDigitalPadre() {

            if (sdig == 1) {
                sdig = 0;
                ServiciosDigital = [];
                for (var i = 0; i < vm.ServDigitalTable.length; i++) {
                    vm.ServDigitalTable[i].selected = false;
                }
            }
            else if (sdig == 0) {
                ServiciosDigital = [];
                reportesVariosFactory.mostrarServDigital().then(function (data) {
                    ServiciosDigitalTodos = data.GetServDigitalListResult;
                    for (var i = 0; i < ServiciosDigitalTodos.length; i++) {
                        vm.ServDigitalTable[i].selected = true;
                        AddToArray(ServiciosDigital, ServiciosDigitalTodos[i]);
                    }
                });
                sdig = 1;
            }
        }



        function serviciosDigitalHijo(obj) {
            if (sdig == 1) {

                vm.serviciosDigitalTodo = false;
                if (ExisteServicioDigital(obj.Clv_Servicio)) {
                    DeleteFromArray(ServiciosDigital, 'Clv_Servicio', obj.Clv_Servicio);
                }
                sdig = 0;
            }
            else {
                AddServiciosDigital(obj);
            }

        }



        function AddServiciosDigital(obj) {
            if (sdig == 1) {
                sdig = 0;
                ServiciosDigital = [];
                AddToArray(ServiciosDigital, obj);
            }
            else if (sdig == 0) {
                if (ExisteServicioDigital(obj.Clv_Servicio)) {
                    DeleteFromArray(ServiciosDigital, 'Clv_Servicio', obj.Clv_Servicio);
                }
                else {
                    AddToArray(ServiciosDigital, obj);
                }
            }
        }


        //------------------- Tipo Clientes


        function ExisteTipoClientes(id) {
            var result = $.grep(TipoClientes, function (obj) { return obj.Clv_TipoCliente == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }

        function tipoClientesPadre() {
            if (tipo == 1) {
                tipo = 0;
                TipoClientes = [];

                for (var i = 0; i < vm.TipoClientesTable.length; i++) {
                    vm.TipoClientesTable[i].selected = false;
                }
            }
            else if (tipo == 0) {
                TipoClientes = [];
                reportesVariosFactory.mostrarTipoCliente().then(function (data) {
                    TipoClientesTodos = data.GetTipoClienteListResult;
                    for (var i = 0; i < TipoClientesTodos.length; i++) {
                        vm.TipoClientesTable[i].selected = true;
                        AddToArray(TipoClientes, TipoClientesTodos[i]);
                    }
                });
                tipo = 1;
            }
        }


        function tipoClientesHijo(obj) {

            if (tipo == 1) {

                vm.tipoTodo = false;

                if (ExisteTipoClientes(obj.Clv_TipoCliente)) {
                    DeleteFromArray(TipoClientes, 'Clv_TipoCliente', obj.Clv_TipoCliente)
                }
                tipo = 0;
            }
            else {
                AddTipoClientes(obj);
            }

        }


        function AddTipoClientes(obj) {
            if (tipo == 1) {
                tipo = 0;
                TipoClientes = [];
                AddToArray(TipoClientes, obj);
            }
            else if (tipo == 0) {
                if (ExisteTipoClientes(obj.Clv_TipoCliente)) {
                    DeleteFromArray(TipoClientes, 'Clv_TipoCliente', obj.Clv_TipoCliente)
                }
                else {
                    AddToArray(TipoClientes, obj);
                }
            }
        }



        //-------------------Periodo


        function ExistePeriodo(id) {
            var result = $.grep(Periodos, function (obj) { return obj.Clv_Periodo == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }


        function periodoPadre() {
            if (peri == 1) {
                peri = 0;
                Periodos = [];
                for (var i = 0; i < vm.PeriodosTable.length; i++) {
                    vm.PeriodosTable[i].selected = false;
                }
            }
            else if (peri == 0) {
                Periodos = [];
                reportesVariosFactory.mostrarPeriodo().then(function (data) {
                    PeriodosTodos = data.GetPeriodosRepVarListResult;
                    for (var i = 0; i < PeriodosTodos.length; i++) {
                        vm.PeriodosTable[i].selected = true;
                        AddToArray(Periodos, PeriodosTodos[i]);
                    }
                });
                peri = 1;
            }
        }


        function periodoHijo(obj) {

            if (peri == 1) {

                vm.periodoTodo = false;
                if (ExistePeriodo(obj.Clv_Periodo)) {
                    DeleteFromArray(Periodos, 'Clv_Periodo', obj.Clv_Periodo)
                }
                peri = 0;
            }
            else {
                AddPeriodos(obj);
            }

        }


        function AddPeriodos(obj) {
            if (peri == 1) {
                peri = 0;
                Periodos = [];
                AddToArray(Periodos, obj);
            }
            else if (peri == 0) {
                if (ExistePeriodo(obj.Clv_Periodo)) {
                    DeleteFromArray(Periodos, 'Clv_Periodo', obj.Clv_Periodo)
                }
                else {
                    AddToArray(Periodos, obj);

                }
            }

        }



        //-------------------Calle

        function ExisteCalle(id) {
            var result = $.grep(Calles, function (obj) { return obj.Clv_calle == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }


        function callePadre() {

            if (banderas.banderaCalle == 1) {
                banderas.banderaCalle = 0;
                Calles = [];
                for (var i = 0; i < vm.CallesTable.length; i++) {
                    vm.CallesTable[i].selected = false;
                }
            }
            else if (banderas.banderaCalle == 0) {
                Calles = [];
                reportesVariosFactory.mostrarCalle(clv_usuario, banderas.banderaLocalidad, banderas.banderaColonia, Distribuidores, Ciudades, Localidades, Colonias).then(function (data) {
                    CallesTodos = data.GetCallesBy_Ciudad_Localidad_ColoniaResult;

                    for (var i = 0; i < CallesTodos.length; i++) {
                        vm.CallesTable[i].selected = true;
                        AddToArray(Calles, CallesTodos[i]);
                    }
                });
                banderas.banderaCalle = 1;
            }
        }



        function calleHijo(obj) {
            if (banderas.banderaCalle == 1) {
                vm.calleTodo = false;
                if (ExisteCalle(obj.Clv_calle)) {
                    DeleteFromArray(Calles, 'Clv_calle', obj.Clv_calle)
                }
                banderas.banderaCalle = 0;
            }
            else {
                AddCalles(obj);
            }
        }


        function AddCalles(obj) {
            if (banderas.banderaCalle == 1) {
                banderas.banderaCalle = 0;
                Calles = [];
                AddToArray(Calles, obj);
            }
            else if (banderas.banderaCalle == 0) {
                if (ExisteCalle(obj.Clv_calle)) {
                    DeleteFromArray(Calles, 'Clv_calle', obj.Clv_calle)
                }
                else {
                    AddToArray(Calles, obj);
                }
            }
        }

        //-------------

        function AddToArray(arr, value) {
            arr.push(value);
        }


        function DeleteFromArray(arr, attr, value) {
            var i = arr.length;
            while (i--) {
                if (arr[i]
                    && arr[i].hasOwnProperty(attr)
                    && (arguments.length > 2 && arr[i][attr] === value)) {
                    arr.splice(i, 1);
                }
            }
            return arr;
        }

        function seleccionarTodo() {
            if (banderas.banderaTodoSeleccionado == 0) {
                banderas.banderaLocalidad = 2;
                banderas.banderaColonia = 2;
                banderas.banderaCalle = 2;

                banderas.banderaTodoSeleccionado = 1;
            } else if (banderas.banderaTodoSeleccionado == 1) {
                banderas.banderaLocalidad = 0;
                banderas.banderaColonia = 0;
                banderas.banderaCalle = 0;

                banderas.banderaTodoSeleccionado = 0;
            }
        }

        vm.cambiaServicio = function (tipServ) {
            servicioSeleccionado = tipServ.Clv_TipSer;
            if (servicioSeleccionado == 3) {
                vm.soloInternet_esconde = true;
                vm.principales = false;
            } else if (servicioSeleccionado == 2) {
                vm.soloInternet_esconde = false;
                vm.principales = true;
            }
            cleanArray();
            showOpcion();
        }


        function cleanArray() {

            objPrincipal = {}; objRangoFechas = {};
            estatusCliente = {}; objParametros = {};
            objParametros.conectado = 0, objParametros.Fuera = 0, objParametros.Susp = 0, objParametros.Insta = 0,
                objParametros.Desconect = 0, objParametros.DescTmp = 0, objParametros.baja = 0;
            vm.anioC = { value: 2010 };
            vm.anioC2 = { value: 2010 };

            for (var i = 0; i < vm.DistribuidoresTable.length; i++) {
                vm.DistribuidoresTable[i].selected = false;
            }

            Distribuidores = []; Plazas = []; Estados = []; Ciudades = [];
            Localidades = []; Colonias = []; Calles = []; Periodos = [];
            ServiciosInternet = []; ServiciosDigital = []; TipoClientes = []; Motcan = [];
            Motcan2 = []; DistribuidoresTodos = []; PlazasTodos = []; EstadosTodos = [];
            CiudadesTodos = []; LocalidadesTodos = []; ColoniasTodos = []; CallesTodos = [];
            PeriodosTodos = []; ServiciosInternetTodos = []; ServiciosDigitalTodos = []; TipoClientesTodos = [];

            vm.botonRegresar = true; //oculta
            vm.divMotivoCancelacion1 = true;
            vm.divMotivoCancelacion2 = true;

            clv_usuario = $localStorage.currentUser.idUsuario;
            banderas = {};
            banderas.clv_usuario = clv_usuario;
            banderas.banderaDistribuidor = 0;
            banderas.banderaCiudad = 0;
            banderas.banderaLocalidad = 0;
            banderas.banderaColonia = 0;
            banderas.banderaCalle = 0;
            banderas.banderaTodoSeleccionado = 0;

            vm.ultimoMes = vm.meses[0];
            vm.mesQueAdeuda = vm.meses[0];
            vm.fechaInicial = new Date();
            vm.fechaFinal = new Date();
            vm.search = null;
            vm.inicializaCheckbox();
        }

        function inicializaCheckbox() {

            vm.distriTodo = false;
            vm.todoTodoselected = false;
            vm.plazaTodo = false;
            vm.estadoTodo = false;
            vm.ciudadTodo = false;
            vm.localidadTodo = false;
            vm.coloniaTodo = false;
            vm.serviciosInternetTodo = false;
            vm.serviciosDigitalTodo = false;
            vm.tipoTodo = false;
            vm.periodoTodo = false;
            vm.calleTodo = false;

            pla = 0, est = 0, coloni = 0, sinter = 0, sdig = 0, tipo = 0, peri = 0;
            //-------- status cliente
            vm.staC = false;
            vm.staF = false;
            vm.staS = false;
            vm.staI = false;
            vm.staD = false;
            vm.statN = false;
            vm.statT = false;
            //-------busca o no
            vm.buscaOno = false;
            buscaOnovar = 0;
        }


        function statusCancel() {
            if (objParametros.baja == 1) {
                vm.divMotivoCancelacion1 = true;
                objParametros.baja = 0;

            } else if (objParametros.baja == 0) {
                vm.divMotivoCancelacion1 = false;
                objParametros.baja = 1;
            }
        }

        function showOpcion() {

            vm.search = null; //limpia barra búsqueda
            vm.botonRegresar = true;
            vm.pdistribuidores = true; //no mostrar
            vm.pplazas = true;
            vm.pestados = true;
            vm.pciudades = true;
            vm.plocalidades = true;
            vm.pcolonias = true;
            vm.pserviciosInternet = true;
            vm.pserviciosDigital = true;
            vm.ptipoclientes = true;
            vm.pperiodos = true;
            vm.prangosfecha = true;
            vm.pmesanio = true;
            vm.pcalles = true;
            vm.pstatus = true;
            vm.preporte = true;
        }


        function elMenu() {
            vm.myButton1 = 'btn-default';
            vm.myButton2 = 'btn-default';
            vm.myButton3 = 'btn-default';
            vm.myButton4 = 'btn-default';
            vm.myButton5 = 'btn-default';
            vm.myButton6 = 'btn-default';
            vm.myButton7 = 'btn-default';
            vm.myButton8 = 'btn-default';
            vm.myButton9 = 'btn-default';
            vm.myButton10 = 'btn-default';
            vm.myButton11 = 'btn-default';
            vm.myButton12 = 'btn-default';
            vm.myButton13 = 'btn-default';
            vm.myButton14 = 'btn-default';
        }

        function changeBgColor(valReporte) {

            vm.elMenu();
            switch (valReporte) {
                case 1:
                    vm.myButton1 = "btn-info active";
                    break;
                case 2:
                    vm.myButton2 = "btn-info active";
                    break;
                case 3:
                    vm.myButton3 = "btn-info active";
                    break;
                case 4:
                    vm.myButton4 = "btn-info active";
                    break;
                case 5:
                    vm.myButton5 = "btn-info active";
                    break;
                case 6:
                    vm.myButton6 = "btn-info active";
                    break;
                case 7:
                    vm.myButton7 = "btn-info active";
                    break;
                case 8:
                    vm.myButton8 = "btn-info active";
                    break;
                case 9:
                    vm.myButton9 = "btn-info active";
                    break;
                case 10:
                    vm.myButton10 = "btn-info active";
                    break;
                case 11:
                    vm.myButton11 = "btn-info active";
                    break;
                case 12:
                    vm.myButton12 = "btn-info active";
                    break;
                case 13:
                    vm.myButton13 = "btn-info active";
                    break;
                case 14:
                    vm.myButton14 = "btn-info active";
                    break;
            }

            reporteSeleccionado = valReporte;
            cleanArray();
            showOpcion();
            vm.pdistribuidores = false;
        }


        // 1.- DISTRIBUIDORES
        function filtroDistribuidores() {

            if (Distribuidores.length == 0) {
                ngNotify.set('Seleccione al menos un distribuidor', {
                    type: 'error'
                });
            } else {
                if (banderas.banderaTodoSeleccionado == 1) {
                    showServiciosDI();
                } else {
                    showplazas();
                }
            }
        }

        // 2.- PLAZAS
        function showplazas() {

            vm.search = "";
            vm.pplazas = false;
            vm.pdistribuidores = true;
            ListaPlazas();
        }

        // 3.- ESTADOS
        function showEstados() {

            if (Plazas.length == 0) {
                ngNotify.set('Seleccione al menos una plaza', {
                    type: 'error'
                });
            } else {
                vm.search = null;
                vm.pplazas = true;
                vm.pdistribuidores = true;
                vm.pestados = false;
                ListaEstados();
            }
        }


        // 4.- CIUDADES
        function showCiudades() {
            if (Estados.length == 0) {
                ngNotify.set('Seleccione al menos un estado', {
                    type: 'error'
                });
            } else {
                vm.search = null;
                vm.pplazas = true;
                vm.pestados = true;
                vm.pciudades = false;
                ListaCiudades();
            }
        }

        // 5.- LOCALIDADES

        function showLocalidades() {

            if (Ciudades.length == 0) {
                ngNotify.set('Seleccione al menos una ciudad', {
                    type: 'error'
                });
            } else {
                vm.search = null;
                vm.pplazas = true;
                vm.pestados = true;
                vm.pciudades = true;
                vm.plocalidades = false;
                ListaLocalidades();
            }
        }


        // 6.- COLONIAS         
        function showColonias() {

            if (Localidades.length == 0) {
                ngNotify.set('Seleccione al menos una localidad', {
                    type: 'error'
                });
            } else {
                vm.search = null;
                vm.pplazas = true;
                vm.pestados = true;
                vm.pciudades = true;
                vm.plocalidades = true;
                vm.pcolonias = false;
                ListaColonias();
            }
        }


        // 7.- SERVICIOS
        function showServiciosDI() {
            if ((Colonias.length == 0) && banderas.banderaTodoSeleccionado == 0) {
                ngNotify.set('Seleccione al menos una colonia', { type: 'error' });
            }
            else if ((Colonias.length > 0) || (banderas.banderaTodoSeleccionado == 1)) {
                vm.search = null;
                vm.pdistribuidores = true;
                vm.pplazas = true;
                vm.pestados = true;
                vm.pciudades = true;
                vm.plocalidades = true;
                vm.pcolonias = true;

                if (servicioSeleccionado == 3) {
                    vm.pserviciosDigital = false;
                    ListaServiciosDigital();
                } else if (servicioSeleccionado == 2) {
                    vm.pserviciosInternet = false;
                    ListaServiciosInternet();
                }
            }
        }

        // 8.- TIPO DE CLIENTES

        function showTipoClientes() {

            if (reporteSeleccionado != 12) {

                if (((servicioSeleccionado == 3) && (ServiciosDigital.length == 0)) || ((servicioSeleccionado == 2) && (ServiciosInternet.length == 0))) {

                    ngNotify.set('Seleccione al menos un servicio', {
                        type: 'error'
                    });
                } else {
                    vm.search = null;
                    vm.pplazas = true;
                    vm.pestados = true;
                    vm.pciudades = true;
                    vm.plocalidades = true;
                    vm.pcolonias = true;
                    vm.pserviciosInternet = true;
                    vm.pserviciosDigital = true;
                    vm.ptipoclientes = false;
                    ListaTipoClientes();
                }
            } else if (reporteSeleccionado == 12) {
                vm.showPeriodos();
            }
        }



        // 9.- PERIODOS

        function showPeriodos() {

            if (reporteSeleccionado != 12) {
                if (TipoClientes.length == 0) {

                    ngNotify.set('Seleccione al menos un tipo de cliente', {
                        type: 'error'
                    });
                } else {
                    vm.search = null;
                    vm.pplazas = true;
                    vm.pestados = true;
                    vm.pciudades = true;
                    vm.plocalidades = true;
                    vm.pcolonias = true;
                    vm.pserviciosInternet = true;
                    vm.pserviciosDigital = true;
                    vm.ptipoclientes = true;
                    vm.pperiodos = false;
                    ListaPeriodos();
                }
            } else if (reporteSeleccionado == 12) {
                vm.search = null;
                vm.pplazas = true;
                vm.pestados = true;
                vm.pciudades = true;
                vm.plocalidades = true;
                vm.pcolonias = true;
                vm.pserviciosInternet = true;
                vm.pserviciosDigital = true;
                vm.ptipoclientes = true;
                vm.pperiodos = false;
                ListaPeriodos();
            }
        }



        //10.- RANGOS DE FECHA
        function showRangosFecha() {

            if (Periodos.length == 0) {
                ngNotify.set('Seleccione al menos un periodo', {
                    type: 'error'
                });
            } else {
                if ((reporteSeleccionado >= 1 && reporteSeleccionado <= 4) || (reporteSeleccionado == 10) || (reporteSeleccionado == 12)) {

                    showReporte();
                } else if ((reporteSeleccionado == 5) || (reporteSeleccionado == 6) || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11)) {
                    if (reporteSeleccionado == 9) {
                        vm.MotcanDiv = false;
                    } else {
                        vm.MotcanDiv = true;
                    }

                    vm.search = null;
                    vm.pplazas = true;
                    vm.pestados = true;
                    vm.pciudades = true;
                    vm.plocalidades = true;
                    vm.pcolonias = true;
                    vm.pserviciosInternet = true;
                    vm.pserviciosDigital = true;
                    vm.ptipoclientes = true;
                    vm.pperiodos = true;
                    vm.prangosfecha = false;

                } else {

                    vm.showMesAnio();
                }
            }
        }


        //11
        function showMesAnio() {
            if ((reporteSeleccionado == 5) || (reporteSeleccionado == 6)
                || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11)) {

                var D1 = vm.fechaInicial; // no se usa por formato con zona horaria
                var month = D1.getUTCMonth() + 1; //months from 1-12
                var day = D1.getUTCDate();
                var year = D1.getUTCFullYear();
                var fechaInicialYMD = year + "/" + month + "/" + day;

                var D2 = vm.fechaFinal;
                var month = D2.getUTCMonth() + 1;
                var day = D2.getUTCDate();
                var year = D2.getUTCFullYear();
                var fechaFinalYMD = year + "/" + month + "/" + day;

                objPrincipal.fecha_ini = fechaInicialYMD;
                objPrincipal.fecha_fin = fechaFinalYMD;

                if (reporteSeleccionado == 9) {
                    objRangoFechas.motcan = vm.selectedMotcan1.Clv_MOTCAN;
                    objRangoFechas.motivo = 1;
                } else {
                    objRangoFechas.motcan = 0;
                    objRangoFechas.motivo = 0;
                }

                showReporte();
            } else {

                objPrincipal.fecha_ini = String.Empty;
                objPrincipal.fecha_fin = String.Empty;


                if (reporteSeleccionado == 7) {
                    vm.search = null;
                    vm.pplazas = true;
                    vm.pestados = true;
                    vm.pciudades = true;
                    vm.plocalidades = true;
                    vm.pcolonias = true;
                    vm.pserviciosInternet = true;
                    vm.pserviciosDigital = true;
                    vm.ptipoclientes = true;
                    vm.pperiodos = true;
                    vm.prangosfecha = true;
                    vm.pmesanio = false;

                } else {
                    vm.showCalles();
                }
            }
        }


        //12.- CALLES
        function showCalles() {

            if ((reporteSeleccionado == 7)) {
                if (vm.anioC.value == 0) {
                    ngNotify.set('Escriba un año', {
                        type: 'error'
                    });
                } else {

                    estatusCliente.mes = vm.ultimoMes.value;
                    estatusCliente.anio = vm.anioC.value;
                    showReporte();
                }
            } else {
                if ((reporteSeleccionado == 13) || (reporteSeleccionado == 14)) //calles existe en estos reportes
                {
                    if (banderas.banderaTodoSeleccionado == 0) {
                        vm.search = null;
                        vm.pplazas = true;
                        vm.pestados = true;
                        vm.pciudades = true;
                        vm.plocalidades = true;
                        vm.pcolonias = true;
                        vm.pserviciosInternet = true;
                        vm.pserviciosDigital = true;
                        vm.ptipoclientes = true;
                        vm.pperiodos = true;
                        vm.prangosfecha = true;
                        vm.pmesanio = true;
                        vm.pcalles = false;
                        ListaCalles();
                    }
                    else if (banderas.banderaTodoSeleccionado == 1)//NO muestra calles
                    {
                        showStatus();
                    }
                }
            }
        }



        //13.- Status del cliente

        function showStatus() {

            if ((reporteSeleccionado == 13) || (reporteSeleccionado == 14)) {

                if (banderas.banderaTodoSeleccionado == 0) {
                    if (Calles.length == 0) {
                        ngNotify.set('Seleccione al menos una calle', { type: 'error' });
                    }
                    else {
                        modalStatus();
                    }
                }
                else if (banderas.banderaTodoSeleccionado == 1) {
                    modalStatus();
                }
            }
        }

        function modalStatus() {
            vm.search = null;
            vm.pplazas = true;
            vm.pestados = true;
            vm.pciudades = true;
            vm.plocalidades = true;
            vm.pcolonias = true;
            vm.pserviciosInternet = true;
            vm.pserviciosDigital = true;
            vm.ptipoclientes = true;
            vm.pperiodos = true;
            vm.prangosfecha = true;
            vm.pmesanio = true;
            vm.pcalles = true;
            vm.pstatus = false;
        }

        function buscaOnoFunction() {
            if (buscaOnovar == 1) {
                vm.divMotivoCancelacion2 = true;
                buscaOnovar = 0;
            } else if (buscaOnovar == 0) {
                vm.divMotivoCancelacion2 = false;
                buscaOnovar = 1;
            }
        }


        function filtroStatus() {

            if ((objParametros.conectado == 0) && (objParametros.Insta == 0) && (objParametros.DescTmp == 0) && (objParametros.Fuera == 0) &&
                (objParametros.Desconect == 0) && (objParametros.Susp == 0) && (objParametros.conectado == 0) && (objParametros.baja == 0)) {
                //alert("Seleccione por lo menos un status");
                ngNotify.set('Seleccione al menos un status', {
                    type: 'error'
                });
            } else if ((objParametros.conectado == 1) || (objParametros.Insta == 1) || (objParametros.DescTmp == 1) || (objParametros.Fuera == 1) ||
                (objParametros.Desconect == 1) || (objParametros.Susp == 1) || (objParametros.conectado == 1) || (objParametros.baja == 1)) {

                objRangoFechas.motcan = vm.selectedMotcan2.Clv_MOTCAN;
                objRangoFechas.motivo = 0;

                if (buscaOnovar == 1) {
                    if (vm.anioC2.value == 0) //en modal estatusCliente
                    {

                        ngNotify.set('Escriba un año', {
                            type: 'error'
                        });
                    } else {
                        // status
                        estatusCliente.buscaOno = 1;
                        estatusCliente.buscarPor = vm.menoresModel;
                        estatusCliente.mes = vm.mesQueAdeuda.value;
                        estatusCliente.anio = vm.anioC2.value;

                        showReporte();
                    }
                } else {
                    estatusCliente.buscaOno = 0;
                    estatusCliente.buscarPor = 0; //<= ó =
                    estatusCliente.mes = 0;
                    estatusCliente.anio = 0;

                    showReporte();
                }
            }
        }


        //14
        vm.showReporte = showReporte;

        function showReporte() {
            vm.search = null;
            vm.pplazas = true;
            vm.pestados = true;
            vm.pciudades = true;
            vm.plocalidades = true;
            vm.pcolonias = true;
            vm.pserviciosInternet = true;
            vm.pserviciosDigital = true;
            vm.ptipoclientes = true;
            vm.pperiodos = true;
            vm.prangosfecha = true;
            vm.pmesanio = true;
            vm.pcalles = true;
            vm.pstatus = true;
            vm.preporte = false;

            muestraDistribuidores(); //crea xml
        }



        function ListaPlazas() {
            reportesVariosFactory.mostrarPlazaByDistribuidor(clv_usuario, Distribuidores).then(function (data) {
                vm.PlazasTable = data.GetPlazasByDistribuidorResult;
                PlazasTodos = data.GetPlazasByDistribuidorResult;
            });
        }


        function ListaEstados() {
            //enviar solo array Plazas
            reportesVariosFactory.mostrarEstadoByPlaza(Plazas).then(function (data) {
                vm.EstadosTable = data.GetEstadosByplazaResult;
            });
        }


        function ListaCiudades() {
            //enviar array Plazas y Estados
            reportesVariosFactory.mostrarCiudad(Plazas, Estados).then(function (data) {
                vm.CiudadesTable = data.GetCiudadesBy_PlazasEstadoResult;

            });
        }


        function ListaLocalidades() {
            reportesVariosFactory.mostrarLocalidadByCiudad(clv_usuario, Ciudades).then(function (data) {
                vm.LocalidadesTable = data.GetLocalidadesbyCiudadResult;
            });
        }

        function ListaColonias() {
            reportesVariosFactory.mostrarColonia(clv_usuario, banderas.banderaLocalidad, Ciudades, Localidades).then(function (data) {
                vm.ColoniasTable = data.GetColoniasBy_Ciudad_LocalidadResult;
            });
        }

        function ListaCalles() {
            reportesVariosFactory.mostrarCalle(clv_usuario, banderas.banderaLocalidad, banderas.banderaColonia, Distribuidores, Ciudades, Localidades, Colonias).then(function (data) {
                vm.CallesTable = data.GetCallesBy_Ciudad_Localidad_ColoniaResult;
            });
        }



        function ListaServiciosInternet() {
            reportesVariosFactory.mostrarServInternet().then(function (data) {
                vm.ServInternetTable = data.GetServInternetListResult;
            });
        }


        function ListaServiciosDigital() {
            reportesVariosFactory.mostrarServDigital().then(function (data) {
                vm.ServDigitalTable = data.GetServDigitalListResult;
            });
        }


        function ListaTipoClientes() {
            reportesVariosFactory.mostrarTipoCliente().then(function (data) {
                vm.TipoClientesTable = data.GetTipoClienteListResult;
            });
        }


        function ListaPeriodos() {
            reportesVariosFactory.mostrarPeriodo().then(function (data) {
                vm.PeriodosTable = data.GetPeriodosRepVarListResult;
                PeriodosTodos = data.GetPeriodosRepVarListResult;
            });
        }



        function crearObjParametros() {
            //@clv_reporte=4 --Desconectados Temporales
            if ((reporteSeleccionado == 1) || (reporteSeleccionado == 4))//1 desconectados, 4  adelantados
            {
                objPrincipal.clv_reporte = 3;
            }
            else if ((reporteSeleccionado == 2) || (reporteSeleccionado == 10))//2 suspendidos, 10 por instalar
            {
                objPrincipal.clv_reporte = 2;
            } else if ((reporteSeleccionado == 3) || (reporteSeleccionado == 7))//3 al corriente, 7 por pagar,
            {
                objPrincipal.clv_reporte = 1;
            }
            else if (reporteSeleccionado == 5) {
                objPrincipal.clv_reporte = 4; //5 contrataciones principales --Clientes Principales con Status Contratado
                objParametros.conectado = 1;//valor predeterminado con este reporte, el resto en cero
            }
            else if (reporteSeleccionado == 8)          //8 instalaciones
            {
                objPrincipal.clv_reporte = 9;
                objParametros.Insta = 1;//valor predeterminado con este reporte, el resto en cero
            }
            else if (reporteSeleccionado == 9) {
                objPrincipal.clv_reporte = 10; //10 cancelaciones
                objParametros.baja = 1;//valor predeterminado con este reporte, el resto en cero
                objParametros.motcan
                //SE USA EL MOTIVO DE CANCELACION
            }
            else if (reporteSeleccionado == 11) {
                objPrincipal.clv_reporte = 13; //13 fuera de área
                objParametros.Fuera = 1;//valor predeterminado con este reporte, el resto en cero
            }
            else if (reporteSeleccionado == 6) {
                objPrincipal.clv_reporte = 4; //6 contrataciones
                objParametros.conectado = 1;//valor predeterminado con este reporte, el resto en cero
            }
            else if (reporteSeleccionado == 12) {
                objPrincipal.fecha_ini = String.Empty;//string null 
                objPrincipal.fecha_fin = String.Empty; // string null "0000-00-00";
            }

            objPrincipal.OrdenEjecutada = 2;
            objParametros.habilita = 0;
            objPrincipal.op = servicioSeleccionado;
            objPrincipal.Orden = vm.ordenRadio;

            if (objPrincipal.op == 3) // digital
            {
                objPrincipal.soloInternet = 0;
            } else if (objPrincipal.op == 2) //internet 
            {
                if (vm.soloInter == true) {
                objPrincipal.soloInternet = 1;
                }
                else {
                    objPrincipal.soloInternet = 0;
                }
            }
        }


        function status(id) {
            if (id == 1) //conect
            {
                if (objParametros.conectado == 1) {
                    objParametros.conectado = 0;
                } else { objParametros.conectado = 1; }
            }

            if (id == 2) //fuera
            {
                if (objParametros.Fuera == 1) {
                    objParametros.Fuera = 0;
                } else { objParametros.Fuera = 1; }

            }
            if (id == 3) //suspe
            {
                if (objParametros.Susp == 1) {
                    objParametros.Susp = 0;
                } else { objParametros.Susp = 1; }

            }
            if (id == 4)// instalado
            {
                if (objParametros.Insta == 1) {
                    objParametros.Insta = 0;
                } else { objParametros.Insta = 1; }

            }
            if (id == 5) //desconect
            {
                if (objParametros.Desconect == 1) {
                    objParametros.Desconect = 0;
                } else { objParametros.Desconect = 1; }
            }
            if (id == 6) //tempo
            {
                if (objParametros.DescTmp == 1) {
                    objParametros.DescTmp = 0;
                } else { objParametros.DescTmp = 1; }
            }

        }



        //----------- REPORTES EN PDF
        function muestraDistribuidores() {
            var Servicios = [];
            crearObjParametros();

            if (servicioSeleccionado == 3) {
                Servicios = ServiciosDigital;
            } else if (servicioSeleccionado == 2) {
                Servicios = ServiciosInternet;
            }

            if (banderas.banderaLocalidad == 1) { Localidades = []; }
            if (banderas.banderaColonia == 1) { Colonias = []; }

            if (banderas.banderaCalle == 1) { Calles = []; }


            crearXml(Servicios);
        }



        function crearXml(Servicios) {

            reportesVariosFactory.getXml(objPrincipal, objParametros, objRangoFechas, estatusCliente, Distribuidores, Plazas, Estados,
                Ciudades, Localidades, Colonias, Servicios, TipoClientes, Periodos, Calles).then(function (data) {

                    OtrosFiltrosXml = data.GetCreateXmlBeforeReportResult[0];// 
                    distribuidoresXML = data.GetCreateXmlBeforeReportResult[1]; // 
                    CompaniasXml = data.GetCreateXmlBeforeReportResult[2];//      
                    EstadosXml = data.GetCreateXmlBeforeReportResult[3];//        
                    CiudadesXml = data.GetCreateXmlBeforeReportResult[4];//        
                    LocalidadesXml = data.GetCreateXmlBeforeReportResult[5];//       
                    ColoniaXml = data.GetCreateXmlBeforeReportResult[6];//       
                    ServiciosXml = data.GetCreateXmlBeforeReportResult[7];//       
                    TipoClientesXml = data.GetCreateXmlBeforeReportResult[8];//       
                    PeriodosXml = data.GetCreateXmlBeforeReportResult[9];//     
                    CalleXml = data.GetCreateXmlBeforeReportResult[10];//       
                    localidadF = data.GetCreateXmlBeforeReportResult[11];//     
                    coloniaF = data.GetCreateXmlBeforeReportResult[12];//    
                    calleF = data.GetCreateXmlBeforeReportResult[13];//   

                    realizaReporte();
                });
        }




        function realizaReporte() {

            var elOrden = objPrincipal.Orden;
            var laBaja = objParametros.baja;
            var servSelec = servicioSeleccionado;

            reportesVariosFactory.creaReporte(reporteSeleccionado, servSelec, clv_usuario, elOrden, laBaja,
                OtrosFiltrosXml, distribuidoresXML, CompaniasXml, CiudadesXml, CalleXml,
                LocalidadesXml, ColoniaXml, ServiciosXml, PeriodosXml, TipoClientesXml, localidadF, coloniaF, calleF).then(function (data) {

                    var urlReporte = "";

                    if (reporteSeleccionado == 13)  // 13 ciudad
                    {
                        if (elOrden == 1) {
                            if (laBaja == 0)//cualquiera SIN bajas
                            {
                                urlReporte = data.GetReporteDig_12Result; // url = "ReportesVarios/Reporte_Digital_12"; 
                            }
                            else if (laBaja == 1) //cualquiera CON bajas
                            {
                                urlReporte = data.GetReporteDig_13Result; // url = "ReportesVarios/Reporte_Digital_13"; 
                            }
                        }
                        else if (elOrden == 2) {
                            if (laBaja == 0)//cualquiera SIN bajas
                            {
                                urlReporte = data.GetReporteDig_15Result; // url = "ReportesVarios/Reporte_Digital_15";
                            }
                            if (laBaja == 1)  //cualquiera CON bajas
                            {
                                urlReporte = data.GetReporteDig_14Result; // url = "ReportesVarios/Reporte_Digital_14"; 
                            }
                        }
                    }
                    else if (reporteSeleccionado == 14) // 14 resumen por colonia y status
                    {
                        urlReporte = data.GetReporteDig_5Result;// url = "ReportesVarios/Reporte_Digital_5";
                    }
                    else if ((reporteSeleccionado != 13) && (reporteSeleccionado != 14)) {
                        if (servSelec == 3) // ---------------- S E R V I C I O   D I G I T A L
                        {   //Contrato | Colonia y Calle; Orden = 1 | 2              
                            if ((reporteSeleccionado == 1) || (reporteSeleccionado == 2) || (reporteSeleccionado == 7)) //1 desconectados, 2 suspendidos, 7 por pagar 
                            {
                                urlReporte = data.GetReporteDig_1Result;// url = "ReportesVarios/Reporte_Digital_1"; 
                            }
                            else if (reporteSeleccionado == 12)// 12 paquetes de cortesía
                            {
                                urlReporte = data.GetReporteDig_4Result; //url = "ReportesVarios/Reporte_Digital_4";
                            }
                            if (elOrden == 1) //Contrato
                            {
                                if ((reporteSeleccionado == 3) || (reporteSeleccionado == 10))//3 al corriente, 10 por instalar
                                {
                                    urlReporte = data.GetReporteDig_2Result; //url = "ReportesVarios/Reporte_Digital_2"; 
                                }
                                else if (reporteSeleccionado == 4) // 4 adelantados
                                {
                                    urlReporte = data.GetReporteDig_3Result;//url = "ReportesVarios/Reporte_Digital_3"; 
                                }

                                else if (reporteSeleccionado == 9) //9 cancelaciones
                                {

                                    urlReporte = data.GetReporteDig_6Result; //url = "ReportesVarios/Reporte_Digital_6"; 
                                }
                                else if ((reporteSeleccionado == 5) || (reporteSeleccionado == 8) || (reporteSeleccionado == 11))//5 contrataciones principales8 instalaciones, 11 fueras de área
                                {

                                    urlReporte = data.GetReporteDig_16Result; //url = "ReportesVarios/Reporte_Digital_16"; 
                                }

                                else if (reporteSeleccionado == 6)// 6 contrataciones
                                {
                                    urlReporte = data.GetReporteDig_7Result; //url = "ReportesVarios/Reporte_Digital_7"; 
                                }
                            }
                            else if (elOrden == 2) // Colonia y calle
                            {
                                if ((reporteSeleccionado == 3) || (reporteSeleccionado == 10))//3 al corriente, 10 por instalar
                                {
                                    urlReporte = data.GetReporteDig_8Result; //url = "ReportesVarios/Reporte_Digital_8"; 
                                }
                                else if (reporteSeleccionado == 4)// 4 adelantados
                                {
                                    urlReporte = data.GetReporteDig_9Result; //url = "ReportesVarios/Reporte_Digital_9"; 
                                }
                                else if ((reporteSeleccionado == 5) || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11))//5 contrataciones principales, 8 instalaciones, 9 cancelaciones, 11 fueras de área
                                {
                                    urlReporte = data.GetReporteDig_11Result; //url = "ReportesVarios/Reporte_Digital_11"; 
                                }
                                else if (reporteSeleccionado == 6)// 6 contrataciones
                                {
                                    urlReporte = data.GetReporteDig_10Result;//url = "ReportesVarios/Reporte_Digital_10"; 
                                }
                            }
                        }
                        else if (servSelec == 2)// ---------------- S E R V I C I O   I N T E R N E T
                        {
                            //Contrato | Colonia y Calle; Orden = 1 | 2                   
                            if ((reporteSeleccionado == 1) || (reporteSeleccionado == 2)) //1 desconectados, 2 suspendidos
                            {
                                urlReporte = data.GetReporteInt_1Result;//url = "ReportesVarios/Reporte_Internet_1"; 
                            }
                            else if (reporteSeleccionado == 7)// 7 por pagar
                            {
                                urlReporte = data.GetReporteInt_2Result; //url = "ReportesVarios/Reporte_Internet_2"; 
                            }
                            else if (reporteSeleccionado == 12)// 12 paquetes de cortesía
                            {
                                urlReporte = data.GetReporteInt_7Result; //url = "ReportesVarios/Reporte_Internet_7"; 
                            }
                            if (elOrden == 1) //Contrato
                            {
                                if ((reporteSeleccionado == 3) || (reporteSeleccionado == 4) || (reporteSeleccionado == 10))//3 al corriente, 4 adelantados, 10 por instalar
                                {
                                    urlReporte = data.GetReporteInt_3Result;//url = "ReportesVarios/Reporte_Internet_3"; 
                                }
                                else if ((reporteSeleccionado == 6) || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11))//6 contrataciones, 8 instalaciones, 9 cancelaciones, 11 fueras de área
                                {
                                    urlReporte = data.GetReporteInt_5Result; //url = "ReportesVarios/Reporte_Internet_5"; 
                                }
                            }
                            else if (elOrden == 2) //Colonia y calle
                            {
                                if ((reporteSeleccionado == 3) || (reporteSeleccionado == 4) || (reporteSeleccionado == 10))//3 al corriente, 4 adelantados, 10 por instalar
                                {
                                    urlReporte = data.GetReporteInt_4Result; //url = "ReportesVarios/Reporte_Internet_4"; 
                                }
                                else if ((reporteSeleccionado == 6) || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11))//6 contrataciones, 8 instalaciones, 9 cancelaciones, 11 fueras de área
                                {
                                    urlReporte = data.GetReporteInt_6Result; //url = "ReportesVarios/Reporte_Internet_6"; 
                                }
                            }
                        }
                    }

                    vm.reporteUrl = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/reportes/' + urlReporte);
                });
        }





        vm.ExisteDistribuidor = ExisteDistribuidor;
        vm.distribuidorPadre = distribuidorPadre;
        vm.distribuidorHijo = distribuidorHijo;
        vm.AddDistribuidor = AddDistribuidor;
        vm.ListaDistribuidores = ListaDistribuidores;
        vm.ExistePlaza = ExistePlaza;
        vm.plazaPadre = plazaPadre;
        vm.plazaHijo = plazaHijo;
        vm.AddPlazas = AddPlazas;
        vm.ExisteEstado = ExisteEstado;
        vm.estadoPadre = estadoPadre;
        vm.estadoHijo = estadoHijo;
        vm.AddEstados = AddEstados;
        vm.ExisteCiudad = ExisteCiudad;
        vm.ciudadPadre = ciudadPadre;
        vm.ciudadHijo = ciudadHijo;
        vm.AddCiudades = AddCiudades;
        vm.ExisteLocalidad = ExisteLocalidad;
        vm.localidadPadre = localidadPadre;
        vm.localidadHijo = localidadHijo;
        vm.AddLocalidades = AddLocalidades;
        vm.ExisteColonia = ExisteColonia;
        vm.coloniaPadre = coloniaPadre;
        vm.coloniaHijo = coloniaHijo;
        vm.AddColonias = AddColonias;
        vm.ExisteServicioInternet = ExisteServicioInternet;
        vm.serviciosInternetPadre = serviciosInternetPadre;
        vm.serviciosInternetHijo = serviciosInternetHijo;
        vm.AddServiciosInternet = AddServiciosInternet;
        vm.ExisteServicioDigital = ServiciosDigital;
        vm.serviciosDigitalPadre = serviciosDigitalPadre;
        vm.serviciosDigitalHijo = serviciosDigitalHijo;
        vm.AddServiciosDigital = AddServiciosDigital;
        vm.ExisteTipoClientes = ExisteTipoClientes;
        vm.tipoClientesPadre = tipoClientesPadre;
        vm.tipoClientesHijo = tipoClientesHijo;
        vm.AddTipoClientes = AddTipoClientes;
        vm.ExistePeriodo = ExistePeriodo;
        vm.periodoPadre = periodoPadre;
        vm.periodoHijo = periodoHijo;
        vm.AddPeriodos = AddPeriodos;
        vm.ExisteCalle = ExisteCalle;
        vm.callePadre = callePadre;
        vm.calleHijo = calleHijo;
        vm.AddCalles = AddCalles;
        vm.AddToArray = AddToArray;
        vm.DeleteFromArray = DeleteFromArray;
        vm.seleccionarTodo = seleccionarTodo;

        vm.cleanArray = cleanArray;
        vm.showOpcion = showOpcion;
        vm.changeBgColor = changeBgColor;
        vm.soloInternet_esconde = true;

        showOpcion();

        var clv_usuario = $localStorage.currentUser.idUsuario; //siste,
        var pla = 0, est = 0, coloni = 0, sinter = 0, sdig = 0, tipo = 0, peri = 0;
        var servicioSeleccionado = 3;
        var reporteSeleccionado = 1; //value del reporte seleccionado
        var principales = false; //se muestra para digital

        var objPrincipal = {}, objRangoFechas = {}, estatusCliente = {}, objParametros = {};
        var Distribuidores = [];
        var Plazas = [];
        var Estados = [];
        var Ciudades = [];
        var Localidades = [];
        var Colonias = [];
        var Calles = [];
        var Periodos = [];
        var ServiciosInternet = [];
        var ServiciosDigital = [];
        var TipoClientes = [];
        var Motcan = [];
        var Motcan2 = []; //Modal Seleccion de Status de cliente

        var PlazasTodos = [];
        var EstadosTodos = [];
        var CiudadesTodos = [];
        var LocalidadesTodos = [];
        var ColoniasTodos = [];
        var CallesTodos = [];
        var PeriodosTodos = [];
        var ServiciosInternetTodos = [];
        var ServiciosDigitalTodos = [];
        var TipoClientesTodos = [];

        var buscaOnovar = 0;
        vm.botonRegresar = true; //oculta
        vm.divMotivoCancelacion1 = true;

        var banderas = {};
        banderas.clv_usuario = clv_usuario;
        banderas.banderaDistribuidor = 0;
        banderas.banderaCiudad = 0;
        banderas.banderaLocalidad = 0;
        banderas.banderaColonia = 0;
        banderas.banderaCalle = 0;
        banderas.banderaTodoSeleccionado = 0;

        vm.fechaInicial = new Date();
        vm.fechaFinal = new Date();

        vm.motcan1 = 0;
        vm.motcan2 = 0;

        vm.anioC = {
            value: 2010
        };
        vm.anioC2 = {
            value: 2010
        };

        vm.meses = [{ name: 'Enero', value: '1' },
        { name: 'Febrero', value: '2' },
        { name: 'Marzo', value: '3' },
        { name: 'Abril', value: '4' },
        { name: 'Mayo', value: '5' },
        { name: 'Junio', value: '6' },
        { name: 'Julio', value: '7' },
        { name: 'Agosto', value: '8' },
        { name: 'Septiembre', value: '9' },
        { name: 'Octubre', value: '10' },
        { name: 'Noviembre', value: '11' },
        { name: 'Diciembre', value: '12' }
        ];

        vm.ultimoMes = vm.meses[0];
        vm.mesQueAdeuda = vm.meses[0];

        vm.menores = [{ name: 'Menor o igual', value: '1' }, { name: 'Igual', value: '2' }];
        vm.menoresModel = vm.menores[0].value;
        vm.divMotivoCancelacion1 = true;

        vm.myButton1 = 'btn-info active';
        reporteSeleccionado = 1;
        vm.myButton2 = 'btn-default';
        vm.myButton3 = 'btn-default';
        vm.myButton4 = 'btn-default';
        vm.myButton5 = 'btn-default';
        vm.myButton6 = 'btn-default';
        vm.myButton7 = 'btn-default';
        vm.myButton8 = 'btn-default';
        vm.myButton9 = 'btn-default';
        vm.myButton10 = 'btn-default';
        vm.myButton11 = 'btn-default';
        vm.myButton12 = 'btn-default';
        vm.myButton13 = 'btn-default';
        vm.myButton14 = 'btn-default';

        vm.inicializaCheckbox = inicializaCheckbox;
        vm.statusCancel = statusCancel;
        vm.elMenu = elMenu
        vm.filtroDistribuidores = filtroDistribuidores;
        vm.showplazas = showplazas;
        vm.showEstados = showEstados;
        vm.showCiudades = showCiudades;
        vm.showLocalidades = showLocalidades;
        vm.showColonias = showColonias;
        vm.showServiciosDI = showServiciosDI;
        vm.showTipoClientes = showTipoClientes;
        vm.showPeriodos = showPeriodos;
        vm.showRangosFecha = showRangosFecha;
        vm.showMesAnio = showMesAnio;
        vm.showCalles = showCalles;
        vm.showStatus = showStatus;
        vm.modalStatus = modalStatus;
        vm.divMotivoCancelacion2 = true; //se oculta
        vm.buscaOnoFunction = buscaOnoFunction;
        vm.filtroStatus = filtroStatus;
        vm.showReporte = showReporte;
        vm.ListaPlazas = ListaPlazas;
        vm.ListaEstados = ListaEstados;
        vm.ListaCiudades = ListaCiudades;
        vm.ListaLocalidades = ListaLocalidades;
        vm.ListaColonias = ListaColonias;
        vm.ListaCalles = ListaCalles;
        vm.ListaServiciosInternet = ListaServiciosInternet;
        vm.ListaServiciosDigital = ListaServiciosDigital;
        vm.ListaTipoClientes = ListaTipoClientes;
        vm.ListaPeriodos = ListaPlazas;
        vm.crearObjParametros = crearObjParametros;
        vm.status = status;
        vm.muestraDistribuidores = muestraDistribuidores;

        var OtrosFiltrosXml = ""; var distribuidoresXML = ""; var CompaniasXml = ""; var EstadosXml = "";
        var CiudadesXml = ""; var LocalidadesXml = ""; var ColoniaXml = ""; var ServiciosXml = "";
        var TipoClientesXml = ""; var PeriodosXml = "";
        var CalleXml = ""; var localidadF = ""; var coloniaF = ""; var calleF = "";

        vm.crearXml = crearXml;
        vm.realizaReporte = realizaReporte;

    });
