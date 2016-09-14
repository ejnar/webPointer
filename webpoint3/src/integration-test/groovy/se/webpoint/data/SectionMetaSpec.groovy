package se.webpoint.data

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import se.webpoint.util.BaseSpecification

@Integration
@Rollback
class SectionMetaSpec extends BaseSpecification {

    Section section
    SectionMeta sectionMeta

    def setupAll() {
        sectionMeta = setupSectionMeta('SectionMetaSpec0')
        section = setupSection(sectionMeta)
    }


    void "test SectionMeta created"() {
        given:
        sectionMeta = setupSectionMeta('SectionMetaSpec1')

        expect:
        sectionMeta != null

        cleanup:
        sectionMeta.delete flush:true
    }

    void "test SectionMeta remove"() {
        given:
        setupAll()

        expect:
        sectionMeta != null
        true == SectionMeta.remove(section.id.toHexString(), true)

        cleanup:
        section.delete flush:true
    }


    void "test SectionMeta exist"() {
        given:
        setupAll()

        expect:
        sectionMeta != null
        true == SectionMeta.exists(section.id.toHexString())

        cleanup:
        section.delete flush:true
        sectionMeta.delete flush:true

    }

    void "test SectionMeta getSectionMetaBySectionFK"() {
        given:
        setupAll()

        when:
        sectionMeta != null
        SectionMeta meta = SectionMeta.getSectionMetaBySectionFK(section.id.toHexString())

        then:
        meta != null
        meta.title.equals('SectionMetaSpec0')

        cleanup:
        section.delete flush:true
        sectionMeta.delete flush:true
    }



}
