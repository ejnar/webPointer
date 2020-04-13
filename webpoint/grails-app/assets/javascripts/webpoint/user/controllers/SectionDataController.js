'use strict';

/* Controllers */

var module = angular.module('webpoint.user');

    module.controller('UpdateSectionDataCtrl', UpdateSectionDataCtrl);
    UpdateSectionDataCtrl.$inject =  ['$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath',
                                        'properties', 'SectionsApi', 'SettingService', '$uibModal'];
    function UpdateSectionDataCtrl($rootScope, $scope, $routeParams, $location, $log, cfgAppPath, properties, SectionsApi, SettingService, $uibModal) {
        var vm = this;

        vm.reference = '';
        vm.addReference = addReference;
        vm.addLink = addLink;
        vm.closeLinkItem = closeLinkItem;
        vm.addTagg = addTagg;
        vm.selectTagg = selectTagg;
        vm.closeFilterItem = closeFilterItem;
        vm.editSection = editSection;
        vm.updateMeta = updateMeta;
        vm.saveMeta = saveMeta;
        vm.languages = properties.language;
        vm.editGroupModal = editGroupModal;

		SettingService.getTagg($scope);
		SettingService.getCategory($scope);

		$scope.doSave = true;
//		$scope.$broadcast('show-errors-reset');

        function init(){
            $log.debug(' - UpdateSectionDataCtrl.init: ');
            if($routeParams.groupId != null){
                $scope.doSave = false;
                SectionsApi.get({Id: $routeParams.groupId}, function (resp) {
                    $scope.section = resp;
                    if(!$scope.section.references){
                        $scope.section.references = [];
                    }
                });
            }else{
                $scope.section = {};
                $scope.section.references = [];
//                $scope.section.links = [];
            }
        }

        function addReference(){
            $scope.section.references.push(vm.reference);
            vm.reference = '';
        }

		function addLink() {
            $log.debug(' --- UpdateSectionDataCtrl.addLink - link:', $scope.link);
            selectLink($scope.link);
            $scope.link = {};
        }

        function selectLink(link) {
            $log.debug(' --- UpdateSectionDataCtrl.selectLink - link:', link);
            if(link != null){
                if(!Array.isArray($scope.section.oLinks)){
                    $scope.section.oLinks = []
                }
                $scope.section.oLinks.push(link);
            }
        }

        function closeLinkItem(link) {
            $log.debug(' --- UpdateSectionDataCtrl.closeLinkItem - link:', link);
            removeItem(link,$scope.section.oLinks);
        }

        function addTagg() {
    	    $log.debug(' --- UpdateSectionDataCtrl.addTagg - tagg:', $scope.newTagg);
            $scope.taggs.unshift($scope.newTagg);
            $scope.tagg = $scope.newTagg;
            selectTagg($scope.newTagg);
            SettingService.updateTagg($scope.newTagg);
        }

        function selectTagg(tagg) {
            $log.debug(' --- UpdateSectionDataCtrl.selectTagg - tagg:', tagg);
            if(tagg != null){
                if(!Array.isArray($scope.section.taggs)){
                    $scope.section.taggs = []
                }
                $scope.section.taggs.push(tagg);
            }
            tagg = '';
//            SettingService.updateTagg(tagg);
        }

	    function closeFilterItem(tagg) {
            $log.debug(' --- UpdateSectionDataCtrl.closeFilterItem - tagg:', tagg);
            removeItem(tagg,$scope.section.taggs);
        }

	    function updateMeta(form) {
	    	$log.debug(' --- UpdateSectionDataCtrl.updateMeta - meta:', $scope.section);
	    	var section = $scope.section;
	    	SectionsApi.update({Id: section.id}, section, function (resp) {
	    		$location.path(cfgAppPath.SONGDATA_LIST);
	        });
//	    	$rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    };

	    function saveMeta(form) {
	        $log.debug(' --- UpdateSectionDataCtrl.saveMeta - section:', $scope.section);
//	        $scope.$broadcast('show-errors-check-validity');
	        SectionsApi.save($scope.section, function (resp) {
	            $log.debug(resp);
	        	$location.path(cfgAppPath.SONG_EDIT.replace(':id', resp.id) );
	        });
//	         $rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    }

	    function editSection() {
            $location.path(cfgAppPath.SONG_EDIT.replace(':id', $scope.section.id));
        }

        function editGroupModal(){
            var modalInstance = $uibModal.open({
                templateUrl: cfgAppPath.editGroupModal,
                controller: 'ModalEditGroupCtrl as vm',
                size: 'lg',
                resolve: {
                    section: function () {
                        return $scope.section;
                    }
                }
            });
            modalInstance.closed.then(function(){
            });
        }
        init();
    }

    module.controller('ModalEditGroupCtrl', ModalEditGroupCtrl);
    ModalEditGroupCtrl.$inject = [ '$scope', '$uibModalInstance', '$log', 'cfgAppPath', 'UserApi', 'section', 'SectionsApi'];

    function ModalEditGroupCtrl ($scope, $uibModalInstance, $log, cfgAppPath, UserApi, section, SectionsApi) {
        var vm = this;
        vm.cancel = cancel;
        vm.save = save;
        vm.addGroup = addGroup;
        vm.removeGroup = removeGroup;
        vm.section = {};

        vm.groups = UserApi.RoleGroup.list();

	    function init(){
            $log.debug(" --- ModalEditGroupCtrl.init: " + section);
            vm.section = section;
        }

        function removeGroup(group){
            removeItem(group, vm.section.roleGroupSet);
        }

        function addGroup(group){
            found = vm.section.roleGroupSet.filter(function (g) {
                return g.name == group.name;
            });
            console.info(found);
            if(found.length < 1){
                vm.section.roleGroupSet.push(group);
            }
        }

        function save() {
            SectionsApi.update({Id: vm.section.id}, vm.section, function (resp) {
                $log.debug(resp);
            });
        }

	    function cancel() {
	        $uibModalInstance.dismiss('cancel');
	    }
	    init();
    }

function removeItem(item,list){
    var index = list.indexOf(item);
    if(index != -1){
        list.splice( index, 1 );
    }
}

