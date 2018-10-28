package webpoint3




class UrlMappings {

    static mappings = {
//        "/$controller/$action?/$id?(.$format)?"{
//            constraints {
//                // apply constraints here
//            }
//        }
        "/api/guest/rolegroups"(resources:"RoleGroup")
        "/api/guest/roles"(resources:"Role")
        "/api/guest/user"(resources:"UserDetail")
        "/api/guest/viewer"(resources:"ViewerList")
        "/api/guest/sections"(resources:"Section")
        "/api/guest/sectioncash"(resources:"SectionCash")
//        "/api/guest/pagelist"(resources:"PageList"){
//            "/pageItem"(resources:"PageItem")
//        }
//        "/app"(controller: "Example" )
//        "/api/guest/binarydoc"(resources:"BinaryDoc")

        "/api/guest/vy/$group/$pages"(controller: "Vy", action: "index") {
            constraints {
                // apply constraints here
            }
        }
        "/api/guest/setting"(resources:"Setting")

        "/api/rolegroups"(resources:"RoleGroup")
        "/api/roles"(resources:"Role")
//        "/api/userroles"(resources:"UserRole")
        "/api/user"(resources:"UserDetail")
        "/api/auth/$action?"(controller: "Auth" )

        "/api/guest/$action/$value?"(controller: "PasswordToken" )

        "/api/sections"(resources:"Section")
        "/api/sections/upload/$id"(controller: "Section", action: "upload")
        "/api/binarydoc"(resources:"BinaryDoc")
        "/api/sectioncash"(resources:"SectionCash")

//        "/api/groupsofsections"(resources: "GroupOfSection"){
//            "/sectionmetas"(resources: "SectionMeta")
//        }
        "/api/pagelist"(resources:"PageList"){
            "/pageItem"(resources:"PageItem")
        }
        "/api/pagedata"(resources:"PageItem")
        // $group/$pages/
        "/api/vy/$group/$pages"(controller: "Vy", action: "index") {
            constraints {
                // apply constraints here
            }
        }

        "/api/setting"(resources:"Setting")

        "/grails"(view: '/index')
        "/user"(view: '/webpoint/user')
        "/"(view: '/webpoint/index')

        "500"(view: '/error')
        "404"(view: '/notFound')
        "403"(view: '/forbidden')
        "401"(view: '/unauthorized')
    }
}
