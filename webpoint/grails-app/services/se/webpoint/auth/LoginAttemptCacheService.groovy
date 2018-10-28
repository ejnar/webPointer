package se.webpoint.auth

import com.google.common.cache.CacheBuilder
import com.google.common.cache.CacheLoader
import com.google.common.cache.LoadingCache
import groovy.util.logging.Slf4j

import javax.annotation.PostConstruct
import java.util.concurrent.TimeUnit



@Slf4j
class LoginAttemptCacheService {

    private LoadingCache attempts;
    private int allowedNumberOfAttempts
    def grailsApplication

    static lazyInit = false

    @PostConstruct
    private void init() {
        allowedNumberOfAttempts = grailsApplication.config.brutforce.loginAttempts.allowedNumberOfAttempts
        int time = grailsApplication.config.brutforce.loginAttempts.time


        log.debug 'Account block configured for [{}] minutes', time
        attempts = CacheBuilder.newBuilder()
                .expireAfterWrite(time, TimeUnit.MINUTES)
                .build({0} as CacheLoader);
    }

    /**
     * Triggers on each unsuccessful login attempt and increases number of attempts in local accumulator
     * @param login - username which is trying to login
     * @return
     */
    def failLogin(String login) {
        def numberOfAttempts = attempts.get(login)
        log.debug 'Fail login [{}] previous number for attempts [{}]', login, numberOfAttempts
        numberOfAttempts++

        if (numberOfAttempts > allowedNumberOfAttempts) {
            blockUser(login)
            attempts.invalidate(login)
        } else {
            attempts.put(login, numberOfAttempts)
        }
    }

    /**
     * Triggers on each successful login attempt and resets number of attempts in local accumulator
     * @param login - username which is login
     */
    def loginSuccess(String login) {
        log.debug 'Successfull login for [{}]', login
        attempts.invalidate(login)
    }

    /**
     * Disable user account so it would not able to login
     * @param login - username that has to be disabled
     */
    private void blockUser(String login) {
        log.debug 'Blocking user: [{}]', login
        def user = User.findByUsername(login)
        if (user) {
            user.accountLocked = true;
            user.save(flush: true)
        }
    }
}