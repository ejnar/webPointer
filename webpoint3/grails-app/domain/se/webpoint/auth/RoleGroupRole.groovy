package se.webpoint.auth

import grails.gorm.DetachedCriteria
import groovy.transform.ToString
import org.apache.commons.lang.builder.HashCodeBuilder
import org.bson.types.ObjectId
import se.webpoint.data.BaseDomain

@ToString(cache=true, includeNames=true, includePackage=false)
class RoleGroupRole extends BaseDomain{

	RoleGroup roleGroup
	Role role

    @Override
    boolean equals(other) {
        if (other instanceof RoleGroupRole) {
            other.roleId == role?.id && other.roleGroupId == roleGroup?.id
        }
    }

    @Override
    int hashCode() {
        def builder = new HashCodeBuilder()
        if (roleGroup) builder.append(roleGroup.id)
        if (role) builder.append(role.id)
        builder.toHashCode()
    }

//    Set<RoleGroup> getRoleGroup() {
//        RoleGroupRole.findAllByRoleGroup(this)
//    }

    static RoleGroupRole get(ObjectId roleGroupId, ObjectId roleId) {
        criteriaFor(roleGroupId, roleId).get()
    }

    static boolean exists(ObjectId roleGroupId, ObjectId roleId) {
        criteriaFor(roleGroupId, roleId).count()
    }

    private static DetachedCriteria criteriaFor(ObjectId roleGroupId, ObjectId roleId) {
        RoleGroupRole.where {
            roleGroup == RoleGroup.load(roleGroupId) &&
                    role == Role.load(roleId)
        }
    }

	static RoleGroupRole create(RoleGroup roleGroup, Role role, boolean flush = false) {
		def instance = new RoleGroupRole(roleGroup: roleGroup, role: role)
		instance.save flush: flush
		instance
	}

    static boolean remove(RoleGroup rg, Role r, boolean flush = false) {
        if (rg == null || r == null) return false

        int rowCount = RoleGroupRole.where { roleGroup == rg && role == r }.deleteAll()

        if (flush) { RoleGroupRole.withSession { it.flush() } }

        rowCount
    }

    static void removeAll(Role r, boolean flush = false) {
        if (r == null) return

        RoleGroupRole.where { role == r }.deleteAll()

        if (flush) { RoleGroupRole.withSession { it.flush() } }
    }

    static void removeAll(RoleGroup rg, boolean flush = false) {
        if (rg == null) return

        RoleGroupRole.where { roleGroup == rg }.deleteAll()

        if (flush) { RoleGroupRole.withSession { it.flush() } }
    }

    static constraints = {
        role validator: { Role r, RoleGroupRole rg ->
            if (rg.roleGroup?.id) {
                RoleGroupRole.withNewSession {
                    if (RoleGroupRole.exists(rg.roleGroup.id, r.id)) {
                        return ['roleGroup.exists']
                    }
                }
            }
        }
    }

	static mapping = {
		id composite: ['roleGroup', 'role']
		version false
	}

}
