package Codigo_Exemplo;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

@Root
public class Note {
    @Element
    private String to;
    @Element
    private String from;
    @Element
    private String heading;
    @Element
    private String body;

    public Note(String to, String from, String heading, String body) {
        this.to = to;
        this.from = from;
        this.heading = heading;
        this.body = body;
    }

    public Note() {
        super();
    }

    public String getTo() {
        return to;
    }

    public String getFrom() {
        return from;
    }

    public String getHeading() {
        return heading;
    }

    public String getBody() {
        return body;
    }
}
