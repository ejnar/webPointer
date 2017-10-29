package routes

import grails.util.Environment
import org.apache.camel.LoggingLevel
import org.apache.camel.builder.RouteBuilder
import twitter4j.TwitterException


public class RouteService extends RouteBuilder {

    def grailsApplication

    @Override
    public void configure() throws Exception {
        log.info " --- RouteService.configure:"

        def config = grailsApplication?.config
//        config.twitter.routing.oauth.each {
//            println '-------- ' + it
//        }
//        from("timer://foo?delay=60").to("log:bar?level=ERROR");
        from('seda:input').to('stream:out');
        // Twitter
        from("direct:twitter")
                .handleFault().onException(TwitterException.class).continued(true).end()
                .to("twitter://timeline/user?consumerKey=${config.twitter.routing.consumerkey}&consumerSecret=${config.twitter.routing.consumersecret}&accessToken=${config.twitter.routing.oauth.accesstoken}&accessTokenSecret=${config.twitter.routing.oauth.accesstokensecret}")
                ;

//        from("activemq:my.queueName")
//                .log(LoggingLevel.INFO,"consumed message from queue my.queueName")
//                .to('bean:myService?method=myMethod')

    }
}
