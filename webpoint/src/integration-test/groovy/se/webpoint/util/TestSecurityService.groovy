package se.webpoint.util

import se.webpoint.auth.SecurityService
import spock.mock.DetachedMockFactory
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean

@TestConfiguration
class TestSecurityService {
    private DetachedMockFactory factory = new DetachedMockFactory()

    @Bean
    SecurityService securityService() {
        factory.Mock(SecurityService)
    }

}

