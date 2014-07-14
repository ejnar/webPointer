package se.webpoint.filter

class ApiFilters {

    def filters = {
        all(controller:'*', action:'*') {
            before = {

            }
            after = { Map model ->
//				response.addHeader('Access-Control-Allow-Origin', 'http://localhost:9090/webpoint')
//				response.addHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
//				response.addHeader('Access-Control-Max-Age', 86400)
            }
            afterView = { Exception e ->

            }
        }
		
    }
}
