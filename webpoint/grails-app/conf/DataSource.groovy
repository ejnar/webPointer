// environment specific settings
environments {
    development {
        grails {
            mongo {
                host = "localhost"
                port = 27017
                databaseName = "webpoint-dev"
            }
        }
    }
    test {
        grails {
            mongo {
                host = "localhost"
                port = 27017
                databaseName = "webpoint-test"
            }
        }
    }
    production {
        grails {
            mongo {
                host = "localhost"
                port = 27017
                databaseName = "webpoint"
            }
        }
    }
}