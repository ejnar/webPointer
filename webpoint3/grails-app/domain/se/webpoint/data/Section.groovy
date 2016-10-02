package se.webpoint.data

import grails.gorm.DetachedCriteria
import groovy.transform.EqualsAndHashCode
import org.bson.types.ObjectId
import se.webpoint.auth.RoleGroup;

@EqualsAndHashCode(includes='id')
class Section extends BaseDomain {

    String title
    String language
    String originalTitle
    String category
    String[] taggs

    String data
	String type
	String key
	Date updated

	Set<RoleGroup> roleGroupSet;
    static embedded = ['roleGroupSet']

//	static transients = ['sectionMeta']
//	static belongsTo = [sectionMeta: SectionMeta]

	static constraints = {
        title index: true, indexAttributes: [unique: true, dropDups: true]
        language nullable: false
        originalTitle nullable: true, blank:true
        category nullable: false
        taggs nullable: true

		data nullable: true, blank:true
        type nullable: true, blank:true
		key nullable: true, blank:true
		updated nullable: true
        roleGroupSet nullable: true
	}

    static mapping = {
//		stateless true
    }
    def beforeInsert () {
        if(originalTitle == null) originalTitle = title;
        updated = new Date();
    }
    def beforeUpdate () { updated = new Date();}
	def afterInsert () { }
	def afterUpdate () { }


    def void addTagg(String tagg) {
        if (taggs == null) {
            taggs = [tagg]
        } else {
            String[] tmp = [tagg]
            taggs = taggs.plus(tmp)
        }
    }

    static Section webConvertedSection(id){
        Section webSection = Section.findById(id);
        webConverter(webSection)
    }


    static Section webConverter(Section section){
        section.data = section.data.replaceAll("(\\t)", "    ");
        section.data = section.data.replaceAll("(\\r\\n|\\n)", "<br />");
        section
    }

	String toString(){
		"id: ${id} type: ${type} key: ${key} updated: ${updated}"
	}   
}