'use strict';

/* Controllers */

var module = angular.module('webpoint.user');

    module.controller('UpdateSectionCtrl', UpdateSectionCtrl);
    UpdateSectionCtrl.$inject =  ['$scope', '$routeParams', '$location', '$log', '$q', 'cfgAppPath', 'properties',
                                    'SectionsApi', 'BinaryApi', 'ChangeKeyService', 'FileUploadService', 'Upload', '$timeout', '$filter'];
    function UpdateSectionCtrl ($scope, $routeParams, $location, $log, $q, cfgAppPath, properties,
            SectionsApi, BinaryApi, ChangeKeyService, FileUploadService, Upload, $timeout, $filter) {

		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		$scope.keys = properties.keys;
		$scope.keyList = properties.keyList;

		$scope.doSave = true;

        function init(){
            $log.debug(' - SectionController.UpdateSectionCtrl.init: ' +  $location.path());
            if($routeParams.id != 'null' && $routeParams.id != ''){
                $log.debug("SectionApi.get " + $routeParams.id);

                SectionsApi.get({Id: $routeParams.id}).$promise
                    .then(function(resp) {
                        $scope.section = resp;
                        $scope.doSave = false;
                        initColumn();
                        $scope.binaryDocs = BinaryApi.get({Id: resp.id});
                    });
            }
        }

        $scope.updateSectionCtrl_updateToKey = function () {
            $log.debug(' --- SectionController.updateSectionCtrl_updateToKey:');
            $scope.section.data = ChangeKeyService.changeKey($scope.section, false);
            $scope.section.key = $scope.section.tokey;
        };

        function initColumn(){
            if($scope.section.data != null && $scope.section.data.indexOf('-column2-') > 0){
                $scope.column2 = true;
                splitColumn();
                var col = $scope.section.data.split('-column2-');
                if(col.length > 1){
                    $scope.section.data = col[0].trim();
                    $scope.data2 = col[1].trim();
                }

            }
        }

        function trimRow() {
            $scope.section.data = $scope.section.data.stripHtml();
            var lines = $scope.section.data.split('\n');
            var data = '';
            angular.forEach(lines, function(line) {
                line = line.rtrim();
                data = data + line + '\n';
            });
            $scope.section.data = data;
        };

	    $scope.updateSectionCtrl_updateSection = function () {
	    	$log.debug(' --- SectionController.updateSectionCtrl_updateSection:');
            trimRow();
            var section = copyColumn2();
	    	SectionsApi.update({Id: section.id}, section);
//	    	$q.all([promise]).then(function(data) {  });
	    };
	    
		$scope.updateSectionCtrl_saveSection = function(form) {
			$log.debug(' --- SectionController.updateSectionCtrl_saveSection:');
            trimRow();
            var section = copyColumn2();
            var promise = SectionsApi.save(section);
            $q.all([promise]).then(function(data) {  });
	    }

	    function copyColumn2(){
	        var section = angular.copy($scope.section);
            if($scope.data2 && $scope.data2.length > 0){
                section.data += '\n-column2-\n' + $scope.data2
            }
            return section;
        }

        $scope.updateSectionCtrl_gotoList = function() {
            $location.path(cfgAppPath.SONGDATA_LIST);
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
        $scope.max_width_textarea = "max_with_col1";
        $scope.updateSectionCtrl_addColumn2 = function() {
//            $log.debug('updateSectionCtrl_addColumn2 ' + $scope.column2);
            splitColumn();
        }

        function splitColumn(){
             if($scope.column2){
                $scope.max_width_textarea = "max_with_col2";
            }else{
                $scope.max_width_textarea = "max_with_col1";
            }
        }

        init();
    }

    module.controller('GroupOfSectionCtrl', GroupOfSectionCtrl);
    GroupOfSectionCtrl.$inject =  ['$scope', '$rootScope', '$routeParams', '$location', '$filter', '$log',
                                    'cfgAppPath', 'hashMap', 'UserApi', 'SectionsApi'];
    function GroupOfSectionCtrl ($scope, $rootScope, $routeParams, $location, $filter, $log, cfgAppPath,
    		hashMap, UserApi, SectionsApi) {
//		$scope.$on("LOAD_GROUPOFSECTION_EVENT", function () {   // event, args
//			$log.debug(' --- LOAD_GROUPOFSECTION_EVENT');     // + args.eventID
//			$scope.loadSection();
//		});

		// Total number of items in all pages.
		$scope.totalItems = 0;
		// Current page number. First page is 1
		$scope.currentPage = 1;
		// Limit number for pagination size.
		$scope.maxSize = 1000;
		// Maximum number of items per page. A value less than one indicates all items on one page.
		$scope.itemsPerPage = 20;
		$scope.items = [];
		$scope.groups = [];
		$scope.predicate = 'title';
    	$scope.reverse = false;


        function init(){
            $log.debug(' --- GroupOfSectionCtrl.init ');
            $scope.search = hashMap.get('SEARCH_VALUE');
            loadSection();
        }

		function loadSection() {
    		SectionsApi.list({max:$scope.maxSize}).$promise
                .then(function(resp) {
                    $scope.items = resp;
                    $scope.totalItems = $scope.items.length;
                    createSearchList();
                });
    	}

    	$scope.groupOfSectionCtrl_editMeta = function(id) {
    		$log.debug(' --- SectionController.groupOfSectionCtrl_editMeta - id:', id);
    		$location.path(cfgAppPath.SONGDATA_EDIT + id );
    	}
    	$scope.groupOfSectionCtrl_delSection = function(section) {
    	    SectionsApi.remove({Id: section.id}, function (resp) {
                loadSection();
    	    });

    	}
    	$scope.groupOfSectionCtrl_addMeta = function() {
    		$log.debug(' --- SectionController.groupOfSectionCtrl_addMeta ');
    		$location.path(cfgAppPath.SONGDATA_NEW);
    	}
    	$scope.groupOfSectionCtrl_editSection = function(section) {
//    		$log.debug(' --- SectionController.groupOfSectionCtrl_editSection - section:', section);
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
    		createSearchList();
    	};
    	$scope.order('title',false);

    	$scope.pageChanged = function(page) {
    		$log.debug('Page changed to: ' + page);
    		$scope.currentPage = page;
    		createSearchList();
    	};

    	$scope.groupOfSectionCtrl_searchTable = function(search) {
//    		$scope.search = search;
    		hashMap.put('SEARCH_VALUE', search);
    		createSearchList();
    	}

        function createSearchList (){
    		var filterList = $filter('filter')($scope.items, hashMap.get('SEARCH_VALUE'));
    		var orderByList = $filter('orderBy')(filterList, $scope.predicate, $scope.reverse);

    		$scope.totalItems = orderByList.length;
    		var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
    		$scope.groups = orderByList.slice(begin, end);
    	}
    	init();
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


    }

    module.controller('UpdateGroupSectionCtrl', UpdateGroupSectionCtrl);
    UpdateGroupSectionCtrl.$inject =  ['$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath',
                                        'properties', 'SectionsApi', 'SettingService'];
    function UpdateGroupSectionCtrl($rootScope, $scope, $routeParams, $location, $log, cfgAppPath, properties, SectionsApi, SettingService) {

		SettingService.getTagg($scope);
		SettingService.getCategory($scope);

		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		$scope.doSave = true;
//		$scope.$broadcast('show-errors-reset');

        init();
        function init(){
            $log.debug(' - SectionController.UpdateGroupSectionCtrl.init: ');
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
            $log.debug(' --- SectionController.UpdateGroupSectionCtrl.addLink - link:', $scope.link);
            $scope.updateGroupSectionCtrl_selectLink($scope.link);
            $scope.link = {};
        }

        $scope.updateGroupSectionCtrl_selectLink = function (link) {
            $log.debug(' --- SectionController.UpdateGroupSectionCtrl.selectLink - link:', link);

            if(link != null){
                if(!Array.isArray($scope.section.oLinks)){
                    $scope.section.oLinks = []
                }
                $scope.section.oLinks.push(link);
            }
        }
        $scope.updateGroupSectionCtrl_closeLinkItem = function (link) {
            $log.debug(' --- SectionController.updateGroupSectionCtrl_closeLinkItem - link:', link);
            removeItem(link,$scope.section.oLinks);
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

	    $scope.updateGroupSectionCtrl_editSection = function() {
            $location.path(cfgAppPath.SONG_EDIT.replace(':id', $scope.section.id));
        }

    }



function removeItem(item,list){
    var index = list.indexOf(item);
    if(index != -1){
        list.splice( index, 1 );
    }
}

