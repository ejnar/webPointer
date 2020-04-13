package se.webpoint.auth

import grails.gorm.transactions.Transactional
import se.webpoint.rest.BasicRestController

import static org.springframework.http.HttpStatus.OK

class RoleGroupRoleDetailController extends BasicRestController<RoleGroupRoleDetail> {

    static allowedMethods = [update: "PUT"]

    UserService userService

    RoleGroupRoleDetailController() {
        super(RoleGroupRoleDetail)
    }

    def index() {
        log.debug ' --- RoleGroupRoleDetailController.index '

        List<RoleGroupRole> roleGroup = RoleGroupRole.findAll()
        respond roleGroup, model: [("${RoleGroupRole}Count".toString()): roleGroup.size()]
    }


    /**
     * Shows a single resource
     * @param id The id of the resource
     * @return The rendered resource or a 404 if it doesn't exist
     */
    def show() {
        log.debug ' --- RoleGroupRoleDetailController.show - params: [{}]', params

        RoleGroup roleGroup = RoleGroup.findByName(params.id);
        Set<RoleGroupRole> roleGroupRoles = RoleGroupRole.findAllByRoleGroup(roleGroup);

        RoleGroupRoleDetail instance = new RoleGroupRoleDetail();
        instance.roleGroup = roleGroup.name;

        Set<Role> roles = new HashSet<>();
        roleGroupRoles.each {item ->
            roles.add(item.role);
        }
        instance.roles = roles;
        respond instance, [status: OK]
    }



    /**
     *
     * Updates
     *
     */
    def update(RoleGroupRoleDetail instance) {
        log.debug ' --- RoleGroupRoleDetailController.update - RoleGroupRoleDetail: [{}]', instance

        println instance

        RoleGroup roleGroup = RoleGroup.findByName(instance.roleGroup)
        println roleGroup
        instance.roles.each { item ->
            Role role = Role.findByAuthority(item.authority);
            println role
            if(instance.remove){
                RoleGroupRole.remove(roleGroup,role, true)
            } else {
                RoleGroupRole.create(roleGroup,role,true)
            }
        }
        respond instance, [status: OK]
    }


    /**
     * Creates a new instance of the resource for the given parameters
     *
     * @param params The parameters
     * @return The resource instance
     */
    protected RoleGroupRoleDetail createResource(Map params) {
        resource.newInstance(params)
    }

}