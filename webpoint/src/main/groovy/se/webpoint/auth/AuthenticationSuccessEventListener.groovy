package se.webpoint.auth

import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent
import se.webpoint.auth.LoginAttemptCacheService


/**
 Listener for successfull logins. Used for reseting number on unsuccessfull logins for specific account
 */
class AuthenticationSuccessEventListener implements ApplicationListener<AuthenticationSuccessEvent>{

    LoginAttemptCacheService loginAttemptCacheService

    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent e) {
        loginAttemptCacheService.loginSuccess(e.authentication.name)
    }
}