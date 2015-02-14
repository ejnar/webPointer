class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?(.$format)?"{
			constraints {
				// apply constraints here
			}
		}
		"/api/books"(resources:"book")
		"/api/guest/books"(resources:"book")  
		
		"/api/guest/rolegroups"(resources:"RoleGroup")
		"/api/guest/roles"(resources:"Role")
		"/api/guest/user"(resources:"UserDetail")
		
		"/api/guest/viewer"(resources:"ViewerList")
		"/api/guest/sections"(resources:"Section"){
			"/sectionmetas"(resources:"SectionMeta")
		}
				
//		"/api/groupsofsections/$action?"(controller: 'groupOfSection')
		
		"/api/rolegroups"(resources:"RoleGroup")
		"/api/roles"(resources:"Role")
		"/api/user"(resources:"UserDetail")
		
		"/api/sections"(resources:"Section")
		"/api/sectionmetas"(resources:"SectionMeta")
		
		"/api/groupsofsections"(resources: "GroupOfSection"){
			"/sectionmetas"(resources: "SectionMeta")
		}
		"/api/pagelist"(resources:"PageList"){
			"/pagedata"(resources:"PageData")
		}
		"/api/pagedata"(resources:"PageData")
        
		"/test"(view:"/book/index")
		"/"(view:"/user/index")
		"/vy/"(view:"/slideshow/index")
//        "/"(view:"/index")
        "500"(view:'/error')
	}
}
