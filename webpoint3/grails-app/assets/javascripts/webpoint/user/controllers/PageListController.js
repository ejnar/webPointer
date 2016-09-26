'use strict';

/* Controllers */

var sectionController = angular.module('webpoint.user');

sectionController.controller('PageListCtrl', [
    '$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$q', '$log', '$uibModal',
    'tmpCash', 'cfgAppPath', 'PageListApi', 'sharedProperties',
    function ($scope, $rootScope, $routeParams, $location, $timeout, $q, $log, $uibModal,
        tmpCash, cfgAppPath, PageListApi, sharedProperties) {
        $log.debug(' - PageListController.PageListCtrl:');

		$scope.pageListCtrl_loadPageList = function() {
			$log.debug(" --- PageListController.pageListCtrl_loadPageList:");
//			$scope.viewLoading = true;
    		PageListApi.list(
    				function (resp) {
    					$scope.listOfPages = resp;
//    					$scope.viewLoading = false;
                    });
    		$scope.orderProp = 'name';
    	}

    	$scope.pageListCtrl_openModel = function () {
    		var modalInstance = $uibModal.open({
    			templateUrl: cfgAppPath.ceatePageModal,
    			controller: 'ModalInstanceCtrl',
    			size: 'lg'
    		});
    	};
    	
//    	$scope.addPageList = function(form) {
//    		$log.debug(" --- PageListController.PageListCtrl.addPageList");
//    		PageListApi.save($scope.pageList,
//					function (resp) {
//    					$log.debug(resp);
////    					tmpCash.put('PageList', resp);
//    					$location.path(cfgAppPath.groupOfPagesUpdate + resp.id);
//			    	});
//    	}
    	
    	$scope.pageListCtrl_editPageList = function(id) {
    		$log.debug(" --- PageListController.pageListCtrl_editPageList - id:", id);
    		$location.path(cfgAppPath.groupOfPagesUpdate + id );
    	}
  	
    	$scope.pageListCtrl_delPageList = function(id) {
    	    $log.debug(" --- PageListController.pageListCtrl_delPageList - id:", id);
    		PageListApi.remove({Id: id},
    			function (resp) {
    				$log.debug("remove success PageList");
    				$scope.pageListCtrl_loadPageList();
    			});
    	}

    	$scope.pageListCtrl_goToViewAll = function() {
            $log.debug(" --- PageListController.pageListCtrl_goToViewAll ");
            $location.path(cfgAppPath.viewAllSongs);
        }
}]);


sectionController.controller('ViewAllSongsCtrl', [
    '$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$q', '$log', '$uibModal',
    'tmpCash', 'cfgAppPath', 'PageListApi', 'sharedProperties',
    function ($scope, $rootScope, $routeParams, $location, $timeout, $q, $log, $uibModal,
        tmpCash, cfgAppPath, PageListApi, sharedProperties) {
        $log.debug(' - PageListController.ViewAllSongsCtrl:');


		$scope.viewAllSongsCtrl_loadSongList = function() {
			$log.debug(" --- PageListController.viewAllSongsCtrl_loadSongList:");

    		PageListApi.list(
    				function (resp) {
    					$scope.listOfPages = resp;

                    });
    		$scope.orderProp = 'name';
    	}


    	$scope.pageListCtrl_goToViewAll = function() {
            $log.debug(" --- PageListController.pageListCtrl_goToViewAll ");
            $location.path(cfgAppPath.viewAllSongs);
        }

}]);




sectionController.controller('ModalInstanceCtrl',[ '$scope', '$location', '$uibModalInstance', '$log', 'cfgAppPath', 'PageListApi',

    function ($scope, $location, $uibModalInstance, $log, cfgAppPath, PageListApi) {
        $log.debug(' - PageListController.ModalInstanceCtrl:');
	    $scope.modalInstanceCtrl_addPageList = function () {
   		    $log.debug(" --- PageListController.modalInstanceCtrl_addPageList:");
		    PageListApi.save($scope.pageList,
			    function (resp) {
				    $log.debug(resp);
				    $uibModalInstance.close('close');
				    $location.path(cfgAppPath.groupOfPagesUpdate + resp.id);
			    });

	    };

	    $scope.modalInstanceCtrl_cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	    };
}]);




