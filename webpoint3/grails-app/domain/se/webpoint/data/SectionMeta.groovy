package se.webpoint.data

import grails.gorm.DetachedCriteria
import groovy.transform.EqualsAndHashCode
import org.bson.types.ObjectId

@EqualsAndHashCode(includes='id')
class SectionMeta extends BaseDomain {

	String title
	String language

	String originalTitle
	String category
	String sectionType
	String sectionFK
	Date updated
    String[] taggs

//	static mapping = {
//		title index:true
//	}
	
	static constraints = {
        title index: true, indexAttributes: [unique: true, dropDups: true]
        language nullable: false

        originalTitle nullable: true
		category nullable: true, blank:true
		sectionType nullable:true, blank:true
		sectionFK nullable:true, blank:true

        updated nullable:true
        taggs nullable: true
	}
	
	def beforeInsert () { 
		if(originalTitle == null) originalTitle = title;
		if(sectionFK == null) sectionFK = '';
        updated = new Date();
	}
	def beforeUpdate () { updated = new Date();}
	def afterInsert () { }
	def afterUpdate () { }

	public Date getTimestamp(){
		return new Date( id._time() * 1000 );
	}

    public ObjectId getSectionFKAsObjectId(){
        return new ObjectId(sectionFK);
    }

    static SectionMeta getSectionMetaBySectionFK(String sectionFKId) {
        criteriaFor(sectionFKId).get()
    }

    static boolean exists(String sectionFKId) {
        criteriaFor(sectionFKId).count()
    }

    private static DetachedCriteria criteriaFor(String sectionFKId) {
        SectionMeta.where { sectionFK == sectionFKId }
    }

    static boolean remove(String sFK, boolean flush = false) {
        if (sFK == null) return false

        int rowCount = SectionMeta.where { sectionFK == sFK }.deleteAll()

        if (flush) { SectionMeta.withSession { it.flush() } }

        rowCount
    }

    def void addTagg(String tagg) {
        if (taggs == null) {
            taggs = [tagg]
        } else {
            String[] tmp = [tagg]
            taggs = taggs.plus(tmp)
        }
    }

//	String toString(){
//		"id: ${id} title: ${title} originalTitle: ${originalTitle} language: ${language} " +
//				"sectionType: ${sectionType} sectionFK: ${sectionFK} updated: ${updated}"
//	}
}
