package se.webpoint.view

import grails.rest.RestfulController;
import se.webpoint.data.PageList;

class ViewerListController extends RestfulController<PageList> {

	
	static responseFormats = ['json', 'xml']
	
    ViewerListController() {
		super(PageList)
	}
}
