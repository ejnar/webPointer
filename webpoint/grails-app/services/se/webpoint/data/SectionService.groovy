package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.gorm.transactions.Transactional
import groovy.util.logging.Slf4j
import org.grails.web.errors.GrailsWrappedRuntimeException
import org.imgscalr.Scalr
import se.routing.CamelRoute
import se.webpoint.auth.RoleGroup
import se.webpoint.auth.SecurityService
import se.webpoint.auth.User

import javax.imageio.ImageIO
import java.awt.image.BufferedImage
import java.util.stream.Collectors

@Slf4j
@Transactional
class SectionService extends CamelRoute{

    SecurityService securityService

    def List<Section> getAllSectionByGroup(params) {
        log.debug ' --- SectionService.getAllSectionByGroup - params: [{}]', params
        Set<RoleGroup> rolegroups = securityService.currentUserExternalAuthorities()
        println rolegroups
        List<RoleGroup> rolegroupsList = rolegroups.stream().collect(Collectors.toList());
        println rolegroupsList
        def criteria = Section.createCriteria();
        List<Section> sections = criteria.list {
            eq('publish', Boolean.parseBoolean(params.publish))
            and { 'in' ("roleGroupSet.name", rolegroupsList*.name) }
        }
        sections
    }


    def List<Section> getAllSection(publish) {
        List<Section> sections;

        if(publish) {
            sections = Section.findByPublish(true)
        }else{
            sections = Section.findAll()
        }
        sections
    }



    def Section getSection(id) {
        log.debug ' --- SectionService.getSection - id: [{}]', id
//        def user = springSecurityService.loadCurrentUser()
        Section section = Section.findById(id);
//        section.data = section.data.expand()
        section
    }

    @Transactional
    def saveSection(instance) {
        log.debug ' --- SectionService.saveSection - instance: [{}]', instance

        instance.validate()
        if (instance.hasErrors()) {
            throw new GrailsWrappedRuntimeException()
        }
        if(instance.data != null)
            instance.data = instance.data.expand()

        Set<RoleGroup> roleGroupSet = new HashSet<RoleGroup>()
        Set<RoleGroup> authorities = securityService.currentUserAuthorities()     // springSecurityService.loadCurrentUser()
        for (a in authorities) {
            if(!a.system)
                roleGroupSet.add(a)
        }
        instance.roleGroupSet = roleGroupSet

        instance.insert flush:true
//        sendMessage("seda:input","seda.saveSection " + instance.title)
        sendMessage("direct:twitter","New song added: " + instance.title)

        instance
    }


    @Transactional
    def saveUploaded(Section instance, files) {
        log.debug(' --- SectionService.saveUploaded ')
        int order = 0;
        String contentType;
        files.each {
            InputStream fileStream = it.inputStream;
            def imageIn = ImageIO.read(fileStream);
            BufferedImage scaledImage = Scalr.resize(imageIn, 1600);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write( scaledImage, "png", baos );
            baos.flush();
            byte[] bytes = baos.toByteArray();
            baos.close();

            contentType = it.getContentType()

            BinaryDoc object = new BinaryDoc()
            object.name = it.getOriginalFilename()
            object.contentType = it.getContentType()
            object.size = bytes.length
            object.doc = bytes
            object.order = order
            object.section = instance
            object.save flush:true
            order++;
        }

        if(contentType.startsWith('image/')) {
            instance.type = 'IMAGE'
        }
//        file.transferTo(new File('/Users/ejnarakerman/dev/project/grails/tmp/' + f.getOriginalFilename()))
        instance.save flush:true
    }

}