package se.webpoint.view

import se.webpoint.data.BaseDomain

class Setting extends BaseDomain {

	String key
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
}