sectionController.controller('UpdatePageListCtrl', [
	'$rootScope', '$scope', '$routeParams', '$location', '$log',
	'cfgAppPath', 'properties', 'SectionMetaApi', 'SectionsApi', 'PageListApi', 'PageListDataApi', '$filter', 'SettingService',
    function($rootScope, $scope, $routeParams, $location, $log,
        cfgAppPath, properties, SectionMetaApi, SectionsApi, PageListApi, PageListDataApi, $filter, SettingService) {
        $log.debug(' - PageListController.UpdatePageListCtrl:');

		$scope.updatePageListCtrl_loadSectionMetaList = function() {
            $log.debug(" --- PageListController.updatePageListCtrl_loadSectionMetaList");
            SettingService.getCategory($scope);
            SettingService.getFilterItems($scope);
            $scope.choosenCategory = [];
            SectionMetaApi.list(function (resp) {
                $log.debug(resp);
                $scope.meta = resp;
                $scope.metaFilteredList = resp;
                $scope.updatePageListCtrl_loadPageList();
            });
   		    $scope.orderProp = 'title';
		}


		$scope.updatePageListCtrl_pickFilterCategory = function(category) {
            $log.debug(" --- PageListController.updatePageListCtrl_pickFilterCategory " + category);
            $scope.choosenCategory.push(category);
            $scope.metaFilteredList = $scope.meta.filter(function (meta) {
                 return filterSearch($scope.choosenCategory, meta, $scope.filterAnd);
            });
		};

        $scope.updatePageListCtrl_closeFilterItem = function(category) {
            $log.debug(" --- PageListController.updatePageListCtrl_closeFilterItem " + category);
            var index = $scope.choosenCategory.indexOf(category);
            if(index != -1){
                $scope.choosenCategory.splice( index, 1 );
            }
            if($scope.choosenCategory.length > 0){
                $scope.metaFilteredList = $scope.meta.filter(function (meta) {
                    return filterSearch($scope.choosenCategory, meta, $scope.filterAnd);
                });
            }else{
                $scope.metaFilteredList = $scope.meta;
            }
        };
        $scope.updatePageListCtrl_filterAndChange = function() {
            $log.debug(" --- PageListController.updatePageListCtrl_filterAndChange ");
            $scope.choosenCategory = [];
        };

        $scope.updatePageListCtrl_convertSectionType = function(type) {
            $log.debug(" --- PageListController.updatePageListCtrl_convertSectionType type: " + type);

            return SettingService.getSectionType(type);
        };

		$scope.updatePageListCtrl_loadPageList = function() {
		    $log.debug(" --- PageListController.updatePageListCtrl_loadPageList - pageListId: ", $routeParams.pageListId);

	        PageListApi.get({Id: $routeParams.pageListId}).$promise
			    .then( function(resp) {
                    $log.debug(resp);
	    		    $scope.pageDataList = resp;
//	    		    angular.forEach($scope.pageDataList.pageParts, function(d) {
//                        $log.debug(d);
//                        $log.debug(d.sectionMeta);
////                        angular.forEach(d.sectionMeta, function(c) {
////                            $log.debug(c);
////                        });
//                    });

			    });
		    $scope.orderProp = 'title';
		}


		$scope.updatePageListCtrl_addSectionToList = function(meta) {
			$log.debug(" --- PageListController.updatePageListCtrl_addSectionToList - meta:", meta);

			var pageItem = {};
			pageItem.key = '';
			pageItem.color = 'white';
			pageItem.style = 'default';
//			pageData.sections = [];
			pageItem.sectionMeta = meta;
//			pageData.sectionMetas.push(meta);

            PageListDataApi.save({pageListId: $routeParams.pageListId}, pageItem,    //
                function (resp) {
            	    $log.debug(resp);
            		$scope.updatePageListCtrl_loadPageList();
            	});
		}

		$scope.updatePageListCtrl_delPageData = function(pageData) {
			$log.debug(" --- PageListController.updatePageListCtrl_delPageData - pageData:", pageData);
			PageListDataApi.remove({pageListId: $routeParams.pageListId, Id: pageData.key},
					function (resp) {
					    $log.debug(resp);
						$scope.updatePageListCtrl_loadSectionMetaList();
					});
			
		}
		$scope.updatePageListCtrl_backToList = function() {
			$location.path(cfgAppPath.groupOfPagesList);
		}
		
}]);

function filterSearch(choosenCategory, meta, filterAnd){
    var isCategory = choosenCategory.indexOf(meta.category) !== -1;
    var is = false;
    angular.forEach(meta.taggs, function(tagg) {
        var isTagg = choosenCategory.indexOf(tagg) !== -1;
        if(filterAnd){
            if(isCategory && isTagg){
                is = true;
            }
        }else{
            if(isCategory || isTagg){
                is = true;
            }
        }
    });
    if(meta.taggs == null || meta.taggs.length < 1){
        is = isCategory;
    }
    return is;
}


