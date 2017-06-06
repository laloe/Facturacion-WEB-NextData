'use strict';
angular.module('softvApp')
    .controller('reportesCortesCorporativaCtrl', function ($state, ngNotify, $localStorage, reportesCortesCorporativaFactory, globalService, $sce) // servicio
    {
        var vm = this;

        this.$onInit = function () {

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
                reportesCortesCorporativaFactory.mostrarDistribuidorByUsuario(clv_usuario).then(function (data) {
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

            if (banderas.banderaDistribuidor == 1) //si es 1, está seleccionado, volver a NO SELECCIONADO
            {
                vm.distriTodo = false;  // si bandera es 1, y selecciona un hijo, eliminar a ese hijo
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
            reportesCortesCorporativaFactory.mostrarDistribuidorByUsuario(clv_usuario).then(function (data) {
                vm.DistribuidoresTable = data.GetDistribuidorByUsuarioResult;
                DistribuidoresTodos = data.GetDistribuidorByUsuarioResult;
            });
        }
        //--------------- Sucursales ---------------------------------

        function ExisteSucursal(id) {
            var result = $.grep(Sucursales, function (obj) { return obj.Clv_Sucursal == id; });
            if (result.length == 0) {
                return false;
            } else {
                return true;
            }
        }

        function sucursalPadre() {

            if (banderas.banderaSucursal == 1) {
                banderas.banderaSucursal = 0;
                Sucursales = [];

                for (var i = 0; i < vm.SucursalesTable.length; i++) {
                    vm.SucursalesTable[i].selected = false;
                }
            }
            else if (banderas.banderaSucursal == 0) {
                Sucursales = [];

                reportesCortesCorporativaFactory.mostrarSucursalByUsuario(clv_usuario).then(function (data) {
                    SucursalesTodos = data.GetSucursalByUsuarioResult;
                    var i;
                    for (i = 0; i < SucursalesTodos.length; i++) {
                        vm.SucursalesTable[i].selected = true;
                        AddToArray(Sucursales, SucursalesTodos[i]);
                    }
                });
                banderas.banderaSucursal = 1;
            }
        }



        function sucursalHijo(obj) {

            if (banderas.banderaSucursal == 1) {
                vm.sucurTodo = false;
                if (ExisteSucursal(obj.Clv_Sucursal)) {
                    DeleteFromArray(Sucursales, 'Clv_Sucursal', obj.Clv_Sucursal);
                }
                banderas.banderaSucursal = 0;
            }
            else {
                AddSucursal(obj);
            }
        }


        function AddSucursal(obj) {

            if (ExisteSucursal(obj.Clv_Sucursal)) {
                DeleteFromArray(Sucursales, 'Clv_Sucursal', obj.Clv_Sucursal)
            }
            else {
                AddToArray(Sucursales, obj);
            }
        }

        var SucursalesTodos = [];
        function ListaSucursales() {
            reportesCortesCorporativaFactory.mostrarSucursalByUsuario(clv_usuario).then(function (data) {
                vm.SucursalesTable = data.GetSucursalByUsuarioResult;
                SucursalesTodos = data.GetSucursalByUsuarioResult;
            });
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



        function cleanArray() {
            objPrincipal = {};
            for (var i = 0; i < vm.DistribuidoresTable.length; i++) {
                vm.DistribuidoresTable[i].selected = false;
            }

            Distribuidores = []; Sucursales = [];
            DistribuidoresTodos = []; SucursalesTodos = [];

            clv_usuario = $localStorage.currentUser.idUsuario; //siste
            banderas = {};
            banderas.clv_usuario = clv_usuario;
            banderas.banderaDistribuidor = 0;
            banderas.banderaSucursal = 0;
            vm.fechaInicial = new Date();
            vm.fechaFinal = new Date();
            vm.search = null;
            vm.inicializaCheckbox();
        }

        function inicializaCheckbox() {
            vm.distriTodo = false;
            vm.sucurTodo = false;
            vm.resumen = false;
        }



        function showOpcion() {

            vm.search = null; //limpia barra búsqueda
            vm.pdistribuidores = true;
            vm.psucursales = true;
            vm.preporte = true;
        }


        function elMenu() {
            vm.myButton1 = 'btn-default';
            vm.myButton2 = 'btn-default';
            vm.myButton3 = 'btn-default';
            vm.myButton4 = 'btn-default';
            vm.myButton5 = 'btn-default';
            vm.myButton6 = 'btn-default';
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
                if (reporteSeleccionado == 1 || reporteSeleccionado == 2) {
                    showReporte();
                }
                else if (reporteSeleccionado == 3){
                    showSucursales();
                }
            }
        }


        function filtroSucursales() {

            if (Sucursales.length == 0) {
                ngNotify.set('Seleccione al menos una sucursal', {
                    type: 'error'
                });
            } else {
                showReporte();
            }
        }

        // 2.- SUCURSALES
        function showSucursales() {
            vm.search = "";
            vm.pdistribuidores = true;
            vm.psucursales = false;
            ListaSucursales();
        }

        // 3.- REPORTE    
        function showReporte() {

            vm.search = "";
            vm.preporte = false;
            vm.pdistribuidores = true;
            vm.psucursales = true;

            crearObjParametros();
            crearXml();
        }






        function crearObjParametros() {

            if (reporteSeleccionado >= 1 && reporteSeleccionado <= 3)//1 general, 3 resumen sucursales
            {

                var D1 = vm.fechaInicial;
                var month = D1.getUTCMonth() + 1;
                var day = D1.getUTCDate();
                var year = D1.getUTCFullYear();
                var fechaInicialYMD = year + '/' + month + '/' + day;

                var D2 = vm.fechaFinal;
                var month = D2.getUTCMonth() + 1;
                var day = D2.getUTCDate();
                var year = D2.getUTCFullYear();
                var fechaFinalYMD = year + '/' + month + '/' + day;

                objPrincipal.fecha_ini = fechaInicialYMD;
                objPrincipal.fecha_fin = fechaFinalYMD;
                //objPrincipal.clv_reporte = 2;

                if (vm.status == true) {
                    objPrincipal.Op_ordena = 2;
                }
                else {
                    objPrincipal.Op_ordena = 1;
                }

                if (vm.resumen == true) {
                    objPrincipal.Resumen = 1;
                }
                else {
                    objPrincipal.Resumen = 0;
                }

            }

        }



        function crearXml() {

            reportesCortesCorporativaFactory.getXml(reporteSeleccionado, objPrincipal, Distribuidores, Sucursales).then(function (data) {

                OtrosFiltrosXml = data.GetCreateXmlBeforeReporteCorporativaResult[0];
                distribuidoresXML = data.GetCreateXmlBeforeReporteCorporativaResult[1];
                sucursalesXml = data.GetCreateXmlBeforeReporteCorporativaResult[2];

                realizaReporte();

            });
        }



        function realizaReporte() {

            reportesCortesCorporativaFactory.creaReporte(clv_usuario, reporteSeleccionado, OtrosFiltrosXml, distribuidoresXML, sucursalesXml).then(function (data) {
            
                var urlReporte = '';

                if (reporteSeleccionado == 1) {
                    urlReporte = data.GetReporte_GeneralResult;
                }
                else if (reporteSeleccionado == 2){

                    urlReporte = data.GetReporte_GeneralDeVentasResult;
                }
                else if (reporteSeleccionado == 3){
                    urlReporte = data.GetReporte_ResumenIngresoSucursalResult;
                }

                vm.reporteUrl = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/reportes/' + urlReporte);
            });
        }


        showOpcion();

        vm.ExisteDistribuidor = ExisteDistribuidor;
        vm.distribuidorPadre = distribuidorPadre;
        vm.distribuidorHijo = distribuidorHijo;
        vm.AddDistribuidor = AddDistribuidor;
        vm.ListaDistribuidores = ListaDistribuidores;

        vm.ExisteSucursal = ExisteSucursal;
        vm.sucursalPadre = sucursalPadre;
        vm.sucursalHijo = sucursalHijo;
        vm.AddSucursal = AddSucursal;
        vm.ListaSucursales = ListaSucursales;

        vm.AddToArray = AddToArray;
        vm.DeleteFromArray = DeleteFromArray;

        vm.cleanArray = cleanArray;
        vm.showOpcion = showOpcion;
        vm.changeBgColor = changeBgColor;

        var OtrosFiltrosXml = "";
        var distribuidoresXML = "";
        var sucursalesXml = "";
        var reporteSeleccionado = 1; //reporte seleccionado 
        var objPrincipal = {};
        var Distribuidores = [];
        var Sucursales = [];
        var clv_usuario = $localStorage.currentUser.idUsuario;
        var banderas = {};
        banderas.clv_usuario = clv_usuario;
        banderas.banderaDistribuidor = 0;
        banderas.banderaSucursal = 0;

        vm.fechaInicial = new Date();
        vm.fechaFinal = new Date();

        vm.opcReporteArray = [
            { name: 'Resumen', value: '1' }
        ];
        vm.opcReporte = vm.opcReporteArray[0];

        vm.myButton1 = 'btn-info active';
        reporteSeleccionado = 1;
        vm.myButton2 = 'btn-default';
        vm.myButton3 = 'btn-default';
        vm.myButton4 = 'btn-default';
        vm.myButton5 = 'btn-default';
        vm.myButton6 = 'btn-default';

        vm.inicializaCheckbox = inicializaCheckbox;
        vm.elMenu = elMenu;
        vm.filtroDistribuidores = filtroDistribuidores;
        vm.filtroSucursales = filtroSucursales;
        vm.showReporte = showReporte;
        vm.crearObjParametros = crearObjParametros;
        vm.status = status;
        vm.crearXml = crearXml;

    });
