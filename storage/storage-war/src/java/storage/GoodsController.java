/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package storage;

import java.util.List;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/goods")
public class GoodsController {
    
    StorageSessionBeanRemote goodsBean;
    
    public GoodsController() throws NamingException {
        InitialContext ic = new InitialContext();
        goodsBean = (StorageSessionBeanRemote) ic.lookup("storage.StorageSessionBeanRemote");
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Goods> getGoods() throws NamingException{
        return goodsBean.findGoods();
    }    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createGood(Goods good) throws NamingException{
         goodsBean.addGood(good);
    }
    
    @POST
    @Path("/inc")
    @Consumes(MediaType.APPLICATION_JSON)
    public Goods incGood(String id) throws NamingException{
        return goodsBean.incGoodById(Integer.valueOf(id), 1);
    }
    
    @POST
    @Path("/dec")
    @Consumes(MediaType.APPLICATION_JSON)
    public Goods decGood(String id) throws NamingException{
         return goodsBean.decGoodById(Integer.valueOf(id), 1);
    }
    
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void delGood(String id) throws NamingException{
         goodsBean.deleteGoodById(Integer.valueOf(id));
    }

    @POST
    @Path("/update/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Goods updateGood(Goods good, @PathParam("id") String id) throws NamingException{
        good.setId(Integer.valueOf(id));
        return goodsBean.updateGood(good);
    }
}