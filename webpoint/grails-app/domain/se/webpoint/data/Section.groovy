package se.webpoint.data

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import se.webpoint.auth.RoleGroup
import sun.misc.BASE64Encoder

//@ToString
@EqualsAndHashCode(includes='id')
class Section extends BaseDomain {

    String title
    String language
    String originalTitle
    String category
    String author
    String[] taggs

    String data
	String type
	String key
	Date updated
    boolean publish = true

    List<SectionDoc> objects = new ArrayList()
	Set<RoleGroup> roleGroupSet;
    List<Link> oLinks = new ArrayList()

    static embedded = ['roleGroupSet', 'objects', 'oLinks']


	static constraints = {
        title index: true, indexAttributes: [unique: false]
        language nullable: false
        originalTitle nullable: true, blank:true
        category nullable: false
        author nullable: true, blank:true
        taggs nullable: true
		data nullable: true, blank:true
        type nullable: true, blank:true
		key nullable: true, blank:true
		updated nullable: true
        roleGroupSet nullable: true
        oLinks nullable: true
        objects nullable: true
	}

    static mapping = {
//		stateless true
    }
    def beforeInsert () {
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
        if(section.data != null && section.data.length() > 0) {
            section.data = section.data.replaceAll("(\\t)", "    ");
            section.data = section.data.replaceAll("(\\r\\n|\\n)", "<br />");
        }
        section
    }

//	String toString(){
//		"id: ${id} type: ${type} key: ${key} updated: ${updated}"
//	}
}


class SectionDoc{

    String name
    String externalUrl

}


class Link {
    String name
    String url

    static constraints = {
        name nullable: true, blank:true
        url nullable: true, blank:true
    }

    @Override
    public String toString() {
        return "Link{" +
                "name='" + name + '\'' +
                '}';
    }
}