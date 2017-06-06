'use strict';
angular.module('softvApp').controller('YaPagoCtrl', YaPagoCtrl);

function YaPagoCtrl($uibModal, inMenu, $uibModalInstance, ngNotify, $localStorage, pagosMaestrosFactory, x, y) {

    function ok() {
        var obj = {
            'ContratoMaestro': y.IdContratoMaestro,
            'Credito': 0,
            'Cajera': $localStorage.currentUser.usuario,
            'IpMaquina': $localStorage.currentUser.maquina,
            'Sucursal': $localStorage.currentUser.sucursal,
            'IdCompania': x.IdCompania,
            'IdDistribuidor': x.IdDistribuidor,
            'ClvSessionPadre': x.Clv_SessionPadre,
            'Tipo': 0,
            'ToKen2': $localStorage.currentUser.token,
            'NoPagos' : 0,
            'PagoInicial': 0
        };
        pagosMaestrosFactory.generaFactura(obj).then(function (data) {
            if (data.GetGrabaFacturaCMaestroResult.BndError == 1) {
                ngNotify.set(data.GetGrabaFacturaCMaestroResult.Msg, 'error')
            } else {
                ngNotify.set('Se genero la factura correctamente.', 'success')
                $uibModalInstance.dismiss('cancel');
            }
        });
    }

    function cancel() {
	    $uibModalInstance.dismiss('cancel');
	}

    var vm = this;
    vm.ok = ok;
	vm.cancel = cancel;
}