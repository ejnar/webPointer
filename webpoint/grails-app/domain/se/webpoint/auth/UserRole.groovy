package se.webpoint.auth

import grails.compiler.GrailsCompileStatic
import grails.gorm.DetachedCriteria
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode
import org.apache.commons.lang.builder.HashCodeBuilder
import org.bson.types.ObjectId
import se.webpoint.data.BaseDomain

@GrailsCompileStatic
@ToString(cache=true, includeNames=false, includePackage=false)
class UserRole extends BaseDomain {

    User user
    Role role


    @Override
    boolean equals(other) {
        if (other instanceof UserRole) {
            other.userId == user?.id && other.roleId == role?.id
        }
    }

    @Override
    int hashCode() {
        def builder = new HashCodeBuilder()
        if (user) builder.append(user.id)
        if (role) builder.append(role.id)
        builder.toHashCode()
    }

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
    static UserRole getByUser(ObjectId userId) {
        UserRole.where {
            user == User.load(userId)
        }
    }


    static UserRole get(ObjectId userId, ObjectId roleId) {
        criteriaFor(userId, roleId).get()
    }

    static boolean exists(ObjectId userId, ObjectId roleId) {
        criteriaFor(userId, roleId).count()
    }

    private static DetachedCriteria criteriaFor(ObjectId userId, ObjectId roleId) {
        UserRole.where {
            user == User.load(userId) &&
                    role == Role.load(roleId)
        }
    }

    static UserRole create(User user, Role role, boolean flush = false) {
        def instance = new UserRole(user: user, role: role)
        instance.save(flush: flush, insert: true)
        instance
    }

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
    static boolean remove(User u, Role r, boolean flush = false) {
        if (u == null || r == null) return false

        int rowCount = UserRole.where { user == u && role == r }.deleteAll()

        if (flush) { UserRole.withSession { it.flush() } }

        rowCount
    }

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
    static void removeAll(User u, boolean flush = false) {
        if (u == null) return

        UserRole.where { user == u }.deleteAll()

        if (flush) { UserRole.withSession { it.flush() } }
    }

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
    static void removeAll(Role r, boolean flush = false) {
        if (r == null) return

        UserRole.where { role == r }.deleteAll()

        if (flush) { UserRole.withSession { it.flush() } }
    }

    static constraints = {
        role validator: { Role r, UserRole ur ->
            if (ur.user?.id) {
                UserRole.withNewSession {
                    if (UserRole.exists(ur.user.id, r.id)) {
                        return ['userRole.exists']
                    }
                }
            }
        }
    }

    static mapping = {
        id composite: ['user', 'role']
        version false
    }
}
