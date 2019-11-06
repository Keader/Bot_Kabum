package ParserXml;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import java.io.File;
import java.io.PrintStream;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import static java.util.stream.Collectors.groupingBy;

public class Parser {

    public static void main(String args[]) {
        Serializer serializer = new Persister();
        File source = new File("D:\\Bot_Kabum\\Atividades\\Atividade 2\\src\\ParserXml\\FeiraDeSantana.osm");
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        try {
            Osm osm = serializer.read(Osm.class, source);

            List<Node> filtredList = osm.nodes.stream().filter(node -> !node.tags.isEmpty())
                    .filter(node -> {
                        Map<String, List<Tag>> group = node.tags.stream().collect(groupingBy(Tag::getK));
                        return group.containsKey("amenity") && group.containsKey("name"); })
                    .collect(Collectors.toList());

            PrintStream fileStream = new PrintStream(new File("D:\\Bot_Kabum\\Atividades\\Atividade 2\\src\\ParserXml\\out.json"));

            List<JsonResult> results = new LinkedList<>();

            filtredList.forEach(node -> {
                JsonResult result = new JsonResult();

                node.tags.forEach(tag-> {
                    if (tag.getK().equals("amenity"))
                        result.type = tag.getV();
                    else if (tag.getK().equals("name"))
                        result.name = tag.getV();
                });

                result.point = new Point(node.getLat(), node.getLon());
                results.add(result);
            });

            String json = gson.toJson(results);
            fileStream.print(json);
            fileStream.flush();
            fileStream.close();
            System.out.println("Parsed " + results.size() + " results");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
