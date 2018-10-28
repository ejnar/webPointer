'use strict';

var app = angular.module('webpoint.core');


    app.filter('removeHTMLTags', removeHTMLTags);
    function removeHTMLTags() {
        return remove;
        function remove (text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';  // this.replace(/(<([^>]+)>)/ig,"");
        };
    }

    app.filter('gethost', gethost);
    function gethost() {
    	return parse;
    	function parse(href){

    		if(href == null || href == 'undefined'){
    			return '';
    		}else{
    		    var l = document.createElement("a");
                l.href = href;
                return l.hostname;
    		}
    	}
    }
