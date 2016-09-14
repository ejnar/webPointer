package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional
import org.apache.commons.logging.LogFactory
import org.grails.web.errors.GrailsWrappedRuntimeException

@Transactional
class SectionMetaService {


    private static final log = LogFactory.getLog(this)
    SpringSecurityService springSecurityService



    def save(Id, sectionFK, SectionData){

        SectionMeta meta = SectionMeta.findById(Id);
        println meta
        println SectionData
        meta.sectionFK = sectionFK
//        meta.sectionData = []; //new ArrayList<SectionData>();

        meta.sectionData = SectionData;

        meta.save flush: true  //, failOnError: true
//        meta.errors.allErrors.each { println it }

    }

    @Transactional
    def saveSectionMeta(SectionMeta instance){
        log.debug(' - S - saveSectionMeta')
//        instance.validate()
//        if (instance.hasErrors()) {
////            def errMsgList = instance.errors.allErrors.collect{g.message([error : it])}
//            throw new GrailsWrappedRuntimeException()
//        }
        instance.save flush: true
        instance
    }

    @Transactional
    def deleteSectionMeta(SectionMeta instance){
        log.debug(' --- Delete SectionMeta')
        instance.validate()
        if (instance.hasErrors()) {
            throw new GrailsWrappedRuntimeException()
        }
        try {
            Section section = Section.findById(instance.sectionFK)
            section.delete flush:true

        } catch(ALL) {
            log.error(' Fail to delete Section')
        }
        try {

            instance.delete flush:true
        } catch(ALL) {
            log.error(' Fail to delete SectionMeta')
        }

    }

}
