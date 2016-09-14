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
    SectionMeta sectionMeta

    def User mockUser(String name) {
        User user = setupUser(name)
        mockSecurityService.loadCurrentUser() >> user
        service.springSecurityService = mockSecurityService
        user
    }


    void "test removePagePart"() {
        given:
        sectionMeta = setupSectionMeta('title')
        section = setupSection(sectionMeta)
        PageList pageList = setupPageList(sectionMeta)

        when:
        pageList.pageParts.size() == 1
        service.removePagePart(sectionMeta.id)

        then:
        pageList.pageParts.size() == 0
        PageList.findById(pageList.id).pageParts.size() == 0

        cleanup:
        pageList.delete flush: true
        sectionMeta.delete flush: true
        section.delete flush: true
    }

    void "test savePageList"() {
        given:
        User user = mockUser('PageServiceSpec1')
        SectionMeta sectionMeta = setupSectionMeta('title')
        Section section = setupSection(sectionMeta)
        PageList instance = new PageList(name: 'name1', category: 'category')
        PageItem part = new PageItem(style: 'default', color: 'red')
        part.sectionMeta = sectionMeta
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
        sectionMeta.delete flush: true
        cleanUser(user)
    }

    void "test getPageList"() {
        given:
        sectionMeta = setupSectionMeta('title')
        section = setupSection(sectionMeta)
        PageList pageList = setupPageList(sectionMeta)

        when:
        PageList pList = service.getPageList(pageList.id)

        then:
        pList != null
        pList.name.equals('name1')
        pList.pageParts.size() == 1
        pList.pageParts[0].color.equals('red')
        pList.pageParts[0].sectionMeta.equals(sectionMeta)
        pList.pageParts[0].section.equals(section)
        pList.pageParts[0].section.data.indexOf('<br />') > 0
        // Why?
        section.data.indexOf('<br />') > 0


        cleanup:
        pageList.delete flush: true
        sectionMeta.delete flush: true
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
