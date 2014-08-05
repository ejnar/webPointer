class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?(.$format)?"{
			constraints {
				// apply constraints here
			}
		}
		"/api/books"(resources:"book")
		"/api/guest/books"(resources:"book")   
		
		
		"/api/parts"(resources:"part")
		"/api/partcollections"(resources:"partcollection")
		
        

        "/"(view:"/index")
        "500"(view:'/error')
	}
}
