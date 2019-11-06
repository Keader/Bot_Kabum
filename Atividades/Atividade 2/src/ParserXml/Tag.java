package ParserXml;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Root;

@Root
public class Tag {

    @Attribute
    private String k;

    @Attribute
    private String v;

    public Tag(){
        super();
    }

    public Tag(String k, String v) {
        this.k = k;
        this.v = v;
    }

    public String getK() {
        return k;
    }

    public String getV() {
        return v;
    }
}
