/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package controllers;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.allcolor.yahp.converter.IHtmlToPdfTransformer;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Transformer;
import play.data.validation.Valid;
import play.data.validation.Validation;
import play.i18n.Lang;
import play.modules.pdf.PDF;
import play.mvc.Before;
import play.mvc.With;
import play.mvc.Controller;
import sun.misc.BASE64Encoder;
import static play.modules.pdf.PDF.*;

/**
 *
 * @author Laurent
 */

public class Caisses extends Controller
{    

    public static void index()
    {
        render();
    }
    
    public static void generateCustom(String username, String title)
    {

        PDF.Options option = new PDF.Options();
        option.filename="player_label.pdf";
        

        //Size
        IHtmlToPdfTransformer.PageSize pageSize = new IHtmlToPdfTransformer.PageSize(345, 115);
        option.pageSize = pageSize;
      
        renderPDF("tags/caisses/custom.html", option, username, title);         
    }
    public static void generateFromListe(String list)
    {
        String[] listSplitted = list.split("\\r?\\n");
        String[] test = new String[2];
        MultiPDFDocuments multi = new MultiPDFDocuments();
        PDF.Options option = new PDF.Options();
        

        //Size
        IHtmlToPdfTransformer.PageSize pageSize = new IHtmlToPdfTransformer.PageSize(345, 115);
        option.pageSize = pageSize;
        
        String username = "";
        String title = "";
        for(int x = 0; x < listSplitted.length; x++){
            test = listSplitted[x].split(",");
            username = test[0];
            title = test[1];
            multi.add("tags/caisses/custom.html", option, username, title);
        }

        renderPDF(multi);         
    }
}
