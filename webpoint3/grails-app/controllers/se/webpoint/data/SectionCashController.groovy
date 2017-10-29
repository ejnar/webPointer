package se.webpoint.data

import grails.transaction.Transactional
import org.bson.types.ObjectId
import se.webpoint.rest.BasicRestController

import static org.springframework.http.HttpStatus.CREATED


class SectionCashController extends BasicRestController<SectionCash> {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT"]


    SectionCashController() {
        super(SectionCash)
    }


    /**
     * Lists all resources up to the given maximum
     *
     * @param max The maximum
     * @return A list of resources
     */
    def index(Integer max) {
        log.info " --- SectionCashController.index:"
        params.max = Math.min(max ?: 10, 100)

        respond SectionCash.list(params), model:[sectionCashCount: SectionCash.count()]
    }

    /**
     * Shows a single resource
     * @param id The id of the resource
     * @return The rendered resource or a 404 if it doesn't exist
     */
    def show() {
//        log.info " --- SectionCashController.show:"

        SectionCash sectionCash = SectionCash.findByPageListId(params.id)
//        if(sectionCash) {
//            sectionCash.section = Section.findById(new ObjectId(sectionCash.currentSectionId));
//        }
        this.addHeader("sectionCash", params.id)
        respond sectionCash
    }

    /**
     * Saves a resource
     */
    @Override
    @Transactional
    def save() {
        log.info " --- SectionCashController.save:"
        log.debug params

        def instance = createResource()
        if(instance == null){
            notFound()
            return
        }
        List sectionCash = SectionCash.findAllByPageListId(instance.pageListId);
        log.debug sectionCash[0]
        access()
        if(sectionCash.isEmpty()) {
            instance.insert flush: true
        }else{
            sectionCash[0].delete flush:true
            instance.insert flush:true
        }


        addHeader(this.controllerName, instance.pageListId)
        respond instance, [status: CREATED]
    }


}
