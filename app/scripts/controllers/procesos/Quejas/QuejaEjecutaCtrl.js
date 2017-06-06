'use strict';
angular
  .module('softvApp')
  .controller('QuejaEjecutaCtrl', function ($state, ngNotify, $location, $uibModal, $stateParams, atencionFactory, quejasFactory) {

    function InitalData() {

      vm.clv_queja = $stateParams.id;
      vm.contrato = $stateParams.contrato;
      vm.Servicio = $stateParams.servicio;
      quejasFactory.ValidaQueja(vm.clv_queja).then(function (data) {
        if (data.GetDeepValidaQuejaCompaniaAdicResult.Valida == 0) {
          var param = {};
          param.contrato = vm.contrato;
          param.servicio = vm.Servicio;
          param.op = 0;
          atencionFactory.buscarCliente(param).then(function (data) {

            var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
            var contrato = detalle.ContratoBueno;
            vm.GlobalContrato = contrato;
            vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
            vm.Calle = detalle.CALLE;
            vm.Numero = detalle.NUMERO;
            vm.Colonia = detalle.COLONIA;
            vm.Ciudad = detalle.CIUDAD;
            atencionFactory.getServiciosCliente(contrato).then(function (data) {
              vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;

              quejasFactory.ConsultaQueja($stateParams.id).then(function (data) {
                var detqueja = data.GetQuejasListResult[0];
                vm.UsuarioGenero = detqueja.UsuarioGenero;
                vm.UsuarioEjecuto = detqueja.UsuarioEjecuto;
                vm.TecnicoAgenda = detqueja.NombreTecAge;
                vm.TurnoAgenda = detqueja.TurnoAge;
                vm.FechaAgenda = detqueja.FechaAge;
                vm.ComentarioAgenda = detqueja.ComentarioAge;
                vm.DetalleProblema = detqueja.Problema;
                vm.Observaciones = detqueja.Observaciones;
                vm.DetalleSolucion = detqueja.Solucion;
                var fsolicitud = detqueja.Fecha_Soliciutud.split(' ');
                vm.FechaSolicitud = fsolicitud[0];
                var hora = getTime(detqueja.Fecha_Soliciutud);
                vm.HoraSolicitud = hora;

                if (detqueja.Fecha_Ejecucion != null) {
                  var fejecucion = detqueja.Fecha_Ejecucion.split(' ');
                  vm.FechaEjecucion = fejecucion[0];
                  var horaEjecucion = getTime(detqueja.Fecha_Ejecucion);
                  vm.HoraEjecucion = horaEjecucion;
                }
                if (detqueja.FechaProceso != null) {
                  var fproceso = detqueja.FechaProceso.split(' ');
                  vm.FechaProceso = fproceso[0];
                  vm.HoraProceso = getTime(detqueja.FechaProceso);
                }
                if (detqueja.Visita1 != null) {
                  var fvisita1 = detqueja.Visita1.split(' ');
                  vm.Fechavisita1 = fvisita1[0];
                  vm.Horavisita1 = getTime(detqueja.Visita1);
                }
                if (detqueja.Visita2 != null) {
                  var fvisita2 = detqueja.Visita2.split(' ');
                  vm.Fechavisita2 = fvisita2[0];
                  vm.Horavisita2 = getTime(detqueja.Visita2);
                }
                if (detqueja.Visita3 != null) {
                  var fvisita3 = detqueja.Visita3.split(' ');
                  vm.Fechavisita3 = fvisita3[0];
                  vm.Horavisita3 = getTime(detqueja.Visita3);
                }
                if (detqueja.EjecucuionReal != null) {
                  var fEjecucuionReal = detqueja.EjecucuionReal.split(' ');
                  vm.FechaEjecucuionReal = fEjecucuionReal[0];
                  vm.HoraEjecucuionReal = getTime(detqueja.EjecucuionReal);
                }

                vm.Departamento = detqueja.Clasificacion;
                vm.Clv_trabajo = detqueja.Clv_Trabajo;
                vm.Clv_prioridad = detqueja.clvPrioridadQueja;
                vm.Clv_problema = detqueja.clvProblema;
                vm.ProblemaReal = detqueja.Solucion;
                vm.Visita = detqueja.Visita;
                vm.Clv_status = detqueja.Status;
                for (var t = 0; t < vm.Status.length; t++) {
                  if (vm.Status[t].Clave == vm.Clv_status) {
                    vm.Estatus = vm.Status[t];
                    Bloqueo(true);
                  }
                }


                quejasFactory.ObtenTecnicos(vm.GlobalContrato).then(function (data) {
                  vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
                  if (detqueja.Clave_Tecnico != null) {
                    for (var a = 0; a < vm.Tecnicos.length; a++) {
                      if (vm.Tecnicos[a].clv_Tecnico == detqueja.Clave_Tecnico) {
                        vm.Tecnico = vm.Tecnicos[a];
                      }
                    }
                  }
                });

                atencionFactory.MuestraTrabajos(vm.Servicio).then(function (data) {
                  vm.Trabajos = data.GetMUESTRATRABAJOSQUEJASListResult;
                  for (var a = 0; a < vm.Trabajos.length; a++) {
                    if (vm.Trabajos[a].CLV_TRABAJO == vm.Clv_trabajo) {
                      vm.Trabajo = vm.Trabajos[a];
                    }
                  }
                });

                quejasFactory.ObtenPrioridad().then(function (data) {
                  vm.Prioridades = data.GetSoftv_GetPrioridadQuejaListResult;
                  for (var a = 0; a < vm.Prioridades.length; a++) {
                    if (vm.Prioridades[a].clvPrioridadQueja == vm.Clv_prioridad) {
                      vm.Prioridad = vm.Prioridades[a];
                    }
                  }
                });
                atencionFactory.getServicios().then(function (data) {
                  vm.Servicios = data.GetMuestraTipSerPrincipalListResult;
                  for (var a = 0; a < vm.Servicios.length; a++) {
                    if (vm.Servicios[a].Clv_TipSerPrincipal == vm.Servicio) {
                      vm.Servicio = vm.Servicios[a];
                    }
                  }
                });

                atencionFactory.GetClasificacionProblemas().then(function (data) {
                  vm.Problemas = data.GetuspConsultaTblClasificacionProblemasListResult;
                  for (var a = 0; a < vm.Problemas.length; a++) {
                    if (vm.Problemas[a].clvProblema == vm.Clv_problema) {
                      vm.Problema = vm.Problemas[a];
                    }
                  }
                });

              });

            });



          });
        } else {
          $state.go('home.procesos.reportes');
          ngNotify.set('La Queja pertenece  a un contrato de plazas adicionales al usuario, no puede ejecutarla', 'error');
        }
      });
    }

    function dateParse(date) {
      var realdate = date.split(" ")
      var strDate = realdate[0];
      var dateParts = strDate.split("/");
      var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
      if (dateParts[0].length == 1) {
        var dia = '0' + ateParts[0];
      }
    }


    function getTime(date) {
      var fejecucion = date.split(' ');

      if (fejecucion.length == 3) {
        return fejecucion[2];
      } else if (fejecucion.length == 4) {
        var hora = fejecucion[3].split(':');
        if (hora[0].length == 1) {
          return '0' + fejecucion[3];
        } else {
          return fejecucion[3];
        }

      }
    }


   function abrirBonificacion() {
			var detalle = {};
			detalle.Block = true;
			detalle.Queja = vm.clv_queja;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalBonificacion.html',
				controller: 'ModalBonificacionCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					detalle: function() {
						return detalle;
					}
				}
			});
		}


    function ValidaFecha(date) {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      var today = dd + '/' + mm + '/' + yyyy;
      console.log(today);
      if (today >= date) {
        return true;
      } else {
        return false;
      }

    }

    function Bloqueo(aplicabloqueo) {
      if (vm.Estatus.Clave == 'E') {
        if (aplicabloqueo == true) {
          vm.BtnGuarda = false;
          vm.FEjecucion = true;
          vm.FVisita1 = true;
          vm.FVisita2 = true;
          vm.FVisita3 = true;
          vm.FProceso = true;
          vm.Itrabajo = true
          vm.Iprioridad = true;
          vm.IDetProblema = true;
          vm.IClasproblema = true;
          vm.Iprobreal = true;
          vm.Iobser = true;
          vm.IEstatus = true;
          vm.Iejecucion = 'input-yellow';
          vm.Ivisita = 'input-normal';
          vm.Iproceso = 'input-normal';
          vm.ISelectEstatus = 'input-normal';
        } else {
          vm.BtnGuarda = true;
          vm.FEjecucion = false;
          vm.FVisita1 = true;
          vm.FVisita2 = true;
          vm.FVisita3 = true;
          vm.FProceso = true;
          vm.Itrabajo = true
          vm.Iprioridad = true;
          vm.IDetProblema = true;
          vm.IClasproblema = true;
          vm.Iprobreal = false;
          vm.Iobser = true;
          vm.IEstatus = true;
          vm.Iejecucion = 'input-yellow';
          vm.Ivisita = 'input-normal';
          vm.Iproceso = 'input-normal';
          vm.ISelectEstatus = 'input-normal';
        }

      } else if (vm.Estatus.Clave == 'P') {
        vm.BtnGuarda = false;
        vm.FEjecucion = true;
        vm.FVisita1 = true;
        vm.FVisita2 = true;
        vm.FVisita3 = true;
        vm.FProceso = true;
        vm.Itrabajo = false
        vm.Iprioridad = false;
        vm.IDetProblema = true;
        vm.IClasproblema = true;
        vm.Iprobreal = false;
        vm.Iobser = false;
        vm.IEstatus = false;
        vm.Iejecucion = 'input-yellow';
        vm.Ivisita1 = 'input-normal';
        vm.Ivisita2 = 'input-normal';
        vm.Ivisita3 = 'input-normal';
        vm.Iproceso = 'input-normal';
        vm.ISelectEstatus = 'input-yellow';
      } else if (vm.Estatus.Clave == 'V') {
        vm.BtnGuarda = true;
        vm.FEjecucion = true;
        vm.FVisita1 = (vm.visita1 == '') ? true : false;
        vm.FVisita2 = (vm.visita2 == '') ? true : false;
        vm.FVisita3 = (vm.visita3 == '') ? true : false;
        vm.FProceso = true;
        vm.Itrabajo = false
        vm.Iprioridad = false;
        vm.IDetProblema = true;
        vm.IClasproblema = true;
        vm.Iprobreal = false;
        vm.Iobser = false;
        vm.IEstatus = false;
        vm.Iejecucion = 'input-normal';
        vm.Ivisita1 = 'input-yellow';
        vm.Ivisita2 = 'input-yellow';
        vm.Ivisita3 = 'input-yellow';
        vm.Iproceso = 'input-normal';
        vm.ISelectEstatus = 'input-normal';
      } else if (vm.Estatus.Clave == 'S') {
        vm.BtnGuarda = true;
        vm.FEjecucion = true;
        vm.FVisita1 = true;
        vm.FVisita2 = true;
        vm.FVisita3 = true;
        vm.FProceso = false;
        vm.Itrabajo = false
        vm.Iprioridad = false;
        vm.IDetProblema = true;
        vm.IClasproblema = true;
        vm.Iprobreal = false;
        vm.Iobser = false;
        vm.IEstatus = false;
        vm.Iejecucion = 'input-normal';
        vm.Ivisita1 = 'input-normal';
        vm.Ivisita2 = 'input-normal';
        vm.Ivisita3 = 'input-normal';
        vm.Iproceso = 'input-yellow';
        vm.ISelectEstatus = 'input-normal';
      } else {

      }
    }

    function CambiaEstatus() {
      Bloqueo(false);
    }

    function Ejecutaqueja() {
      quejasFactory.ValidaQueja(vm.clv_queja).then(function (data) {
        if (data.GetDeepValidaQuejaCompaniaAdicResult.Valida == 0) {
          quejasFactory.BuscaBloqueado(vm.GlobalContrato).then(function (bloqueado) {
            if (bloqueado.GetDeepBuscaBloqueadoResult.Bloqueado == 0) {
              if (vm.Estatus.Clave == 'E' || vm.Estatus.Clave == 'P') {
                if (vm.FechaEjecucion == undefined) {
                  ngNotify.set('Seleccione la fecha de ejecución', 'error');
                  return;
                } else {
                  if (ValidaFecha(vm.FechaEjecucion)) {
                    ngNotify.set('Seleccione una fecha mayor o igual a la actual', 'error');
                  }
                }
              } else if (vm.Estatus.Clave == 'V') {
                if (vm.visita1 == undefined && vm.visita2 == undefined && vm.visita3 == undefined) {
                  ngNotify.set('Seleccione la fecha de visita1', 'error');
                } else {
                  //ValidaFecha();
                }
              } else if (vm.Estatus.Clave == 'S') {
                if (vm.FechaProceso == undefined) {
                  ngNotify.set('Seleccione la fecha de proceso', 'error');
                } else {
                  ValidaFecha(vm.FechaProceso);
                }
              } else {
                ngNotify.set('Seleccione un estatus', 'error');
              }


              var obj = {};
              obj.Clv_Queja = vm.clv_queja;
              obj.Status = vm.Estatus.Clave;
              obj.Fecha_Ejecucion = vm.FechaEjecucion;
              obj.Visita1 = (vm.visita1 == undefined) ? '' : vm.visita1;
              obj.Visita2 = (vm.visita2 == undefined) ? '' : vm.visita2;
              obj.Visita3 = (vm.Visita3 == undefined) ? '' : vm.Visita3;
              obj.HV1 = '';
              obj.HV2 = '';
              obj.HV3 = '';
              obj.FechaProceso = (vm.FechaProceso == undefined) ? '' : vm.FechaProceso;
              obj.HP = '';
              obj.Visita = (vm.Visita == undefined) ? '' : vm.Visita;
              obj.Clv_Tecnico = vm.Tecnico.clv_Tecnico;
              obj.clvProblema = vm.Problema.clvProblema;
              obj.clvPrioridadQueja = vm.Prioridad.clvPrioridadQueja;
              obj.Solucion = vm.ProblemaReal;

              console.log(obj);
              quejasFactory.UpdateQuejas(obj).then(function(data) {
              	ngNotify.set('La queja se aplicó  correctamente', 'success');
              });

            } else {
              ngNotify.set('El cliente, ha sido bloqueado, por lo que no se podrá ejecutar la orden', 'error');
            }
          });

        } else {

          ngNotify.set('La Queja pertenece  a un contrato de plazas adicionales al usuario, no puede ejecutarla', 'error');
        }
      });
    }

    function DescargaMaterial() {
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/ModalDescargaMaterial.html',
        controller: 'ModalDescargaMaterialCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'md',
        resolve: {
          // contrato: function() {
          // 	return vm.GlobalContrato;
          // }
        }
      });
    }
    var vm = this;
    vm.Status = [{
        'Clave': 'P',
        'Nombre': 'Pendiente'
      },
      {
        'Clave': 'V',
        'Nombre': 'Con visita'
      },
      {
        'Clave': 'E',
        'Nombre': 'Ejecutada'
      },
      {
        'Clave': 'S',
        'Nombre': 'En Proceso'
      }
    ];
    InitalData();
    vm.Titulo = 'Ejecutar Queja';
    vm.abrirBonificacion = abrirBonificacion;
    vm.CambiaEstatus = CambiaEstatus;
    vm.Ejecutaqueja = Ejecutaqueja;
    vm.DescargaMaterial = DescargaMaterial;
  });
