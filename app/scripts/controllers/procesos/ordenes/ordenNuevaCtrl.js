(function () {
    'use strict';

    angular
        .module('softvApp')
        .controller('OrdenNuevaCtrl', OrdenNuevaCtrl);

    OrdenNuevaCtrl.inject = ['$state', 'ngNotify', '$stateParams', '$uibModal', 'ordenesFactory', '$rootScope', '$filter'];
    function OrdenNuevaCtrl($state, ngNotify, $stateParams, $uibModal, ordenesFactory, $rootScope, $filter) {
        var vm = this;
        vm.showDatosCliente = true;
        vm.agregar = agregar;
        vm.buscarContrato = buscarContrato;
        vm.buscarCliente = buscarCliente;
        vm.status = 'P';
        vm.fecha = new Date();
        vm.observaciones = '';
        vm.detalleTrabajo = detalleTrabajo;


        function agregar() {
            if (vm.contratoBueno == undefined || vm.contratoBueno == '') {
                ngNotify.set('Seleccione un cliente válido.', 'error')
            } else {
                var fecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
                var orden = {
                    contrato: vm.contratoBueno,
                    fecha: fecha,
                    observaciones: vm.observaciones

                };
                ordenesFactory.addOrdenServicio(orden).then(function (data) {
                    vm.clv_orden = data.AddOrdSerResult;
                    var items = {
                        contrato: vm.contratoBueno,
                        clv_orden: vm.clv_orden
                    };
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/procesos/ModalAgregarServicio.html',
                        controller: 'ModalAgregarServicioCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            items: function () {
                                return items;
                            }
                        }
                    });
                });

            }
        }

        function buscarContrato(event) {
            vm.clv_orden = '';
            if (vm.contrato == null || vm.contrato == '' || vm.contrato == undefined) {
                ngNotify.set('Coloque un contrato válido', 'error');
                return;
            }
            if (!vm.contrato.includes('-')) {
                ngNotify.set('Coloque un contrato válido', 'error');
                return;
            }

            ordenesFactory.getContratoReal(vm.contrato).then(function (data) {
                if (data.GetuspBuscaContratoSeparado2ListResult.length > 0) {
                    vm.contratoBueno = data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno;
                    datosContrato(data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno);
                } else {
                    vm.servicios = '';
                    vm.datosCli = '';
                    new PNotify({
                        title: 'Sin Resultados',
                        type: 'error',
                        text: 'No se encontro resultados con ese contrato.',
                        hide: true
                    });
                    vm.contratoBueno = '';
                    vm.clv_orden = '';
                }
            });
        }

        $rootScope.$on('cliente_select', function (e, contrato) {
            vm.contrato = contrato.CONTRATO;
            vm.contratoBueno = contrato.ContratoBueno;
            datosContrato(contrato.ContratoBueno);
        });

        $rootScope.$on('detalle_orden', function (e, detalle) {
            vm.clv_detalle = detalle;
        });

        $rootScope.$on('actualiza_tablaServicios', function () {
            actualizarTablaServicios();
        });

        function actualizarTablaServicios() {
            ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
                vm.trabajosTabla = data.GetBUSCADetOrdSerListResult;
            });
        }

        function datosContrato(contrato) {
            ordenesFactory.serviciosCliente(contrato).then(function (data) {
                vm.servicios = data.GetDameSerDelCliFacListResult;
            });
            ordenesFactory.buscarCliPorContrato(contrato).then(function (data) {
                vm.datosCli = data.GetDeepBUSCLIPORCONTRATO_OrdSerResult;
            });
        }

        function buscarCliente() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/procesos/buscarCliente.html',
                controller: 'BuscarNuevoCtrl',
                controllerAs: '$ctrl',
                backdrop: 'static',
                keyboard: false,
                size: 'lg'
            });
        }

        function detalleTrabajo(trabajo) {
            switch (trabajo) {
                case 'Domicilio':
                    ordenesFactory.consultaCambioDomicilio(vm.clv_detalle, vm.clv_orden, vm.contratoBueno).then(function (data) {
                        var items = {
                            clv_detalle_orden: vm.clv_detalle,
                            clv_orden: vm.clv_orden,
                            contrato: vm.contratoBueno,
                            isUpdate: true,
                            datosCamdo: data.GetDeepCAMDOResult
                        };
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'views/facturacion/modalCambioDomicilio.html',
                            controller: 'CambioDomicilioOrdenesCtrl',
                            controllerAs: 'ctrl',
                            backdrop: 'static',
                            keyboard: false,
                            size: 'md',
                            resolve: {
                                items: function () {
                                    return items;
                                }
                            }
                        });
                    });
                    break;

                default:
                    break;
            }
        }
    }
})();
