'use strict';

/* Controllers */

var sectionController = angular.module('webpoint.user');

sectionController.controller('GroupOfSectionCtrl', [
    '$scope', '$rootScope', '$routeParams', '$location', '$filter', '$log', 'cfgAppPath', 
    'UserApi', 'SectionMetaApi', 'SectionsApi', 'sharedProperties', 'usSpinnerService',
    function list ($scope, $rootScope, $routeParams, $location, $filter, $log, cfgAppPath, 
    		UserApi, SectionMetaApi, SectionsApi, sharedProperties, usSpinnerService) {
	 	
//		$scope.$on("LOAD_GROUPOFSECTION_EVENT", function () {   // event, args
//			$log.debug(' --- LOAD_GROUPOFSECTION_EVENT');     // + args.eventID
//			$scope.loadSection();	 
//		});
			
    	$scope.groupOfSectionCtrl_editMeta = function(id) {
    		$log.debug(' --- GroupOfSectionController.groupOfSectionCtrl_editMeta - id:', id);
    		$location.path(cfgAppPath.groupOfSectionEdit + id );
    	}
    	$scope.groupOfSectionCtrl_delMeta = function(meta) {
    	    $log.debug(' --- GroupOfSectionController.groupOfSectionCtrl_delMeta - meta:', meta);
    	    SectionMetaApi.remove({Id: meta.id}, function (resp) {
                $scope.groupOfSectionCtrl_loadSectionMeta();
    	    });

    	}
    	$scope.groupOfSectionCtrl_addMeta = function() {
    		$log.debug(' --- GroupOfSectionController.groupOfSectionCtrl_addMeta ');
    		$location.path(cfgAppPath.groupOfSectionNew);
    	} 
    	$scope.groupOfSectionCtrl_editSection = function(meta) {
    		$log.debug(' --- GroupOfSectionController.groupOfSectionCtrl_editSection - meta:', meta);
    		var id = 'null';
    		if(meta.sectionFK != '')
    			id = meta.sectionFK;
    		$location.path(cfgAppPath.sectionEdit.replace(':metaId', meta.id).replace(':id',id) );
    	} 
        	
    	$scope.toggleDetail = function($index) {
    	    $log.debug(' --- GroupOfSectionController.GroupOfSectionCtrl.toggleDetail - index:', $index);
            $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
        };
      	
    	
		// Total number of items in all pages.
		$scope.totalItems = 64;
		// Current page number. First page is 1
		$scope.currentPage = 1;
		// Limit number for pagination size.
		$scope.maxSize = 5;
		// Maximum number of items per page. A value less than one indicates all items on one page.
		$scope.itemsPerPage = 2;
		$scope.items = []; 
		$scope.groups = [];
		$scope.search = '';
		$scope.predicate;
    	$scope.reverse;
		var orderBy = $filter('orderBy');
		var filter = $filter('filter');

		$scope.groupOfSectionCtrl_loadSectionMeta = function() {
    		$log.debug(' --- GroupOfSectionController.groupOfSectionCtrl_loadSectionMeta ');
    		usSpinnerService.spin('spinner-1');
    		SectionMetaApi.list(
    				function (resp) {
    				    $log.debug(resp);
    					$scope.items = resp;
    					$scope.totalItems = $scope.items.length;
    					$scope.createSearchList();
    					usSpinnerService.stop('spinner-1');
                    });

    	};
    	$scope.groupOfSectionCtrl_loadSectionMeta();
    	
    	$scope.createSearchList = function (){
    		var filterList = filter($scope.items, $scope.search);
    		var orderByList = orderBy(filterList, $scope.predicate, $scope.reverse);
    		
    		$scope.totalItems = orderByList.length;
    		var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
    		$scope.groups = orderByList.slice(begin, end);
    	}
    	
    	$scope.order = function(predicate, reverse) {
    		$scope.predicate = predicate; 
    		$scope.reverse = reverse;
    		$scope.createSearchList();
    	};
    	$scope.order('originalTitle',true);
    	
    	$scope.pageChanged = function(page) {
    		$log.debug('Page changed to: ' + page);
    		$scope.currentPage = page;
    		$scope.createSearchList();
    	};
    	
    	$scope.groupOfSectionCtrl_searchTable = function(search) {
    		$scope.search = search;
    		$log.debug('Search: ' + $scope.search);
    		$scope.createSearchList();
    	}
    	
//    	$scope.$watch("search", function(query){
//    		$log.debug('$watch ' + query);
////	    	$scope.groups = $filter("filter")($scope.items, query);
//    	}, 350);
//    	 $scope.$watch( function( $scope ) {
//    		 console.log( "Function watched" );
//    			 // This becomes the value we're "watching".
//    		 
////    		 var list = $filter("filter")($scope.items, $scope.search);
////    		 $scope.groups = list.slice(begin, end);
//    		 return  ( $scope.search )
//    	 	}
//    	); 
       	
    	
}]);


