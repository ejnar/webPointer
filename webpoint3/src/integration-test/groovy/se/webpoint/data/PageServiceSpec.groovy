package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.test.mixin.Mock
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import org.springframework.beans.factory.annotation.Autowired
import se.webpoint.auth.User
import se.webpoint.util.BaseSpecification

@Integration
@Rollback
class PageServiceSpec extends BaseSpecification {

    @Autowired
    PageService service

    SpringSecurityService mockSecurityService = Mock(SpringSecurityService)

    Section section

    def User mockUser(String name) {
        User user = setupUser(name)
        mockSecurityService.loadCurrentUser() >> user
        service.springSecurityService = mockSecurityService
        user
    }


    void "test removePagePart"() {
        given:
        section = setupSection('PageServiceSpec1')
        PageList pageList = setupPageList(section)

        when:
        pageList.pageParts.size() == 1

        then:
        pageList.pageParts.size() == 1
        PageList.findById(pageList.id).pageParts.size() == 1

        cleanup:
        pageList.delete flush: true
        section.delete flush: true
    }

    void "test savePageList"() {
        given:
        User user = mockUser('PageServiceSpec1')
        Section section = setupSection('PageServiceSpec2')
        PageList instance = new PageList(name: 'name1', category: 'category')
        PageItem part = new PageItem(style: 'default', color: 'red')
        part.section = section
        instance.pageParts.add(part)

        when:
        PageList savedPL = service.savePageList(instance)

        then:
        PageList.findById(savedPL.id)
        savedPL != null
        savedPL.groups[0].equals('PageServiceSpec1')

        cleanup:
        savedPL.delete flush: true
        section.delete flush: true
        cleanUser(user)
    }

    void "test getPageList"() {
        given:
        section = setupSection('PageServiceSpec3')
        PageList pageList = setupPageList(section)

        when:
        pageList != null
        PageList pList = service.getPageList(pageList.id)

        then:
        pList != null
        pList.name.equals('name1')
        pList.pageParts.size() == 1
        pList.pageParts[0].color.equals('red')
        pList.pageParts[0].section.equals(section)
        pList.pageParts[0].section.data.indexOf('<br />') > 0
        // Why?
        section.data.indexOf('<br />') > 0


        cleanup:
        pageList.delete flush: true
        section.delete flush: true

    }


    void "test getAllPageLists"() {
        given:
        User user = mockUser('PageServiceSpec2')
        PageList pageList = new PageList(name: 'name', category: 'category')
        pageList.addGroup("PageServiceSpec2")
        pageList.save flush: true

        when:
        def pageLists = service.getAllPageLists()

        then:
        pageLists.size() == 1
        pageLists[0].name.equals('name')
        pageLists[0].groups[0].equals("PageServiceSpec2")

        cleanup:
        pageList.delete flush: true
        cleanUser(user)
    }


}
