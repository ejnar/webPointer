package se.webpoint.data

import groovy.transform.EqualsAndHashCode

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

@EqualsAndHashCode(includes = 'name')
class PageList extends BaseDomain {

    String name
    String category
    String[] groups
    Date updated

    List<PageItem> pageParts = new ArrayList()
    static embedded = ['pageParts']


    static constraints = {
        name index: true, indexAttributes: [unique: true, dropDups: true]
        category blank: false
        groups nullable: true
        updated nullable: true
//		dueDate (min:new Date())
//		style (inList: ["one", "two"])
    }

    def beforeInsert() { updated = new Date();}
    def beforeUpdate() {}
    def afterInsert() {}
    def afterUpdate() {}


    static PageList getPageListByName(String name) {
        PageList.findByName(name)
    }

    static PageList[] getPageListsByGroup(String group) {
        PageList.withCriteria { inList('groups', group) }
    }

    static PageList getPageListByGroupAndName(String group, String name) {
        PageList.withCriteria { and { eq("name", name) inList('groups', group) } }[0]
    }


    static boolean removeByName(String n, boolean flush = false) {
        if (n == null) return false

        int rowCount = PageList.where { name == n }.deleteAll()

        if (flush) {
            PageList.withSession { it.flush() }
        }

        rowCount
    }

    static boolean removeByGroup(String g, boolean flush = false) {
        if (g == null) return false

        int rowCount = PageList.where { inList('groups', g) }.deleteAll()

        if (flush) {
            PageList.withSession { it.flush() }
        }

        rowCount
    }

    def void addGroup(String group) {
        if (groups == null) {
            groups = [group]
        } else {
            String[] tmp = [group]
            groups = groups.plus(tmp)
        }
    }

    String toString() {
        "${name} : ${category}"
    }
}


class PageItem {

    String key
    String style
    String color

    Section section
//    static transients = ['section']

    static constraints = {
        key(blank: true)
        style(blank: false)
        color(blank: false)
        section nullable: true
    }

    String toString() {
        "${key} : ${style} : ${color}"
    }
}
