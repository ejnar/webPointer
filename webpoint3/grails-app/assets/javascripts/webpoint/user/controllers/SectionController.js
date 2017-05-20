'use strict';

/* Controllers */

var sectionController = angular.module('webpoint.user');

sectionController.controller('UpdateSectionCtrl', [
    '$scope', '$routeParams', '$location', '$log', '$q', 'cfgAppPath', 'properties',
    'SectionsApi', 'ChangeKeyService', 'FileUploadService', 'Upload', '$timeout',
    function($scope, $routeParams, $location, $log, $q, cfgAppPath, properties,
        SectionsApi, ChangeKeyService, FileUploadService, Upload, $timeout) {

		$log.debug(' - SectionController.UpdateSectionCtrl: ' +  $location.path());
		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		$scope.keys = properties.keys;
		$scope.keyList = properties.keyList;

		$scope.doSave = true;

		
		if($routeParams.id != 'null' && $routeParams.id != ''){	
			$log.debug("SectionApi.get " + $routeParams.id);
			SectionsApi.get({Id: $routeParams.id}).$promise
				.then(function(resp) {	
					$scope.section = resp;
					$scope.doSave = false;
				});
		}

        $scope.updateSectionCtrl_updateToKey = function () {
            $log.debug(' --- SectionController.updateSectionCtrl_updateToKey:');
            $scope.section.data = ChangeKeyService.changeKey($scope.section, false);
            $scope.section.key = $scope.section.tokey;
        };

	    $scope.updateSectionCtrl_updateSection = function () {
	    	$log.debug(' --- SectionController.updateSectionCtrl_updateSection:');
            $log.debug(' section: ', $scope.section);

            $scope.section.data = $scope.section.data.stripHtml();
            $log.debug(' section: ', $scope.section);
	    	var promise = SectionsApi.update({Id: $scope.section.id}, $scope.section);
	    	
	    	$q.all([promise]).then(function(data) {
    			$location.path(cfgAppPath.SONGDATA_LIST);
    	    });
	    };
	    
		$scope.updateSectionCtrl_saveSection = function(form) {
			$log.debug(' --- SectionController.updateSectionCtrl_saveSection:');
			$log.debug($scope.section); 

			var section = $scope.section;

			SectionsApi.save(section).$promise
        		.then( function(resp) {
        		    $log.debug(resp);
        			$location.path(cfgAppPath.SONGDATA_LIST);
        		});
	    }

//	    $scope.updateSectionCtrl_onFileSelect = function() {
//            $log.debug(' --- SectionController.updateSectionCtrl_onFileSelect:');
//            $log.debug($scope.section);
//
//            var file = $scope.myFile;
//            $log.debug(file);
////            var uploadUrl = '/UploadLogo/upload'  // don't forget to include the leading /
//            FileUploadService.uploadSectionObjectFile($scope.section.id, file);
//        }

        $scope.$watch('files', function () {
//            $scope.upload($scope.files);
        });
        $scope.updateSectionCtrl_updateFile = function () {
            $log.debug(' --- SectionController.updateSectionCtrl_updateFile:');
            $log.debug($scope.files);
            $scope.upload($scope.files);
            $scope.files = {};

        }
//        $scope.$watch('file', function () {
//            if ($scope.file != null) {
//                $scope.files = [$scope.file];
//            }
//        });
        Upload.setDefaults({ngfMinSize: 10, ngfMaxSize:2000000000000});

        $scope.upload = function (files) {
            if (files && files.length) {
                var approved_size = files[0].size < 1000000000000 ? true: false
                $scope.file_size_warning = !approved_size;
                if(approved_size){
//                    for (var i = 0; i < files.length; i++) {
//                      var file = files[i];
//                      if (!file.$error) {
                        $log.debug('upload');
                        Upload.upload({
                            url: 'api/sections/upload/' + $scope.section.id,
                            headers : {
                                'enctype': 'multipart/form-data',
                                'Content-Type': undefined
                            },
                            data: {
                              files: files
                            }
                        }).then(function (resp) {
                            $log.debug('  ---- resp:', resp);
                            $scope.section = resp.data;

                        }, null, function (evt) {
                            $log.debug('  --- evt: ', evt);
                            var progressPercentage = parseInt(100.0 *
                                    evt.loaded / evt.total);
                            $log.debug('  --- progressPercentage: ', progressPercentage);
                        });
//                      }
//                    }

                }
                else{
                    $scope.files = {};
                }

            }
        };


}]);


