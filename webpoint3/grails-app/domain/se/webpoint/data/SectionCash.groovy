package se.webpoint.data

import javax.persistence.Transient

/**
 * Created by ejnarakerman on 2017-09-23.
 */
class SectionCash {

//    int id
    String pageListId
    String currentSectionId
    Boolean refresh = false
    Date created
    Section section
    static transients = ['section']

    static constraints = {
        pageListId nullable: false, unique: true
        currentSectionId nullable: true, blank:true
        created nullable: true
        refresh nullable: true
    }

    def beforeInsert() { created = new Date(); }

    String toString() {
        "${pageListId} : ${currentSectionId} : ${refresh}"
    }

}
