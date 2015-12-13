package storage;

import java.util.List;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("/pl")
public class PackinglistsController {
    StorageSessionBeanRemote packinglistsBean;

    public PackinglistsController() throws NamingException {
        InitialContext ic = new InitialContext();
        packinglistsBean = (StorageSessionBeanRemote) ic.lookup("storage.StorageSessionBeanRemote");
    }
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Packinglists> getPackinglistsAll() throws NamingException {
        return packinglistsBean.findPackinglists();
    }
    
    @POST
    @Path("/accept/")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Packinglists> acceptPackinglist(String packinglistId) throws NamingException {
        return packinglistsBean.acceptPackinglist(Integer.valueOf(packinglistId));
    }
}
