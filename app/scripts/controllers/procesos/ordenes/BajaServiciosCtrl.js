(function () {
    'use strict';

    angular
        .module('softvApp')
        .controller('BajaServiciosCtrl', BajaServiciosCtrl);

    BajaServiciosCtrl.inject = ['$uibModalInstance', 'ordenesFactory', 'items', ' $rootScope'];
    function BajaServiciosCtrl($uibModalInstance, ordenesFactory, items, $rootScope) {
        var vm = this;
        vm.cancel = cancel;
        vm.transfer = transfer;
        vm.ok = ok;

        this.$onInit = function () {
            ordenesFactory.getCableModemsCli(items.contrato).then(function (data) {
                vm.cableModems = data.GetMUESTRACABLEMODEMSDELCLI_porOpcionResult;
                vm.cableModems.forEach(function (item) {
                    var op = 0;
                    if (items.descripcion.includes('ipaqu') || items.descripcion.includes('ipaqt')) {
                        op = 1;
                    } else if (items.descripcion.includes('bpaqu')
                        || items.descripcion.includes('bpaqt')
                        || items.descripcion.includes('bpaad')
                        || items.descripcion.includes('bsedi')) {
                        op = 10;
                    } else if (items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt')) {
                        op = 20;
                    } else if (items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt')) {
                        op = 21;
                    }
                    var modem = {
                        contrato: item.CONTRATONET,
                        orden: items.clv_orden,
                        detalle: items.clv_detalle_orden,
                        op: op
                    };
                    ordenesFactory.detalleCableModem(modem)
                        .then(function (data) {
                            item.descripcion = data.GetMUESTRACONTNET_PorOpcionResult[0].DESCRIPCION;
                            item.unicaNet = data.GetMUESTRACONTNET_PorOpcionResult[0].CLV_UNICANET;
                            item.status = data.GetMUESTRACONTNET_PorOpcionResult[0].STATUS;
                        });
                });
                vm.objModems = {
                    labelAll: 'Servicios De Internet Activos',
                    labelSelected: 'Pasar a Baja Estos Servicios De Internet',
                    items: vm.cableModems,
                    selectedItems: []
                };
            });
        }

        function transfer(from, to, index) {
            if (index >= 0) {
                to.push(from[index]);
                from.splice(index, 1);
            } else {
                for (var i = 0; i < from.length; i++) {
                    to.push(from[i]);
                }
                from.length = 0;
            }
        }

        function ok() {
            vm.objModems.selectedItems.forEach(function (element) {
                if (element.unicaNet > 0) {
                    if (items.descripcion.includes('ipaqu') || items.descripcion.includes('ipaqut')) {
                        vm.status = 'I';
                    } else if (items.descripcion.includes('bpaqu') || items.descripcion.includes('bpaqt') || items.descripcion.includes('bpaad') || items.descripcion.includes('bsedi')) {
                        vm.status = 'B';
                    } else if (items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt')) {
                        vm.status = 'S';
                    } else if (items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt')) {
                        vm.status = 'I';
                    }
                    var obj = {
                        'objIPAQU':
                        {
                            'Clave': items.clv_detalle_orden,
                            'Clv_Orden': items.clv_orden,
                            'Contratonet': element.CONTRATONET,
                            'Clv_UnicaNet': element.unicaNet,
                            'Op': 0,
                            'Status': vm.status
                        }
                    };
                    ordenesFactory.addIpaqu(obj).then(function (data) {
                        if (vm.status == 'B') {
                            var orden = {
                                'Clv_Orden': items.clv_orden,
                                'Clv_TipSer': items.servicio.clv_tipser,
                                'ContratoNet': element.CONTRATONET,
                                'Clv_UnicaNet':element.unicaNet,
                                'Op': 0
                            };
                            ordenesFactory.guardaMotivoCancelacion(orden).then(function () {
                                $uibModalInstance.dismiss('cancel');
                                $rootScope.$emit('actualiza_tablaServicios');
                            });

                        }
                    });
                } else {
                    if (element.CONTRATONET > 0) {
                        if (items.descripcion.includes('ipaqu') || items.descripcion.includes('ipaqut')) {
                            console.log('ipaqu');
                        } else if (items.descripcion.includes('bpaqu') || items.descripcion.includes('bpaqt') || items.descripcion.includes('bpaad') || items.descripcion.includes('bsedi')) {
                            console.log('bpaqu');
                        } else if (items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt')) {
                            console.log('dpaqu');
                        } else if (items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt')) {
                            console.log('rpaqu');
                        }
                    }
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();