package se.webpoint.view

import grails.rest.RestfulController;
import se.webpoint.data.GroupOfSection;

class SettingController extends RestfulController<Setting>{
	
	static responseFormats = ['json', 'xml']
	
    SettingController() {
		super(Setting)
	}
}
