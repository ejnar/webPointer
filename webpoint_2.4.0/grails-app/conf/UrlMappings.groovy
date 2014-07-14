class UrlMappings {

	static mappings = {
		
//	 	"/parts"( resources: 'part' )
		"/api/books"(resources:"book")
		"/api/settings"(resources:"setting")
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
		
		"/"(view:"/book/index")
//        "/"(view:"/index")
        "500"(view:'/error')
	}
}
