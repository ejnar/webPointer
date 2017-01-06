package se.webpoint.data

import grails.transaction.Transactional
import grails.web.http.HttpHeaders
import org.imgscalr.Scalr
import se.webpoint.rest.BasicRestController
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO
import java.awt.image.BufferedImage

import static org.springframework.http.HttpStatus.*

class SectionController extends BasicRestController<Section> {
	
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]

	def camelContext
	def grailsApplictaion
    SectionService sectionService
    PageService pageService
	
	SectionController() {
		super(Section)
	}

    /**
     * Lists all resources up to the given maximum
     *
     * @param max The maximum
     * @return A list of resources
     */
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)

        List<Section> list = listAllResources(params)

        for (a in list) {
            a.convertToBase64()
        }


        respond list, model: [("${resourceName}Count".toString()): countResources()]
    }



	/**
	 * Shows a single resource
	 * @param id The id of the resource
	 * @return The rendered resource or a 404 if it doesn't exist
	 */
	def show() {
		log.info " --- SectionController.show:"
        respond sectionService.getSection(params.id)
	}

	/**
	 * Saves a resource
	 */
    @Override
	@Transactional
	def save() {
        log.info " --- SectionController.save:"
        log.debug params

        def instance = createResource()
        println instance
		if(instance == null){
			notFound()
			return
		}
        access()
        sectionService.saveSection(instance);

        response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: CREATED]
	}


    /**
     * Updates a resource for the given id
     * @param id
     */
    @Override
    @Transactional
    def update() {
        log.info " --- SectionController.update: "
        if(handleReadOnly()) {
            return
        }

        def instance = queryForResource(params.id)
        if (instance == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        instance.properties = getObjectToBind()

        if (instance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance.errors, view:'edit' // STATUS CODE 422
            return
        }

        if(instance.data != null)
            instance.data = instance.data.expand()

        updateResource instance

        response.addHeader(HttpHeaders.LOCATION,
                g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
        respond instance, [status: OK]
    }


    /**
	 * Deletes a resource for the given id
	 * @param id The id
	 */
	@Override
	@Transactional
	def delete() {
		log.info " --- SectionController.delete: "
		log.debug params
		if(handleReadOnly()) {
			return
		}

		def instance = queryForResource(params.id)
		if (instance == null) {
			transactionStatus.setRollbackOnly()
			render status: NOT_FOUND
			return
		}
		pageService.removePagePart(params.id)

        instance.delete flush:true

        render status: NO_CONTENT
	}


	def upload() {
		log.info " --- UploadController.upload:"
		log.debug params

        Section instance = Section.findById(params.id)
        List files = new ArrayList()
        params.each { k,v ->
            if(k.startsWith("files"))
                files.add(v)
        }

        instance.objects.clear()
        files.each {
            InputStream fileStream = it.inputStream;
            def imageIn = ImageIO.read(fileStream);
            BufferedImage scaledImage = Scalr.resize(imageIn, 1600);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write( scaledImage, "png", baos );
            baos.flush();
            byte[] bytes = baos.toByteArray();
            baos.close();

            SectionDoc object = new SectionDoc()
            object.name = it.getOriginalFilename()
            object.contentType = it.getContentType()
            object.size = bytes.length
            object.doc = bytes
            instance.objects.add(object)
        }
        if(instance.objects.get(0).contentType.startsWith('image/')) {
            instance.type = 'IMAGE'
        }
        instance.save flush:true

//		file.transferTo(new File('/Users/ejnarakerman/dev/project/grails/tmp/' + f.getOriginalFilename()))
        instance.convertToBase64()
        respond instance, status: OK
//		response.setStatus(200, OK)  //sendError(200, 'Done')
	}
	
}
