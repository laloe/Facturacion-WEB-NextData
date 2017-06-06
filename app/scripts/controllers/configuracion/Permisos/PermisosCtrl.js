'use strict';
angular
	.module('softvApp')
	.controller('PermisosCtrl', function($state, rolFactory, permisosFactory, globalService, $uibModal, ngNotify) {


		function GetRolList() {
			rolFactory.GetRolList().then(function(data) {
				vm.Roles = data.GetRolListResult;
				GetModuleList();
			});
		}

		function GetModuleList() {
			permisosFactory.GetModuleList().then(function(data) {
				var modulos = data.GetModuleListResult;
				permisosFactory.GetPermisoList(vm.Rol).then(function(data) {
					var permisos = data.GetPermisoistResult;
					vm.Modules = MergePermisos(modulos, permisos);
				});
			});
		}

		function MergePermisos(modulos, permisos) {
			for (var a = 0; a < modulos.length; a++) {
				for (var b = 0; b < permisos.length; b++) {
					if (modulos[a].IdModule == permisos[b].IdModule) {
						modulos[a].OptAdd = permisos[b].OptAdd;
						modulos[a].OptDelete = permisos[b].OptDelete;
						modulos[a].OptUpdate = permisos[b].OptUpdate;
						modulos[a].OptSelect = permisos[b].OptSelect;

					}
				}

			}
			return modulos;
		}

		function ObtenPermisos() {
			GetModuleList();
		}

		function GuardaPermisos() {
			var arrayPermiso = [];
			var idRol = vm.Rol.IdRol;
			for (var a = 0; a < vm.Modules.length; a++) {
				var object = {};
				object.IdModule = vm.Modules[a].IdModule;
				if (vm.Modules[a].OptAdd == null) {
					object.OptAdd = false;
				} else {
					object.OptAdd = vm.Modules[a].OptAdd;
				}
				if (vm.Modules[a].OptSelect == null) {
					object.OptSelect = false;
				} else {
					object.OptSelect = vm.Modules[a].OptSelect;
				}
				if (vm.Modules[a].OptUpdate == null) {
					object.OptUpdate = false;
				} else {
					object.OptUpdate = vm.Modules[a].OptUpdate;
				}
				if (vm.Modules[a].OptDelete == null) {
					object.OptDelete = false;
				} else {
					object.OptDelete = vm.Modules[a].OptDelete;
				}
				arrayPermiso.push(object);

			}


			permisosFactory.UpdatePermiso(idRol, arrayPermiso).then(function(data) {
				ngNotify.set('Permisos actualizados correctamente.', 'success');
			});


		}
		var vm = this;
		vm.sinDatos = false;
		vm.showPaginator = false;
		GetRolList();
		vm.GuardaPermisos = GuardaPermisos;
		vm.ObtenPermisos = ObtenPermisos;
	});
