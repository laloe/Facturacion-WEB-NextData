'use strict';
angular
	.module('softvApp')
	.controller('ReporteCuidadCarteraCtrl', function($state,CiudadCarteraFactory,globalService,$sce) {	


  
		function GetServiciosList(){
			CiudadCarteraFactory.GetServicios().then(function(data) {         
             vm.servicios=data.GetListTipServResult;
             GetFechaList();
             
			});
			}     

     function GetFechaList(){
			CiudadCarteraFactory.GetFechas().then(function(data) {         
             vm.fechas=data.GetListFechaCiudadCarteraResult;
             var servicio=vm.servicios[1].Clv_TipSer;
             var fecha=vm.fechas[0];           
              GetDetalleCartera(servicio,fecha, vm.TipoReporte);
			});
			}

	function GetDetalleCartera(servicio,fecha,TipoReporte){
			CiudadCarteraFactory.GetDetalleCartera(servicio,fecha,TipoReporte).then(function(data) {   		
			console.log(data)		
			  vm.carteraurl=$sce.trustAsResourceUrl(globalService.getUrlReportes()+'/reportes/'+data.GetListDetalleCarteraResult[0].Fecha);            
			});
			}

     function ObtenReporte(){
      var tiporeporte=vm.TipoReporte;
      var servicio=vm.servicio;
       var fecha=vm.fecha;
       GetDetalleCartera(servicio,fecha,tiporeporte);

     };

     var vm=this;     
    GetServiciosList();
    vm.ObtenReporte = ObtenReporte;
    vm.TipoReporte='cartera';
	});
