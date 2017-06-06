'use strict';
angular
	.module('softvApp')
	.controller('ModalCambioDomicilioCtrl', function($uibModalInstance, cajasFactory, items, $rootScope, ngNotify) {

		function initialData() {
			cajasFactory.dameCiudades(items.Contrato).then(function(data) {
				vm.ciudades = data.GetCiudadCAMDOListResult;
			});
		}


		function changeCiudad() {
			cajasFactory.dameLocalidades(items.Contrato, vm.selectedCiudad.Clv_Ciudad).then(function(data) {
				vm.localidades = data.GetLocalidadCAMDOListResult;
			});
		}

		function changeLocalidad() {
			cajasFactory.dameColonias(items.Contrato, vm.selectedLocalidad.Clv_Localidad).then(function(data) {
				vm.colonias = data.GetColoniaCAMDOListResult;
			});
		}

		function changeColonia() {
			cajasFactory.dameCalles(items.Contrato, vm.selectedColonia.CLV_COLONIA).then(function(data) {
				vm.calles = data.GetCalleCAMDOListResult;
			});
		}

		function ok() {
			var objCAMDOFAC = {
				'Clv_Sesion': items.Session,
				'CONTRATO': items.Contrato,
				'Clv_Calle': vm.selectedCalle.Clv_calle,
				'NUMERO': vm.numero,
				'Num_int': vm.numeroInterior,
				'ENTRECALLES': vm.entreCalles,
				'Clv_Colonia': vm.selectedColonia.CLV_COLONIA,
				'Clv_Localidad': vm.selectedLocalidad.Clv_Localidad,
				'TELEFONO': vm.telefono,
				'ClvTecnica': 0,
				'Clv_Ciudad': vm.selectedCiudad.Clv_Ciudad,
				'Clv_Sector': 0,
			}
			cajasFactory.addCamdo(objCAMDOFAC).then(function(data) {});
			cajasFactory.addAdicionales(items.Session, items.Texto, items.Contrato, items.Tipo).then(function(data) {
				$uibModalInstance.dismiss('cancel');
				$rootScope.$emit('realoadPagos', {});
			});
		}

		function cancel() {
			cajasFactory.cancelarDomicilio(items.Session, items.Contrato).then(function(data) {
				$uibModalInstance.dismiss('cancel');
				$rootScope.$emit('realoadPagos', {});
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.changeCiudad = changeCiudad;
		vm.changeLocalidad = changeLocalidad;
		vm.changeColonia = changeColonia;
		vm.ok = ok;
		initialData();
	});
