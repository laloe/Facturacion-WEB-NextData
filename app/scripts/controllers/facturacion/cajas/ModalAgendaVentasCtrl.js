'use strict';

function ModalAgendaVentasCtrl($uibModalInstance, cajasFactory, orden, ngNotify, $filter) {
	this.$onInit = function() {
		cajasFactory.getTurnos().then(function(data) {
			vm.turnos = data.GetspConsultaTurnosListResult;
		});
	}

	function ok() {
		var fechaAux = $filter('date')(vm.FechaAgenda, 'dd/MM/yyyy');
		var obj = {
			'objGenera_Cita_OrdserFac': {
				'ClvTecnico': 0,
				'ClvQueja': orden,
				'Turno': vm.TurnoAgenda.TURNO,
				'Fecha': fechaAux,
				'Comentario': vm.ComentarioAgenda
			}
		};
		cajasFactory.guardarAgenda(obj).then(function(data) {
			$uibModalInstance.dismiss('cancel');
			ngNotify.set('Datos agendados correctamente.', 'success');
		});
	}

	var vm = this;
	vm.ok = ok;
	vm.ComentarioAgenda = '';
	vm.FechaAgenda = new Date();
}

angular.module('softvApp').controller('ModalAgendaVentasCtrl', ModalAgendaVentasCtrl);
