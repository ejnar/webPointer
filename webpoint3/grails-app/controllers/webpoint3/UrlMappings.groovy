package webpoint3

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/api/guest/rolegroups"(resources:"RoleGroup")
        "/api/guest/roles"(resources:"Role")
        "/api/guest/user"(resources:"UserDetail")

        "/api/guest/viewer"(resources:"ViewerList")
        "/api/guest/sections"(resources:"Section"){
            "/sectionmetas"(resources:"SectionMeta")
        }

        "/api/guest/pagelist"(resources:"PageList"){
            "/pageItem"(resources:"PageItem")
        }

        "/api/guest/vy/$group/$pages"(controller: "Vy", action: "index") {
            constraints {
                // apply constraints here
            }
        }

        "/api/guest/setting"(resources:"Setting")

//        "/api/guest/setting/$action/$key"(controller: "Setting") {
//            constraints {
//                // apply constraints here
//            }
//        }

        "/api/rolegroups"(resources:"RoleGroup")
        "/api/roles"(resources:"Role")
        "/api/user"(resources:"UserDetail")
        "/api/auth/$action?"(controller: "Auth" )

        "/api/sections"(resources:"Section")
        "/api/sectionmetas"(resources:"SectionMeta")

        "/api/groupsofsections"(resources: "GroupOfSection"){
            "/sectionmetas"(resources: "SectionMeta")
        }
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
