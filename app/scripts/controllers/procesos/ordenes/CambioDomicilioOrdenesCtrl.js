(function () {
    'use strict';

    angular
        .module('softvApp')
        .controller('CambioDomicilioOrdenesCtrl', CambioDomicilioOrdenesCtrl);

    CambioDomicilioOrdenesCtrl.inject = ['$uibModalInstance', 'cajasFactory', 'items', '$rootScope', 'ngNotify', 'ordenesFactory'];
    function CambioDomicilioOrdenesCtrl($uibModalInstance, cajasFactory, items, $rootScope, ngNotify, ordenesFactory) {
        var vm = this;
        vm.cancel = cancel;
        vm.changeCiudad = changeCiudad;
        vm.changeLocalidad = changeLocalidad;
        vm.changeColonia = changeColonia;
        vm.ok = ok;

        this.$onInit = function () {
            if (items.isUpdate) {
                cajasFactory.dameCiudades(items.contrato).then(function (data) {
                    vm.ciudades = data.GetCiudadCAMDOListResult;
                    vm.ciudades.forEach(function (item, index) {
                        if (item.Clv_Ciudad == items.datosCamdo.Clv_Ciudad) {
                            vm.selectedCiudad = vm.ciudades[index];
                        }
                    });
                });
                cajasFactory.dameLocalidades(items.contrato, items.datosCamdo.Clv_Ciudad).then(function (data) {
                    vm.localidades = data.GetLocalidadCAMDOListResult;
                    vm.localidades.forEach(function (item, index) {
                        if (item.Clv_Localidad == items.datosCamdo.Clv_Localidad) {
                            vm.selectedLocalidad = vm.localidades[index];
                        }
                    });
                });
                cajasFactory.dameColonias(items.contrato, items.datosCamdo.Clv_Localidad).then(function (data) {
                    vm.colonias = data.GetColoniaCAMDOListResult;
                    vm.colonias.forEach(function (item, index) {
                        if (item.CLV_COLONIA == items.datosCamdo.Clv_Colonia) {
                            vm.selectedColonia = vm.colonias[index];
                        }
                    });
                });
                cajasFactory.dameCalles(items.contrato, items.datosCamdo.Clv_Colonia).then(function (data) {
                    vm.calles = data.GetCalleCAMDOListResult;
                    vm.calles.forEach(function (item, index) {
                        if (item.Clv_calle == items.datosCamdo.Clv_Calle) {
                            vm.selectedCalle = vm.calles[index];
                        }
                    });
                });
                vm.numero = items.datosCamdo.NUMERO;
                vm.numeroInterior = items.datosCamdo.Num_int;
                vm.telefono = items.datosCamdo.TELEFONO;
                vm.entreCalles = items.datosCamdo.ENTRECALLES;
            } else {
                cajasFactory.dameCiudades(items.contrato).then(function (data) {
                    vm.ciudades = data.GetCiudadCAMDOListResult;
                });
            }
        }


        function changeCiudad() {
            cajasFactory.dameLocalidades(items.contrato, vm.selectedCiudad.Clv_Ciudad).then(function (data) {
                vm.localidades = data.GetLocalidadCAMDOListResult;
            });
        }

        function changeLocalidad() {
            cajasFactory.dameColonias(items.contrato, vm.selectedLocalidad.Clv_Localidad).then(function (data) {
                vm.colonias = data.GetColoniaCAMDOListResult;
            });
        }

        function changeColonia() {
            cajasFactory.dameCalles(items.contrato, vm.selectedColonia.CLV_COLONIA).then(function (data) {
                vm.calles = data.GetCalleCAMDOListResult;
            });
        }

        function ok() {
            var objCAMDOFAC = {
                clv_detalle: items.clv_detalle_orden,
                clv_orden: items.clv_orden,
                contrato: items.contrato,
                calle: vm.selectedCalle.Clv_calle,
                numero: vm.numero,
                entrecalles: vm.entreCalles,
                colonia: vm.selectedColonia.CLV_COLONIA,
                telefono: vm.telefono,
                ciudad: vm.selectedCiudad.Clv_Ciudad,
                numinterior: vm.numeroInterior,
                localidad: vm.selectedLocalidad.Clv_Localidad
            };
            ordenesFactory.addCambioDomicilio(objCAMDOFAC).then(function (data) {
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('actualiza_tablaServicios');
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
