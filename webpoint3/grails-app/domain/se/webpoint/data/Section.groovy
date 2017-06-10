package se.webpoint.data

import groovy.transform.EqualsAndHashCode
import se.webpoint.auth.RoleGroup
import sun.misc.BASE64Encoder

@EqualsAndHashCode(includes='id')
class Section extends BaseDomain {

    String title
    String language
    String originalTitle
    String category
    String author
    String[] taggs
//    String[] links

    String data
	String type
	String key
	Date updated

//    SectionDoc[] objects
    List<SectionDoc> objects = new ArrayList()
    List<Link> oLinks = new ArrayList()

	Set<RoleGroup> roleGroupSet;
    static embedded = ['roleGroupSet', 'objects', 'oLinks']

//	static transients = ['sectionMeta']
//	static belongsTo = [sectionMeta: SectionMeta]

	static constraints = {
        title index: true, indexAttributes: [unique: false]
        language nullable: false
        originalTitle nullable: true, blank:true
        category nullable: false
        author nullable: true, blank:true
        taggs nullable: true

		data nullable: true, blank:true
        objects nullable: true
        type nullable: true, blank:true
		key nullable: true, blank:true
		updated nullable: true
        roleGroupSet nullable: true
        oLinks nullable: true
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

//    def void addLink(String link) {
//        if (links == null) {
//            links = [link]
//        } else {
//            String[] tmp = [link]
//            links = links.plus(tmp)
//        }
//    }

    def void addSectionDoc(){
        objects.add(new SectionDoc());
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

    def void convertToBase64(){
        if(objects != null && type == 'IMAGE' ){
            objects.each {
                it.base64 = new BASE64Encoder().encode(it.doc);
                it.doc = null
            }
        }

    }

	String toString(){
		"id: ${id} type: ${type} key: ${key} updated: ${updated}"
	}   
}

class SectionDoc{

    String name
    String contentType
    int size
    byte[] doc
    String base64

    static constraints = {
        contentType nullable: true
        doc nullable: true
        base64 nullable: true
    }

    @Override
    public String toString() {
        return "SectionDoc{" +
                "name='" + name + '\'' +
                ", contentType='" + contentType + '\'' +
                ", size=" + size +
                '}';
    }
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