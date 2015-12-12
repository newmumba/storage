package storage;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

@Path("/gp")
public class GoodspositionsController {
    StorageSessionBeanRemote GPBean;

    public GoodspositionsController() throws NamingException {
        InitialContext ic = new InitialContext();
        GPBean = (StorageSessionBeanRemote) ic.lookup("storage.StorageSessionBeanRemote");
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Orders addGPInOrder(InputGoodspositions inputGP) throws NamingException {
        return GPBean.addGoodspositionsInOrder(inputGP);
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void delGood(String id) throws NamingException {
        GPBean.deleteGoodById(Integer.valueOf(id));
    }

    @POST
    @Path("/update/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Goods updateGood(Goods good, @PathParam("id") String id) throws NamingException {
        good.setId(Integer.valueOf(id));
        return GPBean.updateGood(good);
    }
}
