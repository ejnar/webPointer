package se.example

import grails.converters.JSON
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

/**
 * Created by ejnarakerman on 2017-10-29.
 */
class ExampleController {


    def index() {
        println "ExampleController: "
    }

    @MessageMapping("/hello")
    @SendTo("/topic/hello")
    protected String hello(String world) {
        println "ExampleController: " + world


        def obj = JSON.parse(world)

        return obj; //  "hello from controller, ${world}!"  // obj.message
    }




}

