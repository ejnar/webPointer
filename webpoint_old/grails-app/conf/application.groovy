
//grails.plugin.springsecurity.rememberMe.persistent = true
//grails.plugin.springsecurity.rememberMe.persistentToken.domainClassName = 'se.webpoint.auth.AuthenticationToken'

grails.mongo.default.mapping = {
	version true
	'*'(reference:false)
}

environments {
	development {
		grails.logging.jul.usebridge = true
		grails.plugin.springsecurity.debug.useFilter = true
	}
	production {
		grails.logging.jul.usebridge = false
	}
}

integrationTest {
//    testLogging.showStandardStreams = true
	testLogging {
		exceptionFormat = 'full'
//        events 'failed', 'standardOut', 'standardError'
	}
//    beforeTest { descriptor -> logger.quiet " --- $descriptor" }
}



// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'se.webpoint.auth.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'se.webpoint.auth.UserRole'
grails.plugin.springsecurity.authority.className = 'se.webpoint.auth.Role'
grails.plugin.springsecurity.useRoleGroups = true
grails.plugin.springsecurity.authority.groupAuthorityNameField = 'authorities'
grails.plugin.springsecurity.securityConfigType = 'InterceptUrlMap'
grails.plugin.springsecurity.interceptUrlMap = [
		[pattern: '/',               access: ['permitAll']],
		[pattern: '/error',          access: ['permitAll']],
		[pattern: '/assets/**',      access: ['permitAll']],
		[pattern: '/**/js/**',       access: ['permitAll']],
		[pattern: '/**/css/**',      access: ['permitAll']],
		[pattern: '/**/images/**',   access: ['permitAll']],
		[pattern: '/**/favicon.ico', access: ['permitAll']],
		[pattern: '/api/guest/**',   access: ['permitAll']],
		[pattern: '/api/**',         access: ['isFullyAuthenticated()']],
		[pattern: '/api/auth/**',    access: ['isFullyAuthenticated()']],
		[pattern: '/login/**',       access: ['permitAll']],
		[pattern: '/auth/api/**',    access: ['permitAll']],
		[pattern: '/logout/**',      access: ['permitAll']],
		[pattern: '/**',             access: ['permitAll']]
]
grails.plugin.springsecurity.rememberMe.persistent = false
grails.plugin.springsecurity.rest.login.active = true
grails.plugin.springsecurity.rest.login.useJsonCredentials = true
grails.plugin.springsecurity.rest.login.useRequestParamsCredentials = false
grails.plugin.springsecurity.rest.login.failureStatusCode = 401
grails.plugin.springsecurity.rest.login.usernamePropertyName =  'username'
grails.plugin.springsecurity.rest.login.passwordPropertyName =  'password'
grails.plugin.springsecurity.rest.login.endpointUrl = '/auth/api/login'
grails.plugin.springsecurity.rest.logout.endpointUrl = '/auth/api/logout'

grails.plugin.springsecurity.rest.token.storage.useGorm = true
grails.plugin.springsecurity.rest.token.storage.gorm.tokenDomainClassName = 'se.webpoint.auth.AuthenticationToken'
grails.plugin.springsecurity.rest.token.storage.gorm.tokenValuePropertyName = 'token'
grails.plugin.springsecurity.rest.token.storage.gorm.usernamePropertyName = 'username'
grails.plugin.springsecurity.rest.token.generation.useSecureRandom = true
grails.plugin.springsecurity.rest.token.generation.useUUID = false

grails {
	plugin {
		springsecurity {
			filterChain {
				chainMap = [
						// Stateless chain
						[pattern: '/api/guest/**',
						 filters: 'anonymousAuthenticationFilter,restTokenValidationFilter,restExceptionTranslationFilter,filterInvocationInterceptor'
						],
						// Stateless chain
						[pattern: '/auth/**',
						 filters: 'JOINED_FILTERS,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter, -rememberMeAuthenticationFilter'
						],
						// Stateless chain
						[pattern: '/api/**',
						 filters: 'JOINED_FILTERS, -exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
						],
						//Traditional chain
						[pattern: '/**',
						 filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter'
						]
				]
			}
//Other Spring Security settings //...
			rest { token { validation { enableAnonymousAccess = true } } }
			rest { token { validation { useBearerToken = false } } }
//            rest { token { validation { active = true } } }
//            rest { token { validation { headerName = 'X-Auth-Token' } } }
//            rest { token { validation { endpointUrl = '/auth/validate' } } }
		} } }









