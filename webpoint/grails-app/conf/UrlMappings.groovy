class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?(.$format)?"{
			constraints {
				// apply constraints here
			}
		}
		"/api/books"(resources:"book")
		"/api/guest/books"(resources:"book")   
		
		"/api/guest/groupsofsections"(resources:"GroupOfSection"){
			"/sectionsmeta"(resources:"SectionMeta")
		}
				
//		"/api/groupsofsections/$action?"(controller: 'groupOfSection')
		
		"/api/sections"(resources:"Section")
//		"/api/sectionsmeta"(resources:"SectionMeta")
		
		"/api/groupsofsections"(resources: "GroupOfSection"){
			"/sectionsmeta"(resources: "SectionMeta")
		}
		//"/sections"(resources:"Section")
        
		"/test"(view:"/book/index")
		"/"(view:"/user/index")
//        "/"(view:"/index")
        "500"(view:'/error')
	}
}
