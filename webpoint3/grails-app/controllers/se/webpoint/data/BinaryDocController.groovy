package se.webpoint.data

import org.bson.types.ObjectId
import se.webpoint.rest.BasicRestController

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class BinaryDocController extends BasicRestController<BinaryDoc> {

    static responseFormats = ['json']
    static allowedMethods = []


    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond BinaryDoc.list(params), model:[binaryDocCount: BinaryDoc.count()]
    }

    def show() {
        log.info " --- BinaryDocController.show:"
        println params

        List list = BinaryDoc.findAllBySection(new ObjectId(params.id))
        list.each {
            it.convertToBase64()
        }
        this.addHeader("binarydoc", params.id)
        respond list
    }





//    /**
//     * Lists all resources up to the given maximum
//     *
//     * @param max The maximum
//     * @return A list of resources
//     */
//    def index(Integer max) {
//        log.info " --- BinaryDocController.index:"
//        println params
//        params.max = Math.min(max ?: 10, 100)
//        respond listAllResources(params), model: [("${resourceName}Count".toString()): countResources()]
//    }
//
//    /**
//     * Shows a single resource
//     * @param id The id of the resource
//     * @return The rendered resource or a 404 if it doesn't exist
//     */
//    def show() {
//        log.info " --- BinaryDocController.show:"
//        println params
//        respond queryForResource(params.id)
//    }


//    @Transactional
//    def save(BinaryDoc binaryDoc) {
//        if (binaryDoc == null) {
//            transactionStatus.setRollbackOnly()
//            render status: NOT_FOUND
//            return
//        }
//
//        if (binaryDoc.hasErrors()) {
//            transactionStatus.setRollbackOnly()
//            respond binaryDoc.errors, view:'create'
//            return
//        }
//
//        binaryDoc.save flush:true
//
//        respond binaryDoc, [status: CREATED, view:"show"]
//    }
//
//    @Transactional
//    def update(BinaryDoc binaryDoc) {
//        if (binaryDoc == null) {
//            transactionStatus.setRollbackOnly()
//            render status: NOT_FOUND
//            return
//        }
//
//        if (binaryDoc.hasErrors()) {
//            transactionStatus.setRollbackOnly()
//            respond binaryDoc.errors, view:'edit'
//            return
//        }
//
//        binaryDoc.save flush:true
//
//        respond binaryDoc, [status: OK, view:"show"]
//    }
//
//    @Transactional
//    def delete(BinaryDoc binaryDoc) {
//
//        if (binaryDoc == null) {
//            transactionStatus.setRollbackOnly()
//            render status: NOT_FOUND
//            return
//        }
//
//        binaryDoc.delete flush:true
//
//        render status: NO_CONTENT
//    }
}
