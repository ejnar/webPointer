import org.apache.camel.builder.RouteBuilder


class ExampleRoute extends RouteBuilder{
//    def configure = {
////        from('seda:input').to('stream:out')
//		
//		from("seda:input").filter({ it.in.body.contains('from') }).to("stream:out")
//    }
	
	
	def grailsApplication
	
	@Override void configure() { 
		def config = grailsApplication?.config
		
//		if (System.properties["${appName}.config.location"]) {
//			grails.config.locations << "file:" + System.properties["${appName}.config.location"]
//		 }
		
//		def config=grailsApplication.config
//		println config
//		def locations = config.locations
//		println locations
//		locations.each {
//		   String configFileName = it.split("file:")[1]
//		   println configFileName
//		   config.merge(new ConfigSlurper().parse(new File(configFileName).text))
//		}
		
		config.test.each {
			println it
		};
		println config.test.hello
		
		from('seda:input').to('stream:out');
		
	
		from("direct:foo")
			.to("twitter://timeline/user?consumerKey=${config.routing.twitter.oauth.consumerkey}&consumerSecret=${config.routing.twitter.oauth.consumersecret}&accessToken=${config.routing.twitter.oauth.accesstoken}&accessTokenSecret=${config.routing.twitter.oauth.accesstokensecret}");
			
	}
	
	
	
}
