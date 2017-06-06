'use strict';
angular.module('softvApp').controller('ReportesPendientesCtrl', ReportesPendientesCtrl)
    .filter('myStrictFilter', function ($filter) {
        return function (input, predicate) {
            return $filter('filter')(input, predicate, true);
        }
    })
    .filter('unique', function () {
        return function (arr, field) {
            var o = {}, i, l = arr.length, r = [];
            for (i = 0; i < l; i += 1) {
                o[arr[i][field]] = arr[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
            return r;
        };
    });

function ReportesPendientesCtrl($uibModal, ngNotify, inMenu, pagosMaestrosFactory, $timeout) {


    function buscaContrato(opcion) {
        var parametros;
        if (opcion == 2) {
            if (vm.Ticket == undefined || vm.Ticket == '') {
                ngNotify.set('Seleccione un ticket.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': vm.Ticket,
                    'ContratoMaestro': 0,
                    'Cliente': '',
                    'Op': opcion,
                    'ContratoCompania': 0
                };
                pagosMaestrosFactory.GetBuscaFacturasMaestroPendientesList(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroPendientesListResult;
                });
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Status', 'Contrato', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
            }
        } else if (opcion == 3) {
            if (vm.ContratoMaestro == undefined || vm.ContratoMaestro == '') {
                ngNotify.set('Seleccione un contrato.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': vm.ContratoMaestro,
                    'Cliente': '',
                    'Op': opcion,
                    'ContratoCompania': 0
                };
                pagosMaestrosFactory.GetBuscaFacturasMaestroPendientesList(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroPendientesListResult;
                    console.log(vm.pagos);
                });
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Status', 'Contrato', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
            }
        } else if (opcion == 4) {
            if (vm.Cliente == undefined || vm.Cliente == '') {
                ngNotify.set('Seleccione un cliente.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 0,
                    'Cliente': vm.Cliente,
                    'Op': opcion,
                    'ContratoCompania': 0
                };
                pagosMaestrosFactory.GetBuscaFacturasMaestroPendientesList(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroPendientesListResult;
                });
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Status', 'Contrato', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
            }
        } else if (opcion == 1) {
            if (vm.Fecha == undefined || vm.Fecha == '') {
                ngNotify.set('Seleccione una fecha de facturación.', 'error');
            } else {
                vm.auxFechaInicio = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
                parametros = {
                    'Fecha': vm.auxFechaInicio,
                    'Ticket': '',
                    'ContratoMaestro': 0,
                    'Cliente': '',
                    'Op': opcion,
                    'ContratoCompania': 0
                };
                pagosMaestrosFactory.GetBuscaFacturasMaestroPendientesList(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroPendientesListResult;
                });
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Status', 'Contrato', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
            }
        } else if (opcion == 7) {
            if (vm.ContratoCliente == undefined || vm.Fecha == '') {
                ngNotify.set('Seleccione un contrato de cliente.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 15,
                    'Cliente': '',
                    'Op': opcion,
                    'ContratoCompania': vm.ContratoCliente
                };
                pagosMaestrosFactory.GetBuscaFacturasMaestroPendientesList(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroPendientesListResult;
                });
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Status', 'Contrato', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
            }
        }
        vm.Ticket = '';
        vm.ContratoMaestro = null;
        vm.Cliente = '';
        $('.buscarContrato').collapse('hide');
    }

    function crearTodoAsCsv() {
        $timeout(function () {
            for (var i = 0; i < vm.pagos.length; i++) {
                delete vm.pagos[i].BaseIdUser;
                delete vm.pagos[i].BaseRemoteIp;
                delete vm.pagos[i].$$hashKey;
            }

            initArray();

            for (var i = 0; i < vm.pagos.length; i++) {
                vm.arrayReporte.push(vm.pagos[i]);
            }

            angular.element('#csvDos').triggerHandler('click');
        });
    }

    function initArray() {
        vm.arrayReporte = [];
        vm.arrayReporte = [{
            'ContratoMaestro': 'Contrato Maestro',
            'Ticket': 'Ticket',
            'Cliente': 'Cliente',
            'Tipo': 'Tipo',
            'FechaFacturacion': 'Fecha de Facturacion',
            'FechaVencimiento': 'Fecha de Vencimiento',
            'ImporteFactura': 'Importe de la Factura',
            'PagoInicial': 'Pago Inicial',
            'ACuantosPagos': 'Pagos',
            'TotalAbonado': 'Total Abonado',
            'pendiente': 'pendiente',
            'Status': 'Status',
            'FechaPago': 'Fecha de Pago',
            'ImporteFacCliente': 'Importe de Facactura Cliente',
            'MontoAbono': 'Monto Abono',
            'PorPagar': 'Por Pagar',
            'Saldada2': 'Saldada'
        }];
    }

    function createPdfTodo() {
        var rows = [[0, 0, 0, 0, 0, 0,]];
        var r = 1;
        var c = 0;
        var ro = 0;
        ro = vm.pagos.length;
        var cols = 21;
        var columns = ['Contrato Maestro', 'Ticket', 'Cliente', 'Tipo', 'Fecha de Facturacion', 'Fecha de Vencimiento', 'Importe Factura', 'Pago Inicial', 'Pagos', 'Total Abonado', 'Pendiente', 'Status', 'Contrato', 'Importe de la Fac. Cliente', 'Monto del Abono', 'Por Pagar', 'Saldada'];
        for (var i = r; i < ro; i++) {
            rows.push([]);
        }
        for (var i = 0; i < ro; i++) {
            rows[i][0] = vm.pagos[i].ContratoMaestro;
            rows[i][1] = vm.pagos[i].Ticket;
            rows[i][2] = vm.pagos[i].Cliente;
            rows[i][3] = vm.pagos[i].Tipo;
            rows[i][4] = vm.pagos[i].FechaFacturacion;
            rows[i][5] = vm.pagos[i].FechaVencimiento;
            rows[i][6] = vm.pagos[i].ImporteFactura;
            rows[i][7] = vm.pagos[i].PagoInicial;
            rows[i][8] = vm.pagos[i].ACuantosPagos;
            rows[i][9] = vm.pagos[i].TotalAbonado;
            rows[i][10] = vm.pagos[i].pendiente;
            rows[i][11] = vm.pagos[i].Status;
            rows[i][12] = vm.pagos[i].ImporteFacCliente;
            rows[i][13] = vm.pagos[i].Contrato;
            rows[i][14] = vm.pagos[i].MontoAbono;
            rows[i][15] = vm.pagos[i].PorPagar;
            rows[i][16] = vm.pagos[i].Saldada2;
        }
        var doc = new jsPDF({
            orientation: 'landscape',
            format: 'A4'
        });
        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
            var str = "Page " + data.pageCount;
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(9);
            doc.text(doc.internal.pageSize.width - 28, doc.internal.pageSize.height - 8, str);
        };
        // doc.addImage(img, 'jpeg', 5, 5, 40, 15);
        doc.setFontSize(14);
        doc.setFontType("bold");
        var fontSize = doc.internal.getFontSize(); // Get current font size
        var pageWidth = doc.internal.pageSize.width;
        var txtWidth = doc.getStringUnitWidth(reportHeaderPdf) * fontSize / doc.internal.scaleFactor;
        var x = (pageWidth - txtWidth) / 2;    // Calculate text's x coordinate    
        doc.text(reportHeaderPdf, x, 14);   // Posición text at x,y
        var laFechaHoy = '07/05/2017';
        doc.setFontSize(11);
        doc.setFontType("normal");
        doc.text(doc.internal.pageSize.width - 45, 20, laFechaHoy);
        doc.setPage(1);
        jsPDF.autoTableSetDefaults({
            headerStyles:
            {
                fontSize: 8.2
            },
            bodyStyles: {
                fontSize: 7.4
            }
        });
        doc.autoTable(columns, rows, {
            startY: 27,
            theme: 'plain',
            styles: {
                overflow: 'linebreak',
            },
            columnStyles: {
                17: { columnWidth: 98 },
            },
            margin: { top: 10, right: 10, bottom: 16, left: 10 },
            addPageContent: pageContent
        });
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
        doc.save(vm.filename + '.pdf');
    }

    function getImageDataURL() {
        var url = document.getElementById("pdflogoimage").src;
        var data, canvas, ctx;
        img.onload = function () {
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            data = canvas.toDataURL();
        }
        img.src = url;
    }

    function enterContrato(event, opcion) {
        if (event.which === 13) {
            buscaContrato(opcion);
        }
    }

    // this.$onInit = function () {
    //     getImageDataURL();
    // }

    var vm = this;
    vm.buscaContrato = buscaContrato;
    vm.crearTodoAsCsv = crearTodoAsCsv;
    vm.createPdfTodo = createPdfTodo;
    vm.filename = 'Reporte_de_pagos_pendientes';
    var reportHeaderPdf = "Reporte de Pagos Pendientes";
    vm.csvDosHide = true;
    var img = new Image();
    img.crossOrigin = "";
    vm.enterContrato = enterContrato;
}