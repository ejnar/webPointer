package se.webpoint.data

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class PageListSpec extends Specification {

    void "test PageList created"() {
        given:
        PageList pageList = new PageList(name: 'name', category: 'category', groups: ['group'])
        pageList.save (flush:true, failOnError:true) //.save (validate: false

        expect:
        pageList != null
        pageList.id != null
        pageList.name.equals 'name'
        pageList.groups.length == 1
        pageList.addGroup('group2')
        pageList.groups.length == 2

        cleanup:
        pageList.delete flush:true
    }

    void "test PageList add group"() {
        given:
        PageList pageList = new PageList(name: 'name', category: 'category')
        pageList.addGroup('group')
        pageList.save flush:true

        expect:
        PageList p = PageList.findById(pageList.id)
        p.groups.length == 1

        cleanup:
        pageList.delete flush:true
    }


    void "test PageList find"() {
        given:
        PageList pageList = new PageList(name: 'name1', category: 'category', groups: ['groups1', 'groups2'])  //.save (validate: false, flush:true, failOnError:true)
        pageList.save (flush:true, failOnError:true)

        expect:
        PageList p1 = PageList.findById(pageList.id)
        p1.name.equals 'name1'
        PageList p2 = PageList.getPageListByName('name1')
        p2.name.equals 'name1'
        def p3 = PageList.getPageListsByGroup('groups1')
        p3[0].name.equals 'name1'
        def p4 = PageList.getPageListByGroupAndName('groups1', 'name1')
        p4.name.equals 'name1'

        cleanup:
        pageList.delete flush:true
    }


    void "test PageList remove"() {
        given:
        PageList pageMap1 = new PageList(name: 'nameremove1', category: 'category', groups: ['groups1'])  //.save (validate: false, flush:true, failOnError:true)
        pageMap1.save (flush:true, failOnError:true)
        PageList pageMap2 = new PageList(name: 'nameremove2', category: 'category', groups: ['groups2'])  //.save (validate: false, flush:true, failOnError:true)
        pageMap2.save (flush:true, failOnError:true)

        expect:
        pageMap1 != null
        PageList.removeByName('nameremove1', true)
        pageMap2 != null
        PageList.removeByGroup('groups2', true)

    }


}
