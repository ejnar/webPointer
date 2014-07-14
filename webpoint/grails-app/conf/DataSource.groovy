environments {
	development {
		grails {
			mongo {
				host = "localhost"
				databaseName = "webpoint_dev"
			}
		}
	}
	production {
		grails {
			mongo {
				host = "localhost"
//				dbCreate = "create-drop"
//				port = 27107
//				username = "user"
//				password = "secretpassword"
				databaseName = "webpoint"
//				logSql = true
//				options {
//					autoConnectRetry = true
//					connectTimeout = 300
//				}
			}
		}
	}
}