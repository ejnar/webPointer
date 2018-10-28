package webpoint

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import org.springframework.context.annotation.Configuration

@Configuration
class Application extends GrailsAutoConfiguration
{

    static void main(String[] args) {
        GrailsApp.run(Application, args)
    }

    @Override
    void onStartup(Map<String, Object> event) {
        super.onStartup(event)
        // custom startup code..
    }
}