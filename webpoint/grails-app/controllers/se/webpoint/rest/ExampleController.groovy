package se.webpoint.rest


/**
 * Created by ejnarakerman on 27/12/16.
 */
class ExampleController {

    def index() {}

//    @MessageMapping("/hello")
//    @SendTo("/topic/hello")
    protected String hello(String world) {
        return "hello from controller, ${world}!"
    }
}
