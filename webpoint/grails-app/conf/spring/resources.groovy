// Place your Spring DSL code here

//import se.webpoint.auth.MySecurityEventListener


import se.webpoint.auth.AuthenticationFailureListener
import se.webpoint.auth.AuthenticationSuccessEventListener
import se.webpoint.auth.UserPasswordEncoderListener

beans = {
    userPasswordEncoderListener(UserPasswordEncoderListener)

    authenticationFailureListener(AuthenticationFailureListener) {
        loginAttemptCacheService = ref('loginAttemptCacheService')
    }

    authenticationSuccessEventListener(AuthenticationSuccessEventListener) {
        loginAttemptCacheService = ref('loginAttemptCacheService')
    }


//    mySecurityEventListener(MySecurityEventListener)
//    activemq(ActiveMQComponent){
//        return ActiveMQComponent.activeMQComponent("tcp://localhost:61616")
//    }
}
