package se.webpoint.view

import grails.rest.RestfulController;

class SettingController extends RestfulController<Setting>{
	
	static responseFormats = ['json', 'xml']
	
    SettingController() {
		super(Setting)
	}
}
