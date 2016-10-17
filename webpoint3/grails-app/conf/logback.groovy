import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.ConsoleAppender
import ch.qos.logback.core.FileAppender
import grails.util.BuildSettings
import grails.util.Environment

// See http://logback.qos.ch/manual/groovy.html for details on configuration
appender('STDOUT', ConsoleAppender) {
    encoder(PatternLayoutEncoder) {
        pattern = "%level %logger - %msg%n"
    }
}

// TRACE, DEBUG, INFO, WARN, ERROR, ALL or OFF
root(ERROR, ['STDOUT'])

def targetDir = BuildSettings.TARGET_DIR
if (Environment.isDevelopmentMode() ) {  // && targetDir

    appender("FULL_STACKTRACE", FileAppender) {
        file = "${targetDir}/stacktrace.log"
        append = true
        encoder(PatternLayoutEncoder) {
            pattern = "%level %logger - %msg%n"
        }
    }
    logger("StackTrace", ERROR, ['FULL_STACKTRACE'], false)

    logger("org.apache", INFO, ['STDOUT'], false)
//    logger("grails", OFF, ['STDOUT'], false)
    logger("org.grails", INFO, ['STDOUT'], false)
    logger("org.mongodb", INFO, ['STDOUT'], false)
    logger("org.springframework", ERROR, ['STDOUT'], false)
    logger("grails.plugin.springsecurity.web.filter.DebugFilter", OFF, ['STDOUT'], false)
//    logger("org.springframework.security", ERROR, ['STDOUT'], false)
//
    logger("webpoint3", ALL, ["STDOUT"], false)
//    logger("web.filter", DEBUG, ["STDOUT"], false)
//    logger("org.apache.catalina.filters.RequestDumperFilter", DEBUG, ["STDOUT"], false)
    logger("se.webpoint", ALL, ["STDOUT"], false)
    logger("grails.app.controllers.se.webpoint", ALL, ["STDOUT"], false)
    logger("grails.app.services.se.webpoint", ALL, ["STDOUT"], false)
    logger("grails.app", DEBUG, ["STDOUT"], false)

}