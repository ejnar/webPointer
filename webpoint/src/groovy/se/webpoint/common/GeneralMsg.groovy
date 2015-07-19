package se.webpoint.common

import grails.validation.Validateable
import static org.springframework.http.HttpStatus.*

@Validateable
class GeneralMsg {
	
    String msg
	String description
   	String code
	   
	   
	public static GeneralMsg OK(String msg){
		return new GeneralMsg(msg: msg, code: OK )
	}   
}
