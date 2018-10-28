package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import org.springframework.beans.factory.annotation.Autowired
import se.webpoint.auth.RoleGroup
import se.webpoint.auth.SecurityService

import spock.lang.*
import spock.mock.MockFactory

@Integration
@Rollback
class SectionServiceIntegSpec extends Specification  {

    @Autowired
    SectionService service
    @Autowired
    SecurityService mockSecurityService

    Set<RoleGroup> roleGroups = new HashSet<RoleGroup>()
    Section section
    RoleGroup roleGroup

    def setup() {
        roleGroups.add();
        service.securityService = mockSecurityService;
        section = new Section(title: 'SectionServiceIntegSpec', category: 'category', language: 'ENG', data: 'data', type: 'type', key: 'F')
    }

//    void "test saveSection"() {
//        given:
//        1 * mockSecurityService.currentUserAuthorities() >> {roleGroups}
////        mockSecurityService.loadCurrentUser() >> user
////        mockSecurityService.currentUserAuthorities() >> roleGroups
//
//        when:
//        Section section = service.saveSection(section)
//
//        then:
//        section.title.equals('SectionServiceIntegSpec2')
//        section.key.equals('F')
//        section.roleGroupSet != null
//
////        cleanup:
////        section.delete flush:true
////        cleanUser(user)  //
//    }

    void "test getSection"() {
        when:
        section.save flush: true


        then:
        service.getSection(section.id).key.equals('F')
    }
}
