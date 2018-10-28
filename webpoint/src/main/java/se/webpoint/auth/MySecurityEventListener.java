package se.webpoint.auth;


import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;

public class MySecurityEventListener
        implements ApplicationListener<AuthenticationSuccessEvent> {

    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        System.out.println("------------------- onApplicationEvent");
    }
}