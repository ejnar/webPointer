package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional
import org.apache.commons.logging.LogFactory
import org.bson.types.ObjectId
import org.grails.web.errors.GrailsWrappedRuntimeException
import se.webpoint.auth.RoleGroup
import se.webpoint.auth.User

@Transactional
class PageService {


    private static final log = LogFactory.getLog(this)
    SpringSecurityService springSecurityService


    def getAllPageLists() {
        log.debug(' --- Get all PageList')
        User user = springSecurityService.loadCurrentUser()
        Set<RoleGroup> rolegroups = user.getAuthoritiesExternal()

        Set<PageList> pageLists = new HashSet();
        for (rg in rolegroups) {
            pageLists.addAll(PageList.getPageListsByGroup(rg.name))
        }
        log.debug(pageLists);
        pageLists
    }

    def PageList getPageListByGroupAndName(group, pages) {
        PageList pageList = PageList.getPageListByGroupAndName(group, pages)
        return getPageListByList(pageList);
    }


    def PageList getPageList(id) {
        PageList pageList = PageList.findById(id);

        return getPageListByList(pageList);
    }


    def PageList getPageListByList(PageList pageList) {
        PageList list = new PageList();
        for (p in pageList.pageParts) {

            Section section = Section.webConvertedSection(p.section);
            log.debug(section);

            p.section = section;
            list.pageParts.add(p);
        }
        pageList.pageParts.clear()
        pageList.pageParts.addAll(list.pageParts)
        return pageList;
    }


    @Transactional
    def savePageList(PageList instance) {
        log.debug(' --- Create PageList')

        instance.validate()
        if (instance.hasErrors()) {
            throw new GrailsWrappedRuntimeException()
        }
//        def principal = springSecurityService.getPrincipal();
//        log.debug principal
        def user = springSecurityService.loadCurrentUser()
        for (a in user.getAuthorities()) {
            log.debug a
            if (!a.system)
                instance.addGroup(a.name)
//			for (b in a.getAuthorities()) {
//                log.debug b.authority
//			}
        }
        println instance
        instance.save flush: true;
        instance
    }

    /**
     * Deletes a PageItem resource for the given sectionMetaId
     * @param sectionMetaId
     */
    @Transactional
    def removePagePart(sectionId) {
        log.debug(' --- Remove PagePart - sectionId: ' + sectionId)

        ObjectId objectId
        if(sectionId instanceof String)
            objectId = new ObjectId(sectionId)
        else
            objectId = sectionId


        def criteria = PageList.createCriteria();
        List<PageList> pageLists = criteria.list {
            eq('pageParts.section', objectId)
        }
        try {
            PageItem pageData
            List<PageItem> pageParts
            Iterator pageListI = pageLists.iterator();
            while (pageListI.hasNext()) {
                pageParts = new ArrayList()
                PageList pageList = pageListI.next();
                Iterator pageDataI = pageList.pageParts.iterator();
                while (pageDataI.hasNext()) {
                    pageData = pageDataI.next();
                    if (sectionId.toString().equals(pageData.section.id.toString())) {
                        pageParts.add(pageData)
                    }
                }
                pageList.pageParts.removeAll(pageParts)
                pageList.save(flush: true, failOnError: true)
            }
        } catch (All) {
            log.debug(All)
        }
    }


}
