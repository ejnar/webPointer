//package se.route
//
//import grails.transaction.Transactional
//
//import org.apache.camel.LoggingLevel
//import org.apache.camel.builder.RouteBuilder
//
//@Transactional
//class RoutesService extends RouteBuilder{
//
//    /**
//     * Called on initialization to build the routes using the fluent builder syntax.
//     *
//
//     * This is a central method for RouteBuilder implementations to implement
//     * the routes using the Java fluent builder syntax.
//     *
//     * @throws Exception can be thrown during configuration
//     */
//    @Override
//    void configure() throws Exception {
//        from("activemq:my.queueName")
//                .log(LoggingLevel.INFO,"consumed message from queue my.queueName")
//                .to('bean:myService?method=myMethod')
//    }
//}
