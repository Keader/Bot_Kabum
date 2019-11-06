package ParserXml;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

import java.util.LinkedList;
import java.util.List;

@Root
public class Node {

    @ElementList(inline=true, required=false)
    protected List<Tag> tags;

    @Attribute
    private String id;

    @Attribute
    private String visible;

    @Attribute
    private String version;

    @Attribute
    private String changeset;

    @Attribute
    private String timestamp;

    @Attribute
    private String user;

    @Attribute
    private String uid;

    @Attribute
    private double lat;

    @Attribute
    private double lon;

    public Node(List<Tag> tags, String id, String visible, String version, String changeset, String timestamp, String user, String uid, double lat, double lon) {
        this.tags = tags;
        this.id = id;
        this.visible = visible;
        this.version = version;
        this.changeset = changeset;
        this.timestamp = timestamp;
        this.user = user;
        this.uid = uid;
        this.lat = lat;
        this.lon = lon;
    }

    public Node(){
        super();
        tags = new LinkedList<>();
    }

    public String getId() {
        return id;
    }

    public String getVisible() {
        return visible;
    }

    public String getVersion() {
        return version;
    }

    public String getChangeset() {
        return changeset;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getUser() {
        return user;
    }

    public String getUid() {
        return uid;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }
}
