'use strict';

/* Controllers */

var module = angular.module('webpoint.user');

    module.controller('PageListCtrl', PageListCtrl);
    PageListCtrl.$inject =  ['$scope', '$routeParams', '$location', '$timeout', '$q', '$log', '$uibModal', '$route', 'cfgAppPath', 'PageListApi'];

    function PageListCtrl ($scope, $routeParams, $location, $timeout, $q, $log, $uibModal, $route, cfgAppPath, PageListApi) {
        var pageList = this;

         pageList.openModel = openModel;
         pageList.goToViewAll = goToViewAll;
         pageList.editPageList = editPageList;
         pageList.delPageList = delPageList;
         pageList.changeName = changeName;


        function init(){
            $log.debug(" --- PageListController.pageListCtrl.init:");
            $scope.listOfPages = PageListApi.list2();
        }

    	function openModel(){
    	    modal(null);
    	}

    	function editPageList(id) {
    		$log.debug(" --- PageListController.pageListCtrl_editPageList - id:", id);
    		$location.path(cfgAppPath.PAGE_UPDATE + id );
    	}
  	
    	function delPageList(id) {
    	    $log.debug(" --- PageListController.pageListCtrl_delPageList - id:", id);
    		PageListApi.remove({Id: id},
    			function (resp) {
    				$scope.listOfPages = PageListApi.list2();
    		    }
    		);
    	}

    	function changeName(id) {
            $log.debug(" --- PageListController.pageListCtrl_changeName - id:", id);
            modal(id);
        }

        function modal(id){
            var modalInstance = $uibModal.open({
                templateUrl: cfgAppPath.ceatePageModal,
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return id;
                    }

                }
            });
            modalInstance.closed.then(function(){
                $scope.listOfPages = PageListApi.list2();
            });
        }

    	function goToViewAll(){
            $log.debug(" --- PageListController.pageListCtrl_goToViewAll ");
            $location.path(cfgAppPath.SONGS_VIEW);
        }

        init();
    }

    module.controller('ViewAllSongsCtrl', ViewAllSongsCtrl);
    ViewAllSongsCtrl.$inject =  ['$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$q', '$log', '$uibModal',
        'cfgAppPath', 'SectionsApi', 'BinaryApi'];

    function ViewAllSongsCtrl ($scope, $rootScope, $routeParams, $location, $timeout, $q, $log, $uibModal,
        cfgAppPath, SectionsApi, BinaryApi) {
        $log.debug(' - PageListController.ViewAllSongsCtrl:');


		$scope.viewAllSongsCtrl_loadSongList = function() {
			$log.debug(" --- PageListController.viewAllSongsCtrl_loadSongList:");

            SectionsApi.list({max: 1000}).$promise
                .then( function(resp) {
                    $log.debug(resp);
                    $scope.sectionList = resp;
                    angular.forEach($scope.sectionList, function(s) {
                        if(s.type == 'IMAGE'){
                            s.binary = BinaryApi.get({Id: s.id}).$promise
                        }
                    });
            });
    	}

    	$scope.pageListCtrl_goToViewAll = function() {
            $log.debug(" --- PageListController.pageListCtrl_goToViewAll ");
            $location.path(cfgAppPath.SONGS_VIEW);
        }

        $scope.pageListCtrl_backPageList = function(id) {
            $log.debug(" --- PageListController.pageListCtrl_editPageList - id:", id);
            $location.path(cfgAppPath.PAGE_UPDATE + id );
        }

    }

    module.controller('ModalInstanceCtrl', ModalInstanceCtrl);
    ModalInstanceCtrl.$inject = [ '$scope', '$location', '$uibModalInstance', '$log', 'cfgAppPath', 'PageListApi', 'data'];

    function ModalInstanceCtrl ($scope, $location, $uibModalInstance, $log, cfgAppPath, PageListApi, data) {
        $log.debug(' - PageListController.ModalInstanceCtrl:');
	    function init(){
            $log.debug(" --- PageListController.modalInstanceCtrl.init:");
            if(data != null) {
                PageListApi.get({Id: data }, function(resp) { $log.debug(resp); $scope.pageList = resp; });
            }

        }
	    $scope.modalInstanceCtrl_addPageList = function () {
   		    if(data != null) {
                $log.debug(" --- PageListController.modalInstanceCtrl_updatePageList:" + data);
                PageListApi.update({Id: data}, $scope.pageList,
                    function (resp) {
                        $uibModalInstance.close('close');
                        $location.path(cfgAppPath.PAGE_LIST);
                    });
            } else {
                $log.debug(" --- PageListController.modalInstanceCtrl_addPageList:" );
                PageListApi.save($scope.pageList,
                    function (resp) {
                        $uibModalInstance.close('close');
                        $location.path(cfgAppPath.PAGE_UPDATE + resp.id);
                    });
			}
	    };
	    $scope.modalInstanceCtrl_cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	    };
	    init();
    }

    module.controller('UpdatePageListCtrl', UpdatePageListCtrl);
	UpdatePageListCtrl.$inject = ['$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath', 'properties',
	    'SectionsApi', 'PageListApi', 'PageListDataApi', '$filter', 'SettingService', 'PageService'];

    function UpdatePageListCtrl ($rootScope, $scope, $routeParams, $location, $log,
        cfgAppPath, properties, SectionsApi, PageListApi, PageListDataApi, $filter, SettingService, PageService) {
        var updatePageList = this;

        updatePageList.alphabetFilter = alphabetFilter;
        updatePageList.loadSectionList = loadSectionList;
        updatePageList.pickFilterCategory = pickFilterCategory;
        updatePageList.closeFilterItem = closeFilterItem;
        updatePageList.filterAndChange = filterAndChange;
        updatePageList.convertSectionType = convertSectionType;
        updatePageList.loadPageList = loadPageList;
        updatePageList.addSectionToList = addSectionToList;
        updatePageList.delPageData = delPageData;

        $scope.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

		function loadSectionList() {
            $log.debug(" --- PageListController.updatePageListCtrl_loadSectionList");
//            SettingService.getCategory($scope);
//            SettingService.getFilterItems($scope);
            $scope.choosenCategory = [];
            SectionsApi.list({max: 1000, publish:true}).$promise
                .then( function(resp) {
                    $log.debug(resp);
                    $scope.meta = resp;
                    $scope.metaFilteredList = resp;
                    loadPageList();
            });
		}

        function alphabetFilter(char) {
            $log.debug(" --- PageListController.updatePageListCtrl_alphabetFilter " + char);
            if(char){
                $scope.metaFilteredList = $filter('filter')($scope.meta, function (o) {
                    return o.title.search(new RegExp('^' + char , "i")) == 0;
                });
            }else{
                $scope.metaFilteredList = $scope.meta;
            }
        };

		function pickFilterCategory(category) {
            $log.debug(" --- PageListController.updatePageListCtrl_pickFilterCategory " + category);
            $scope.choosenCategory.push(category);
            $scope.metaFilteredList = $scope.meta.filter(function (meta) {
                 return filterSearch($scope.choosenCategory, meta, $scope.filterAnd);
            });
		};

        function closeFilterItem(category) {
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
        function filterAndChange () {
            $log.debug(" --- PageListController.updatePageListCtrl_filterAndChange ");
            $scope.choosenCategory = [];
        };

        function convertSectionType(type) {
            $log.debug(" --- PageListController.updatePageListCtrl_convertSectionType type: " + type);

            return SettingService.getSectionType(type);
        };

		function loadPageList() {
		    $log.debug(" --- PageListController.updatePageListCtrl_loadPageList - pageListId: ", $routeParams.pageListId);

	        PageListApi.get({Id: $routeParams.pageListId}).$promise
			    .then( function(resp) {
//                    $log.debug(resp);
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


		function addSectionToList(section) {
			$log.debug(" --- PageListController.updatePageListCtrl_addSectionToList - section:", section);

            PageService.addSectionToList($routeParams.pageListId, section).$promise
                .then( function(resp) {
                    loadPageList();
                });
		}

		function delPageData(pageData) {
			$log.debug(" --- PageListController.updatePageListCtrl_delPageData - pageData:", pageData);
			PageListDataApi.remove({pageListId: $routeParams.pageListId, Id: pageData.key},
					function (resp) {
					    $log.debug(resp);
						loadSectionList();
					});
			
		}
		
    }

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


