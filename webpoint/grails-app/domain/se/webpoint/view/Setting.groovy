package se.webpoint.view

import se.webpoint.data.BaseDomain

class Setting extends BaseDomain {

    String CATEGORY = "category"
    String TAGG = "tagg"

	String key
//	Set<Object> values
//    Set<String> groups

    Object[] values
    String[] groups

    static constraints = {
        groups nullable: true
    }

    static mapping = {
    }

    static Setting getSetting(String key) {
        Setting.findByKey(key)
    }

    static Setting[] getSettingByKeyAndGroup(String key, String group) {
        Setting.withCriteria { and { eq("key", key) inList('groups', group) } }
    }

    def void addValue(String value) {
        if (values == null) {
            values = [value]
        } else {
            String[] tmp = [value]
            values = values.plus(tmp)
        }
    }

    def void addGroup(String group) {
        if (groups == null) {
            groups = [group]
        } else {
            String[] tmp = [group]
            groups = groups.plus(tmp)
        }
    }

//	def void addValue(String value) {
//        if(value == null || value == '')
//            return
//		if (values == null) {
//            values = new HashSet<>()
//            values.add(value)
//		} else {
//            values.add(value)
//		}
//	}
//
//    def void addGroup(String group) {
//        if(group == null || group == '')
//            return
//        if (groups == null) {
//            groups = new HashSet<>()
//            groups.add(group)
//        } else {
//            groups.add(group)
//        }
//    }

}
