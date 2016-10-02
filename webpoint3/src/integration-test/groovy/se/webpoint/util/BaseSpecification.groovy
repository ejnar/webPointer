package se.webpoint.util

import se.webpoint.auth.*
import se.webpoint.data.PageItem
import se.webpoint.data.PageList
import se.webpoint.data.Section
import spock.lang.Specification

/**
 * Created by ejnarakerman on 06/08/16.
 */
class BaseSpecification extends Specification {


    String data = 'Test  linebreak\n' +
            'Next test row\n' +
            'Last test row\n' +
            'Finsh the test';


    def setupPageList(section) {
        PageList pageList = new PageList(name: 'name1', category: 'category')
        PageItem part = new PageItem(style: 'default', color: 'red')
        part.section = section
        pageList.pageParts.add(part)
        pageList.addGroup("testersson")
        pageList.save flush: true
        pageList
    }


    def setupSection(name) {
        Section section = new Section(title: name, category: 'category', language: 'ENG', data: data, type: 'type', key: 'C')
        section.save flush: true
        section
    }


    def setupUser(String name) {
        Role roleAdmin = Role.findByAuthority("ROLE_ADMIN")
        User user = User.create(name, 'testersson@glocalnet.net', true)
        RoleGroup roleGroup = RoleGroup.create(user.username, true)
        RoleGroupRole.create(roleGroup, roleAdmin, true)
        UserRoleGroup.create(user, roleGroup, true)
        user
    }


    def cleanUser(user) {
        UserRoleGroup.removeAll(user, true)
        def rg = RoleGroup.findByName(user.username)
        RoleGroupRole.removeAll(rg, true)
        RoleGroup.remove(user.username, true)
        user.delete flush: true
    }

}
