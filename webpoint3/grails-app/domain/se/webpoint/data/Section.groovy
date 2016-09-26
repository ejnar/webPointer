package se.webpoint.data

import grails.gorm.DetachedCriteria
import groovy.transform.EqualsAndHashCode
import org.bson.types.ObjectId
import se.webpoint.auth.RoleGroup;

@EqualsAndHashCode(includes='id')
class Section extends BaseDomain {

	String data
	String type
	String key
	Date updated
    SectionMeta sectionMeta

	Set<RoleGroup> roleGroupSet;
    static embedded = ['roleGroupSet']

//	static transients = ['sectionMeta']
//	static belongsTo = SectionMeta
//	static belongsTo = [sectionMeta: SectionMeta]


	static mapping = {
//		stateless true
	}

	static constraints = {
		data blank:true
		key nullable: true, blank:true
		updated nullable: true
        roleGroupSet nullable: true
        sectionMeta nullable: true
	}

	def beforeInsert () { updated = new Date() }
	def beforeUpdate () { updated = new Date() }
	def afterInsert () { }
	def afterUpdate () { }


    SectionMeta getSectionMeta() {
        SectionMeta.findById(sectionMeta)
    }


    static Section getSectionBySectionMetaId(ObjectId sectionMetaId) {
        criteriaFor(sectionMetaId).get()
    }

    static boolean exists(ObjectId sectionMetaId) {
        criteriaFor(sectionMetaId).count()
    }

    private static DetachedCriteria criteriaFor(ObjectId sectionMetaId) {
        Section.where {
            sectionMeta == SectionMeta.load(sectionMetaId)
        }
    }


    static boolean remove(SectionMeta sm, boolean flush = false) {
        if (sm == null) return false

        int rowCount = Section.where { sectionMeta == sm }.deleteAll()

        if (flush) { Section.withSession { it.flush() } }

        rowCount
    }

    static Section webConvertedSection(id){
        Section webSection = Section.findById(id);
        webSection.data = webSection.data.replaceAll("(\\t)", "    ");
        webSection.data = webSection.data.replaceAll("(\\r\\n|\\n)", "<br />");
        webSection
    }

	String toString(){
		"id: ${id} type: ${type} key: ${key} updated: ${updated}"
	}   
}