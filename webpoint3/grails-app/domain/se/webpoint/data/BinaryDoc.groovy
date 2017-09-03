package se.webpoint.data

import groovy.transform.EqualsAndHashCode
import org.bson.types.ObjectId
import sun.misc.BASE64Encoder

/**
 * Created by ejnarakerman on 2017-08-27.
 */
@EqualsAndHashCode(includes='id')
class BinaryDoc extends BaseDomain{

    String name
    String contentType
    int size
    byte[] doc
    String base64
    int order

    Section section;

    static constraints = {
        contentType nullable: true
        doc nullable: true
        base64 nullable: true
    }

    def void convertToBase64(){
        if(doc != null){
            base64 = new BASE64Encoder().encode(doc);
        }

    }

    @Override
    public String toString() {
        return "BinaryDoc{" +
                "name='" + name + '\'' +
                ", contentType='" + contentType + '\'' +
                ", size=" + size +
                '}';
    }
}
