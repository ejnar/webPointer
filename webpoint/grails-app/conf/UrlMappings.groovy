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
		"/api/partcollections"(resources:"partcollection"){
			"/parts"(resources:"part")
		}
		
        
		"/"(view:"/book/index")
//        "/"(view:"/index")
        "500"(view:'/error')
	}
}
