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
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Orders delGPInOrder(String id , @PathParam("id") String orderId) throws NamingException {
        return GPBean.deleteGoodspositionsInOrder(Integer.valueOf(id), Integer.valueOf(orderId));
    }

    @POST
    @Path("/inc/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Orders incGoodsposition(String id, @PathParam("id") String orderId) throws NamingException {
        return GPBean.incGoodspositionInOrder(Integer.valueOf(id), Integer.valueOf(orderId));
    }

    @POST
    @Path("/dec/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Orders decGoodsposition(String id, @PathParam("id") String orderId) throws NamingException {
        return GPBean.decGoodspositionInOrder(Integer.valueOf(id), Integer.valueOf(orderId));
    }
}
