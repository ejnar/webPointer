class UrlMappings {

	static mappings = {
		
//		"/api/dataParts"(resources:"dataPart")
//		"/api/dataParts"(resources:"dataParts")
//		"/api/pageLists"(resources:"pageList")
//		"/api/pageParts"(resources:"pagePart")
//	 	"/parts"( resources: 'part' )
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
	}
}
