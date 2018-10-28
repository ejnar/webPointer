package se.webpoint.view

import grails.gorm.transactions.Transactional
import se.webpoint.rest.BasicRestController

import static org.springframework.http.HttpStatus.OK

class SettingController extends BasicRestController<Setting> {

	static allowedMethods = [update: "PUT"]

    SettingController() {
		super(Setting)
	}


    /**
     * Shows a single Setting
     * @param key The key of the Setting
     * @return The rendered resource or a 404 if it doesn't exist
     */
    def show() {
        log.debug '--- SettingController.show - params: [{}]', params
        Setting s = Setting.getSetting(params.id);
        println s
        respond s
    }



    /**
     * Updates a Setting for the given key
     * @param id
     */
    @Override
    @Transactional
    def update() {
        log.debug '--- SettingController.update - params: [{}]', params

        def instance = queryForResource(params.id)
        if (instance == null) {
            notFound()
            return
        }
        instance.properties = getObjectToBind()
        if (instance.hasErrors()) {
            respond instance.errors, view:'edit' // STATUS CODE 422
            return
        }
//        log.debug '--- SettingController.update - values: [{}]', instance.values
        instance.save flush:true

        addHeader(this.controllerName, instance.Id)
        respond instance, [status: OK]
    }


}
