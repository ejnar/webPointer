package se.webpoint.data

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional
import org.apache.commons.logging.LogFactory
import org.grails.web.errors.GrailsWrappedRuntimeException
import org.imgscalr.Scalr
import se.routing.CamelRoute
import se.webpoint.auth.RoleGroup

import javax.imageio.ImageIO
import java.awt.image.BufferedImage

@Transactional
class SectionService extends CamelRoute{


    private static final log = LogFactory.getLog(this)
    SpringSecurityService springSecurityService


    def Section getAllSection(publish) {
        Set<Section> sections;

        if(publish) {
            sections = Section.findByPublish(true)
        }else{
            sections = Section.findAll()
        }
        sections
    }



    def Section getSection(id) {
//        def user = springSecurityService.loadCurrentUser()
        Section section = Section.findById(id);
//        section.data = section.data.expand()
        section
    }

    @Transactional
    def saveSection(instance) {
        log.debug(' --- Create Section')

        instance.validate()
        if (instance.hasErrors()) {
            throw new GrailsWrappedRuntimeException()
        }
        if(instance.data != null)
            instance.data = instance.data.expand()

        Set<RoleGroup> roleGroupSet = new HashSet<RoleGroup>()
        def user = springSecurityService.loadCurrentUser()
        for (a in user.getAuthorities()) {
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
        log.debug(' --- Save files')
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