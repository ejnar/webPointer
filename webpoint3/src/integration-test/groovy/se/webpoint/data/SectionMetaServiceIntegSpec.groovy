package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import org.springframework.beans.factory.annotation.Autowired
import se.webpoint.util.BaseSpecification

@Integration
@Rollback
class SectionMetaServiceIntegSpec extends BaseSpecification {


    @Autowired
    SectionMetaService service

    SpringSecurityService mockSecurityService = Mock(SpringSecurityService)

    Section section
    SectionMeta sectionMeta

//    def setupAll() {
//        sectionMeta = setupSectionMeta('SectionMetaServiceInteg')
//        section = setupSection(sectionMeta)
//    }
//
//    def cleanupAll(){
//        section.delete flush:true
//        sectionMeta.delete flush:true
//    }

    void "test _saveSectionMeta"() {
        given:
        SectionMeta instance = new SectionMeta(title: 'SectionMetaServiceInteg2', language: 'ENG')


        when:
        SectionMeta savedSM = service.saveSectionMeta(instance)

        then:
        savedSM != null
        savedSM.title.equals('SectionMetaServiceInteg2')

        cleanup:
        savedSM.delete flush:true

    }
}
