package ParserXml;

import java.util.List;

public class JsonResult {

    protected String name;
    protected String type;
    protected Point point;

    public JsonResult(String name, String type, Point point) {
        this.name = name;
        this.type = type;
        this.point = point;
    }

    public JsonResult(){
        super();
    }

}