sectionController.controller('GroupOfSectionCtrl', [
    '$scope', '$rootScope', '$routeParams', '$location', '$filter', '$log', 'cfgAppPath',
    'UserApi', 'SectionsApi', 'sharedProperties', 'usSpinnerService',
    function list ($scope, $rootScope, $routeParams, $location, $filter, $log, cfgAppPath,
    		UserApi, SectionsApi, sharedProperties, usSpinnerService) {

//		$scope.$on("LOAD_GROUPOFSECTION_EVENT", function () {   // event, args
//			$log.debug(' --- LOAD_GROUPOFSECTION_EVENT');     // + args.eventID
//			$scope.loadSection();
//		});

		// Total number of items in all pages.
		$scope.totalItems = 0;
		// Current page number. First page is 1
		$scope.currentPage = 1;
		// Limit number for pagination size.
		$scope.maxSize = 100;
		// Maximum number of items per page. A value less than one indicates all items on one page.
		$scope.itemsPerPage = 10;
		$scope.items = [];
		$scope.groups = [];
		$scope.search = '';
		$scope.predicate;
    	$scope.reverse;
		var orderBy = $filter('orderBy');
		var filter = $filter('filter');

		$scope.groupOfSectionCtrl_loadSection = function() {
    		$log.debug(' --- SectionController.groupOfSectionCtrl_loadSection ');
    		usSpinnerService.spin('spinner-1');

    		SectionsApi.list({max:1000}).$promise
                .then(function(resp) {
                    $log.debug(resp);
                    $scope.items = resp;
                    $scope.totalItems = $scope.items.length;
                    $scope.createSearchList();
                    usSpinnerService.stop('spinner-1');
                });

    	};
    	$scope.createSearchList = function (){
    		var filterList = filter($scope.items, $scope.search);
    		var orderByList = orderBy(filterList, $scope.predicate, $scope.reverse);

    		$scope.totalItems = orderByList.length;
    		var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
    		$scope.groups = orderByList.slice(begin, end);
    	}

    	$scope.groupOfSectionCtrl_editMeta = function(id) {
    		$log.debug(' --- SectionController.groupOfSectionCtrl_editMeta - id:', id);
    		$location.path(cfgAppPath.SONGDATA_EDIT + id );
    	}
    	$scope.groupOfSectionCtrl_delSection = function(section) {
    	    $log.debug(' --- SectionController.groupOfSectionCtrl_delSection - section:', section);
    	    SectionsApi.remove({Id: section.id}, function (resp) {
                $scope.groupOfSectionCtrl_loadSection();
    	    });

    	}
    	$scope.groupOfSectionCtrl_addMeta = function() {
    		$log.debug(' --- SectionController.groupOfSectionCtrl_addMeta ');
    		$location.path(cfgAppPath.SONGDATA_NEW);
    	}
    	$scope.groupOfSectionCtrl_editSection = function(section) {
    		$log.debug(' --- SectionController.groupOfSectionCtrl_editSection - section:', section);
    		$location.path(cfgAppPath.SONG_EDIT.replace(':id', section.id));
    	}

    	$scope.toggleDetail = function($index) {
    	    $log.debug(' --- SectionController.GroupOfSectionCtrl.toggleDetail - index:', $index);
            $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
        };

      	$scope.groupOfSectionCtrl_clickExpand = function(p) {
            $log.debug(' --- SectionController.groupOfSectionCtrl_clickExpand - id:', p.id );
            if(p.expanded){
                p.expanded = false;
            }else{
                p.expanded = true;
                $scope.indexes = [];
                $filter('filter')($scope.groups, function(g) {
                    if(p.id == g.id){
                        $scope.indexes.push( $scope.groups.indexOf(g)  );
                        return true;
                    }
                    return false;
                });
                $log.debug($scope.indexes);
                $scope.groups[$scope.indexes[0]].data = p.data;
                $scope.groups[$scope.indexes[0]].data = $scope.groups[$scope.indexes[0]].data.replaceAll('\n', '<br />');
            }
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
    '$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath', 'properties', 'SectionsApi', 'SettingService',
    function($rootScope, $scope, $routeParams, $location, $log, cfgAppPath, properties, SectionsApi, SettingService) {

		SettingService.getTagg($scope);
		SettingService.getCategory($scope);

		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		$scope.doSave = true;
//		$scope.$broadcast('show-errors-reset');

        init();
        function init(){
            if($routeParams.groupId != null){
                $scope.doSave = false;
                SectionsApi.get({Id: $routeParams.groupId}, function (resp) {
                    $scope.section = resp;
                });
            }else{
                $scope.section = {};
//                $scope.section.links = [];
            }
        }

		$scope.updateGroupSectionCtrl_addLink = function () {
            $log.debug(' --- SectionController.UpdateGroupSectionCtrl.addLink - link:', $scope.newLink);
            $scope.updateGroupSectionCtrl_selectLink($scope.newLink);
            $scope.newLink = '';
        }
        $scope.updateGroupSectionCtrl_selectLink = function (link) {
            $log.debug(' --- SectionController.UpdateGroupSectionCtrl.selectLink - link:', link);

            if(link != null){
                if(!Array.isArray($scope.section.links)){
                    $scope.section.links = []
                }
                $scope.section.links.push(link);
            }
        }
        $scope.updateGroupSectionCtrl_closeLinkItem = function (link) {
            $log.debug(' --- SectionController.updateGroupSectionCtrl_closeLinkItem - link:', link);
            removeItem(link,$scope.section.links);
        };


        $scope.updateGroupSectionCtrl_addTagg = function () {
    	    $log.debug(' --- SectionController.UpdateGroupSectionCtrl.addTagg - tagg:', $scope.newTagg);
            $scope.taggs.unshift($scope.newTagg);
            $scope.tagg = $scope.newTagg;
            $scope.updateGroupSectionCtrl_selectTagg($scope.newTagg);
            SettingService.updateTaggs($scope.newTagg);
        }
        $scope.updateGroupSectionCtrl_selectTagg = function (tagg) {
            $log.debug(' --- SectionController.UpdateGroupSectionCtrl.selectTagg - tagg:', tagg);
            if(tagg != null){
                if(!Array.isArray($scope.section.taggs)){
                    $scope.section.taggs = []
                }
                $scope.section.taggs.push(tagg);
            }
            tagg = '';
//            SettingService.updateTaggs(tagg);
        }
	    $scope.updateGroupSectionCtrl_closeFilterItem = function (tagg) {
            $log.debug(' --- SectionController.updateGroupSectionCtrl_closeFilterItem - tagg:', tagg);
            removeItem(tagg,$scope.section.taggs);
        };

	    $scope.updateMeta = function (form) {
	    	$log.debug(' --- SectionController.UpdateGroupSectionCtrl.updateMeta - meta:', $scope.section);
	    	var section = $scope.section;
	    	SectionsApi.update({Id: section.id}, section, function (resp) {
	    		$location.path(cfgAppPath.SONGDATA_LIST);
	        });
//	    	$rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    };

	    $scope.saveMeta = function(form) {
	        $log.debug(' --- SectionController.UpdateGroupSectionCtrl.saveMeta - section:', $scope.section);
//	        $scope.$broadcast('show-errors-check-validity');

	        SectionsApi.save($scope.section, function (resp) {
	            $log.debug(resp);
	        	$location.path(cfgAppPath.SONG_EDIT.replace(':id', resp.id) );
	        });
//	         $rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    }
}]);



function removeItem(item,list){
    var index = list.indexOf(item);
    if(index != -1){
        list.splice( index, 1 );
    }
}

