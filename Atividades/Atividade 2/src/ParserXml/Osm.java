package ParserXml;

import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

import java.util.List;

@Root(strict = false)
public class Osm {

    @ElementList(inline=true)
    protected List<Node> nodes;

    public Osm(List<Node> list) {
        this.nodes = list;
    }

    public Osm(){
        super();
    }
}
