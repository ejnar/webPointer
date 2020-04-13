package se.webpoint.auth

import se.webpoint.rest.BasicRestController

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.OK

class UserRoleGroupDetailController extends BasicRestController<UserRoleGroupDetail> {   //


    static allowedMethods = [ update: "PUT" ]

    UserService userService

    UserRoleGroupDetailController() {
        super(UserRoleGroupDetail)
    }

    def index() {
        log.debug ' --- UserRoleGroupDetailController.index '

        List<UserRoleGroup> roleGroup = UserRoleGroup.findAll()
        respond roleGroup, model: [("${UserRoleGroup}Count".toString()): roleGroup.size()]
    }

    /**
     * Shows a single resource
     * @param id The id of the resource
     * @return The rendered resource or a 404 if it doesn't exist
     */
    def show() {
        log.debug ' --- UserRoleGroupDetailController.show - params: [{}]', params

        UserRoleGroupDetail instance = new UserRoleGroupDetail()
        RoleGroup roleGroup = RoleGroup.findById(params.id)
        Set<RoleGroupRole> roleGroupRoles = RoleGroupRole.findAllByRoleGroup(roleGroup)

        instance.roleGroup = roleGroup
        instance.roleGroupRoles = roleGroupRoles

        respond instance, [status: OK]
    }


    /**
     *
     * Updates
     *
     */
    def update(UserRoleGroupDetail instance) {
        log.debug ' --- UserRoleGroupDetailController.update - UserRoleGroupDetail: [{}]', instance
        userService.updateUserRoleGroup(instance);
        respond instance, [status: OK]
    }



    /**
     * Creates a new instance of the resource for the given parameters
     *
     * @param params The parameters
     * @return The resource instance
     */
    protected UserRoleGroupDetail createResource(Map params) {
        resource.newInstance(params)
    }

}