sectionController.controller('UpdateGroupSectionCtrl', [
    '$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath', 'properties', 'SectionMetaApi', 'SettingService',
    function($rootScope, $scope, $routeParams, $location, $log, cfgAppPath, properties, SectionMetaApi, SettingService) {

		SettingService.getTagg($scope);
		SettingService.getCategory($scope);

		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		$scope.doSave = true;
//		$scope.$broadcast('show-errors-reset');
		
		if($routeParams.groupId != null){
			$scope.doSave = false;
			SectionMetaApi.get({Id: $routeParams.groupId}, function (resp) {
				$scope.sectionMeta = resp;
				$log.debug(resp);
			});	
		}else{
		    $scope.sectionMeta = {};
		}

        $scope.updateGroupSectionCtrl_addTagg = function () {
    	    $log.debug(' --- GroupOfSectionController.UpdateGroupSectionCtrl.addTagg - tagg:', $scope.newTagg);
            $scope.taggs.unshift($scope.newTagg);
            $scope.tagg = $scope.newTagg;
            $scope.updateGroupSectionCtrl_selectTagg($scope.newTagg);
            SettingService.updateTaggs($scope.newTagg);
        }

        $scope.updateGroupSectionCtrl_selectTagg = function (tagg) {
            $log.debug(' --- GroupOfSectionController.UpdateGroupSectionCtrl.selectTagg - tagg:', tagg);

            if(tagg != null){
                if(!Array.isArray($scope.sectionMeta.taggs)){
                    $scope.sectionMeta.taggs = []
                }
                $scope.sectionMeta.taggs.push(tagg);
            }
            tagg = '';
//            SettingService.updateTaggs(tagg);
        }

	    $scope.updateMeta = function (form) {
	    	$log.debug(' --- GroupOfSectionController.UpdateGroupSectionCtrl.updateMeta - meta:', $scope.sectionMeta);
	    	var sectionMeta = $scope.sectionMeta;
	    	SectionMetaApi.update({Id: sectionMeta.id}, sectionMeta, function (resp) {
	    		$location.path(cfgAppPath.groupOfSectionList);
	        });
//	    	$rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    };

	    $scope.updateGroupSectionCtrl_closeFilterItem = function (tagg) {
            $log.debug(' --- GroupOfSectionController.updateGroupSectionCtrl_closeFilterItem - tagg:', tagg);
            var index = $scope.sectionMeta.taggs.indexOf(tagg);
            if(index != -1){
                $scope.sectionMeta.taggs.splice( index, 1 );
            }

        };


	    $scope.saveMeta = function(form) {
	        $log.debug(' --- GroupOfSectionController.UpdateGroupSectionCtrl.saveMeta - meta:', $scope.sectionMeta);
//	        $scope.$broadcast('show-errors-check-validity');

	        SectionMetaApi.save($scope.sectionMeta, function (resp) {
	        	$location.path(cfgAppPath.sectionEdit.replace(':metaId', resp.id).replace(':id', 'null') );
	        });
//	         $rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");	           
	    }
}]);                                               