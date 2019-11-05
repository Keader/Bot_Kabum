package Codigo_Exemplo;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import java.io.File;
import java.io.FileWriter;


public class Main {

    public static void main(String args[]) {

        Serializer serializer = new Persister();
        File source = new File("D:\\Bot_Kabum\\Atividades\\Atividade 2\\src\\Codigo_Exemplo\\exemplo.xml");
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        try {

            Note nota = serializer.read(Note.class, source);
            String json = gson.toJson(nota);

            FileWriter writer = new FileWriter("D:\\Bot_Kabum\\Atividades\\Atividade 2\\src\\Codigo_Exemplo\\file.json");
            writer.write(json);
            writer.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
