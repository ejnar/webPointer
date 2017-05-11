package se.webpoint.view

import grails.transaction.Transactional
import org.springframework.http.HttpStatus
import se.webpoint.rest.BasicRestController

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
        log.info " --- SettingController.show:"
        log.debug params
        respond Setting.getSetting(params.id)
    }



    /**
     * Updates a Setting for the given key
     * @param id
     */
    @Override
    @Transactional
    def update() {
        log.info " --- SettingController.update: "
        log.debug params

        def instance = queryForResource(params.id)
        log.debug instance
        if (instance == null) {
            notFound()
            return
        }
        instance.properties = getObjectToBind()
        if (instance.hasErrors()) {
            respond instance.errors, view:'edit' // STATUS CODE 422
            return
        }
        log.debug instance.values
        instance.save flush:true

        addHeader(this.controllerName, instance.Id)
        respond instance, [status: HttpStatus.OK]
    }


}
