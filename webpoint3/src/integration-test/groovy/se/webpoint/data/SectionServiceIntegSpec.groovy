package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import org.springframework.beans.factory.annotation.Autowired
import se.webpoint.auth.User
import se.webpoint.util.BaseSpecification

@Integration
@Rollback
class SectionServiceIntegSpec extends BaseSpecification {

    @Autowired
    SectionService service

    SpringSecurityService mockSecurityService = Mock(SpringSecurityService)

    void "test getSection"() {
        given:
        Section section = setupSection('SectionServiceIntegSpec1')

        expect:
        service.getSection(section.id).key.equals('C')

        cleanup:
        section.delete flush:true
    }

    void "test saveSection"() {
        given:
        User user = setupUser('SectionServiceIntegSpec2')
        mockSecurityService.loadCurrentUser() >> user
        service.springSecurityService = mockSecurityService
        Section instance = new Section(title: 'SectionServiceIntegSpec2', category: 'category', language: 'ENG', data: 'data', type: 'type', key: 'F')

        when:
        Section savedS = service.saveSection(instance)

        then:
        savedS.key.equals('F')
        savedS.roleGroupSet.size() == 1

        cleanup:
        savedS.delete flush:true
        cleanUser(user)
    }
}
