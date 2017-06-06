'use strict';
angular.module('softvApp').controller('AbrirDetalleCtrl', AbrirDetalleCtrl);

function AbrirDetalleCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, $uibModalInstance, x) {

    function initialData() {
        cajasFactory.dameDetallePago(x.Clv_Session).then(function (detallePago) {
            vm.detallePago = detallePago.GetDameDetalleListResult;
        });
        cajasFactory.dameSumaPago(x.Clv_Session).then(function (sumaPago) {
            vm.sumaPagos = sumaPago.GetSumaDetalleListResult;
        });
        cajasFactory.dameSuscriptor(x.Contrato).then(function (suscriptor) {
            vm.Suscriptor = suscriptor.GetDameTiposClientesListResult[0];
        });
        cajasFactory.muestraServicios(x.Contrato).then(function (data) {
            data.GetMuestraServiciosFACListResult.unshift({
                'DescripcionFac': '----------------',
                'Clv_Servicio': 0
            });
            vm.servicios = data.GetMuestraServiciosFACListResult;
            vm.selectedService = data.GetMuestraServiciosFACListResult[0];
        });
    }

    function ok() {
        if (vm.selectedService.Clv_Servicio == 0) {
            ngNotify.set('Selecciona un servicio por favor.', 'error');
        } else {
            if (vm.selectedService.Clv_Txt == 'CADIG' || vm.selectedService.Clv_Txt == 'CADI2' || vm.selectedService.Clv_Txt == 'CADI3' || vm.selectedService.Clv_Txt == 'CANET') {
                cajasFactory.consultaCamdo(x.Clv_Session, x.Contrato).then(function (data) {
                    if (data.GetCAMDOFACResult.Existe == false) {
                        var items = {};
                        items.Session = x.Clv_Session;
                        items.Contrato = x.Contrato;
                        items.Texto = vm.selectedService.Clv_Txt;
                        items.Tipo = vm.Suscriptor.Clv_TipoCliente;
                        vm.animationsEnabled = true;
                        var modalInstance = $uibModal.open({
                            animation: vm.animationsEnabled,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'views/facturacion/modalCambioDomicilio.html',
                            controller: 'ModalCambioDomicilioCtrl',
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
                    } else {
                        ngNotify.set('El cliente tiene un cambio de domicilio pendiente.', 'error');
                    }
                });
            } else {
                cajasFactory.addAdicionales(x.Clv_Session, vm.selectedService.Clv_Txt, x.Contrato, vm.Suscriptor.Clv_TipoCliente).then(function (data) {
                    $rootScope.$emit('realoadPagos', {});
                });
            }
        }
    }

    $rootScope.$on('realoadPagos', function () {
        initialData();
    });

    function InformacionCobro(detalle) {
        var items = {};
        items.Clv_Session = detalle.Clv_Session;
        items.CLV_DETALLE = detalle.CLV_DETALLE;

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/facturacion/modalInformacionCobro.html',
            controller: 'ModalInformacionCobroCtrl',
            controllerAs: 'ctrl',
            backdrop: 'static',
            keyboard: false,
            class: 'modal-backdrop fade',
            size: 'md',
            resolve: {
                items: function () {
                    return items;
                }
            }
        });
    }

    function openDeleteList() {
        if (vm.selectAparato == undefined) {
            ngNotify.set('Selecciona un concepto.', 'error');
        } else if (vm.selectAparato.CLAVE == 1 || vm.selectAparato.CLAVE == 3) {
            if (vm.selectAparato.Pagos_Adelantados != 'Ext. Adicionales') {
                if (vm.selectAparato.CLAVE == 1) {
                    ngNotify.set('No se puede quitar la Contratación.', 'error');
                } else if (vm.selectAparato.CLAVE == 2) {
                    ngNotify.set('No se puede quitar la Reconexión.', 'error');
                }
            }
        } else {
            if (vm.selectAparato != '') {
                cajasFactory.quitarDetalle(x.Contrato, x.Clv_Session, vm.selectAparato.CLV_DETALLE, vm.Suscriptor.Clv_TipoCliente).then(function (data) {
                    if (data.GetQuitarDetalleListResult[0].Error == 0) {
                        cajasFactory.dameDetallePago(x.Clv_Session).then(function (detallePago) {
                            vm.detallePago = detallePago.GetDameDetalleListResult;
                        });
                        cajasFactory.dameSumaPago(x.Clv_Session).then(function (sumaPago) {
                            vm.sumaPagos = sumaPago.GetSumaDetalleListResult;
                        });
                        cajasFactory.addBitacora(x.Contrato, vm.selectAparato.Pagos_Adelantado).then(function (data) { });
                        vm.selectAparato = undefined;
                    } else {
                        ngNotify.set(data.GetQuitarDetalleListResult[0].Msg, 'error');
                    }
                });
            } else {
                ngNotify.set('Seleccione un concepto válido', 'error');
            }
        }
    }

    function adelantaPagos(item) {
        cajasFactory.puedoAdelantarPago(x.Clv_Session).then(function (data) {
            vm.errPag = data.GetDeepAdelantarResult.Error;
            if (vm.errPag == 0) {
                cajasFactory.checaAdelantarPagos(x.Contrato).then(function (dataCheca) {
                    vm.errChec = dataCheca.GetDeepChecaAdelantarPagosDifResult.Error;
                    if (vm.errChec == 0) {
                        var items = {
                            Concepto: item,
                            Session: x.Clv_Session,
                            Contrato: x.Contrato,
                            Suscriptor: vm.Suscriptor
                        };
                        vm.animationsEnabled = true;
                        var modalInstance = $uibModal.open({
                            animation: vm.animationsEnabled,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'views/facturacion/modalAdelantaPago.html',
                            controller: 'ModalAdelantaPagoCtrl',
                            controllerAs: 'ctrl',
                            backdrop: 'static',
                            keyboard: false,
                            class: 'modal-backdrop fade',
                            size: 'sm',
                            resolve: {
                                items: function () {
                                    return items;
                                }
                            }
                        });
                    } else {
                        ngNotify.set(dataCheca.GetDeepChecaAdelantarPagosDifResult.Msg, 'info');
                    }
                });
            } else {
                ngNotify.set(data.GetDeepAdelantarResult.Msg, 'info');
            }
        });
    }

    function guardaconcepto(item, index) {
        for (var i = 0; i < vm.detallePago.length; i++) {
            vm.detallePago[i].isChecked = false;
        }
        vm.detallePago[index].isChecked = true;
        vm.selectAparato = item;
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
        $rootScope.$emit('table', {});
    }

    var vm = this;
    vm.ok = ok;
    vm.InformacionCobro = InformacionCobro;
    vm.openDeleteList = openDeleteList;
    vm.adelantaPagos = adelantaPagos;
    vm.guardaconcepto = guardaconcepto;
    vm.cancel = cancel;
    initialData();
}
