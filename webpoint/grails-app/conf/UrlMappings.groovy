class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?(.$format)?"{
			constraints {
				// apply constraints here
			}
		}
		"/api/books"(resources:"book")
		"/api/guest/books"(resources:"book")   
		
//		"/api/guest/groupsofsections"(resources:"groupsOfSections")
		
		"/api/sections"(resources:"section")
		"/api/groupsofsections"(resources:"groupsOfSections"){
			"/sections"(resources:"section")
		}
		
        
		"/test"(view:"/book/index")
		"/"(view:"/user/index")
//        "/"(view:"/index")
        "500"(view:'/error')
	}
}
