package se.webpoint.auth;

import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import se.webpoint.auth.LoginAttemptCacheService;

/**
 Registers all failed attempts to login. Main purpose to count attempts for particular account ant block user

 */
class AuthenticationFailureListener implements ApplicationListener<AuthenticationFailureBadCredentialsEvent> {

    LoginAttemptCacheService loginAttemptCacheService;

    @Override
    public void onApplicationEvent(AuthenticationFailureBadCredentialsEvent e) {
        loginAttemptCacheService.failLogin(e.getAuthentication().getPrincipal().toString());
    }
}