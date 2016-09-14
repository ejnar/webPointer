package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional
import org.apache.commons.logging.LogFactory
import org.grails.web.errors.GrailsWrappedRuntimeException
import se.webpoint.auth.RoleGroup

@Transactional
class SectionService {


    private static final log = LogFactory.getLog(this)
    SpringSecurityService springSecurityService


    def Section getSection(id) {
//        def user = springSecurityService.loadCurrentUser()

        Section section = Section.findById(id);
        section.data = section.data.expand()
        section
    }

    @Transactional
    def saveSection(instance) {
        log.debug(' --- Create Section')

        instance.validate()
        if (instance.hasErrors()) {
            throw new GrailsWrappedRuntimeException()
        }
        instance.data = instance.data.expand()
        Set<RoleGroup> roleGroupSet = new HashSet<RoleGroup>()

        def user = springSecurityService.loadCurrentUser()
        for (a in user.getAuthorities()) {
            if(!a.system)
                roleGroupSet.add(a)
        }
        instance.roleGroupSet = roleGroupSet

        instance.insert flush:true
        instance
    }
}
