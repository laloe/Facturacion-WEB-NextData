'use strict';
angular
	.module('softvApp')
	.controller('ModalBonificacionCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state, detalle, quejasFactory) {

		function initialData() {	
		  alert(detalle.Block);
          vm.bloquear=detalle.Block;
			quejasFactory.DameBonificacion(detalle.Queja).then(function(data) {
				//console.log(data);
				vm.bonificacion = data.GetDameBonificacionListResult[0];	
				vm.Aplicada = data.GetDameBonificacionListResult[0].tieneBonificacion;
				vm.DiasBonificar = data.GetDameBonificacionListResult[0].dias;
				vm.CantidadBoNificar = data.GetDameBonificacionListResult[0].cantidad;
				vm.CantidadMonto = data.GetDameBonificacionListResult[0].Monto;
				vm.observa = data.GetDameBonificacionListResult[0].comentario;
				vm.Fecha = data.GetDameBonificacionListResult[0].fecha;
				vm.ImporteFac = data.GetDameBonificacionListResult[0].Montofac;
				vm.Ticket = data.GetDameBonificacionListResult[0].clv_factura;				

				if (data.GetDameBonificacionListResult[0].BndPorMonto == true){
					vm.Tipo = 'M';
				}
				else {
					vm.Tipo = 'D';
				}

			});
		}




		function ok() {
			if (vm.Tipo == 'M'){
				BndPorMonto = 1;
			}
			else {
				BndPorMonto = 0;
			}
			quejasFactory.InsertaBonificacion(detalle.Queja, vm.DiasBonificar, vm.observa, BndPorMonto, vm.CantidadMonto, vm.ImporteFac).then(function(data) {
				
				if(data.AddBonificacionResult == -1){
					ngNotify.set('Bonificación guardada con éxito.', 'success');
				}else{
					ngNotify.set('Ha surgido un error.', 'error');
				}
			});
		}

		function Eliminar() {
			$uibModalInstance.dismiss('cancel');
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function CambioTipo() {
			if (vm.Tipo == 'D') {
				vm.ShowConceptosDia = true;
				vm.ShowConceptosMonto = false;
			} else {
				vm.ShowConceptosDia = false;
				vm.ShowConceptosMonto = true;
			}
		}

		function eliminarBonificacion() {

			quejasFactory.EliminaBonificacion(detalle.Queja).then(function(data) {			
				if(data.DeleteBonificacionResult == -1){
					ngNotify.set('Bonificación eliminada con éxito.', 'success');
				}else{
					ngNotify.set('Ha surgido un error.', 'error');
				}

			});
		}

		

		
		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		vm.Eliminar = Eliminar;
		vm.CambioTipo = CambioTipo;
		vm.ShowConceptosDia = true;		
		var BndPorMonto = 0;
		var origen;
		vm.eliminarBonificacion = eliminarBonificacion;


		initialData();
	});