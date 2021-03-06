package se.webpoint.auth

import grails.gorm.DetachedCriteria
import groovy.transform.ToString
import org.apache.commons.lang.builder.HashCodeBuilder
import org.bson.types.ObjectId
import se.webpoint.data.BaseDomain

@ToString(cache=true, includeNames=true, includePackage=false)
class UserRoleGroup extends BaseDomain{

	User user
	RoleGroup roleGroup

    @Override
    boolean equals(other) {
        if (other instanceof UserRoleGroup) {
            other.userId == user?.id && other.roleGroupId == roleGroup?.id
        }
    }

    @Override
    int hashCode() {
        def builder = new HashCodeBuilder()
        if (user) builder.append(user.id)
        if (roleGroup) builder.append(roleGroup.id)
        builder.toHashCode()
    }


    static UserRoleGroup get(ObjectId userId, ObjectId roleGroupId) {
        criteriaFor(userId, roleGroupId).get()
    }

    static boolean exists(ObjectId userId, ObjectId roleGroupId) {
        criteriaFor(userId, roleGroupId).count()
    }

    private static DetachedCriteria criteriaFor(ObjectId userId, ObjectId roleGroupId) {
        UserRoleGroup.where {
            user == User.load(userId) &&
                    roleGroup == RoleGroup.load(roleGroupId)
        }
    }

	static UserRoleGroup create(User user, RoleGroup roleGroup, boolean flush = false) {
		def instance = new UserRoleGroup(user: user, roleGroup: roleGroup)
		instance.save(flush: flush, insert: true)
		instance
	}

    static boolean remove(User u, RoleGroup rg, boolean flush = false) {
        if (u == null || rg == null) return false

        int rowCount = UserRoleGroup.where { user == u && roleGroup == rg }.deleteAll()

        if (flush) { UserRoleGroup.withSession { it.flush() } }

        rowCount
    }

    static void removeAll(User u, boolean flush = false) {
        if (u == null) return

        UserRoleGroup.where { user == u }.deleteAll()

        if (flush) { UserRoleGroup.withSession { it.flush() } }
    }

    static void removeAll(RoleGroup rg, boolean flush = false) {
        if (rg == null) return

        UserRoleGroup.where { roleGroup == rg }.deleteAll()

        if (flush) { UserRoleGroup.withSession { it.flush() } }
    }


    static constraints = {
        user validator: { User u, UserRoleGroup ug ->
            if (ug.roleGroup?.id) {
                UserRoleGroup.withNewSession {
                    if (UserRoleGroup.exists(u.id, ug.roleGroup.id)) {
                        return ['userGroup.exists']
                    }
                }
            }
        }
    }


	static mapping = {
		id composite: ['roleGroup', 'user']
		version false
	}

}
