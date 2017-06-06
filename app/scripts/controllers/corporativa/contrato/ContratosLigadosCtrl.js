'use strict';

function ContratosLigadosCtrl($uibModalInstance, $uibModal, $scope, $rootScope, corporativoFactory, detalle, $state, ngNotify, ContratoMaestroFactory) {

  function Init() {
    vm.contratos = [];
    vm.Distribuidor = detalle.Distribuidor;
    if (detalle.Action == "EDIT") {
      vm.showokbtn = false;
      vm.showeditbtn = true;
    }
    if (detalle.Action == "ADD") {
      vm.showokbtn = true;
      vm.showeditbtn = false;
    }
    for (var a = 0; a < detalle.ContratosSoftv.length; a++) {

      var contrato = {};
      contrato.CONTRATO = detalle.ContratosSoftv[a].ContratoCom;
      contrato.Nombre = detalle.ContratosSoftv[a].NombreCli;
      contrato.Apellido_Materno = '';
      contrato.Apellido_Paterno = '';
      contrato.ContratoBueno = detalle.ContratosSoftv[a].ContratoReal;
      contrato.Nivel = detalle.ContratosSoftv[a].Nivel;
      contrato.Proporcional = detalle.ContratosSoftv[a].Proporcional;
      vm.contratos.push(contrato);
    }
    sortByKey(vm.contratos, 'Nivel');
    
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
  $rootScope.$on('contrato_proporcional', function (e, contrato) {
    vm.contratos.push(contrato);
  });

  $scope.$on("agregar_contrato", function (e, contrato) {
    ValidaContrato(contrato);
  });


  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }


  function ValidaContrato(contrato) {
    var aux = 0;
    vm.contratos.forEach(function (item) {
      if (contrato.CONTRATO == item.CONTRATO) {
        aux += 1;
      }
    });
    if (aux > 0) {
      ngNotify.set('El contrato ya se encuentra asignado al contrato maestro', 'error');
    }
    if (aux == 0) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalProporcional.html',
        controller: 'ModalProporcionalCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        //windowClass: 'app-modal-window',
        keyboard: false,
        size: "sm",
        resolve: {
          contrato: function () {
            return contrato;
          }
        }

      });
    }

  };

  function clientesModal() {
    var detalle = {};
    detalle.contratos = vm.contratos;
    detalle.Distribuidor = vm.Distribuidor;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/buscaContrato.html',
      controller: 'BuscaContratoLCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      windowClass: 'app-modal-window',
      keyboard: false,
      size: "lg",
      resolve: {
        contratos: function () {
          return detalle;
        }
      }
    });
  }

  function ok() {
    if (vm.contratos.length > 0) {
      var contratos = [];
      vm.contratos.forEach(function (item, index) {
        contratos.push({
          Contrato: item.ContratoBueno,
          Nivel: index + 1,
          Proporcional: item.Proporcional
        });
      });
      corporativoFactory.ligarContratos(detalle.IdContratoMaestro, contratos).then(function (data) {
        ngNotify.set('Los Contratos fueron ligados correctamente al contrato maestro.', 'success');
        $state.go('home.corporativa.maestro');
        $uibModalInstance.dismiss('cancel');
      });
    } else {
      ngNotify.set('Introduce al menos un contrato.', 'error');
    }

  }

  function edit() {
    if (vm.contratos.length > 0) {
      var contratos = [];
      vm.contratos.forEach(function (item, index) {

        contratos.push({
          Contrato: item.CONTRATO,
          Nivel: index + 1,
          Proporcional: item.Proporcional

        });
      });
     

      corporativoFactory.UpdateRelContrato(detalle.IdContratoMaestro, contratos, vm.Distribuidor.Clv_Plaza).then(function (data) {

        ngNotify.set('Los Contratos fueron ligados correctamente al contrato maestro.', 'success');
        $state.go('home.corporativa.maestro');
        $uibModalInstance.dismiss('cancel');
      });
    } else {
      ngNotify.set('Introduce al menos un contrato.', 'error');
    }

  }

  function eliminarContrato(index) {
    vm.contratos.splice(index, 1);
  }

  function ValidaArchivo() {
    var files = $("#inputFile2").get(0).files;
    if (files.length == 0) {
      ngNotify.set('Se necesita seleccionar un archivo válido', 'error');
      return;
    }

    ContratoMaestroFactory.UpdateFile(files, detalle.IdContratoMaestro, vm.Distribuidor.Clv_Plaza).then(function (data) {
    
      if (data.ContratosValidos.length > 0) {
        ngNotify.set('Se encontraron ' + data.ContratosValidos.length + ' contratos válidos', 'grimace');
        vm.contratos = [];
        for (var i = 0; i < data.ContratosValidos.length; i++) {

          var aux = 0;
          vm.contratos.forEach(function (item) {
            if (data.ContratosValidos[i].ContratoCom == item.CONTRATO) {
              aux += 1;
            }
          });
          if (aux == 0) {
            var contrato = {};
            contrato.CONTRATO = data.ContratosValidos[i].ContratoCom;
            contrato.Nombre = data.ContratosValidos[i].Nombre;
            contrato.Apellido_Materno = '';
            contrato.Apellido_Paterno = '';
            contrato.ContratoBueno = data.ContratosValidos[i].ContratoReal;
            contrato.Nivel = data.ContratosValidos[i].Nivel;
            contrato.Proporcional = data.ContratosValidos[i].Proporcional2;

            vm.contratos.push(contrato);
          }
        }


      }

      if (data.ContratosNoValidos.length > 0) {
        vm.FileErrors = data.ContratosNoValidos;
      } else {
        vm.FileErrors = [];
      }

    });
  }

  function cambioNivel() {
    if (vm.contratos.length > 0) {
      var indexA = vm.Nivelant - 1;
      var indexB = vm.Nivelnue - 1;

      swapArrayElements(vm.contratos, indexA, indexB);
    }

  }

  var swapArrayElements = function (arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  };

  var vm = this;
  vm.cancel = cancel;
  vm.ok = ok;
  vm.clientesModal = clientesModal;
  vm.eliminarContrato = eliminarContrato;
  vm.contratos = [];
  Init();
  vm.edit = edit;
  vm.ValidaArchivo = ValidaArchivo;
  vm.cambioNivel = cambioNivel;
}
angular.module('softvApp').controller('ContratosLigadosCtrl', ContratosLigadosCtrl);
