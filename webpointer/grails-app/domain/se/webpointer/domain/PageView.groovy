package se.webpointer.domain

class PageView {
	
	
	String fontSize
	String fontColor
	String backgroundColor
	
	String toString(){
		"${data.name}"
	}
	
	static hasOne = [data : PageData]
	
    static constraints = {
    }
}
