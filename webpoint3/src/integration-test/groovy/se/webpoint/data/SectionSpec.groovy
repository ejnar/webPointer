package se.webpoint.data

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import se.webpoint.util.BaseSpecification

@Integration
@Rollback
class SectionSpec extends BaseSpecification {



    void "test Section created1"() {
        given:
        Section section = new Section(title: 'SectionSpec1', category: 'category', language: 'ENG', data: data, type: 'type', key: 'C')
        section.save flush: true

        expect:
        section != null
        section.title.equals('SectionSpec1')

        cleanup:
        section.delete flush:true
    }

//    Object { title: "new title", originalTitle: "Original song", category: "Worship", language: "swe", taggs: Array[1] }
    void "test Section created2"() {
        given:
        Section section = new Section(title: 'SectionSpec2', category: 'category', language: 'ENG')
        section.save flush: true

        expect:
        section != null
        section.title.equals('SectionSpec2')

        cleanup:
        section.delete flush:true
    }


    void "test Section webConvertedSection"() {
        given:
        Section section = setupSection('webConvertedSection')

        expect:
        section != null
        Section s = Section.webConvertedSection(section.id)
        s.data.contains('<br />')

        cleanup:
        section.delete flush:true
    }

    void "test Section create data object"() {
        given:
        Section section = setupSection('createSectionObject')
        SectionDoc doc = new SectionDoc(name: 'testImage', contentType: 'image/jpeg')
        section.object = doc
        section.save flush: true

        expect:
        section != null
        section.object != null
        Section s = Section.findById(section.id)
        s.object != null
        s.object.name.equals('testImage')


        cleanup:
        section.delete flush:true
    }

}
