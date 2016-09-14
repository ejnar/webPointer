package se.webpoint.data

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import se.webpoint.util.BaseSpecification

@Integration
@Rollback
class SectionSpec extends BaseSpecification {

    Section section
    SectionMeta sectionMeta

    def setupAll() {
        sectionMeta = setupSectionMeta('title')
        section = setupSection(sectionMeta)
    }

    void "test Section created"() {
        given:
        setupAll()

        expect:
        section != null
//        section.data.equals('test data')

        cleanup:
        cleanSec()
    }

    void "test Section save SectionMeta"() {
        given:
        setupAll()

        expect:
        section != null
        sectionMeta != null
//        section.data.equals('test data')

        cleanup:
        cleanSec()
    }

    void "test Section get"() {
        given:
        setupAll()

        expect:
        section != null
        sectionMeta != null
        Section s = Section.getSectionBySectionMetaId(sectionMeta.id)
        s.equals(section)

        cleanup:
        cleanSec()
    }

    void "test Section deleted"() {
        given:
        setupAll()

        expect:
        section != null
        sectionMeta != null
        true == Section.remove(sectionMeta, true)

        cleanup:
        sectionMeta.delete flush:true
    }

    void "test Section exist"() {
        given:
        setupAll()

        expect:
        section != null
        sectionMeta != null
        section.key.equals 'C'
        true == Section.exists(sectionMeta.id)

        cleanup:
        cleanSec()
    }


    def cleanSec(){
        section.delete flush:true
        sectionMeta.delete flush:true
    }


    void "test Section webConvertedSection"() {
        given:
        Section section = new Section(data: data, type: 'type', key: 'C')
        section.save flush:true

        expect:
        section != null
        Section s = Section.webConvertedSection(section.id.toHexString())
        s.data.contains('<br />')


        cleanup:
        section.delete flush:true
    }

    String data = 'Test  linebreak\n' +
                    'Next test row\n' +
                    'Last test row\n' +
                    'Finsh the test';

}
