package storage;

import java.util.List;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
    
    @GET
    @Path("/accepted")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Packinglists> getPackinglistsAccepted() throws NamingException {
        return packinglistsBean.findPackinglistsAccepted();
    }
    
    @POST
    @Path("/accept")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Packinglists> acceptPackinglist(String packinglistId) throws NamingException {
        return packinglistsBean.acceptPackinglist(Integer.valueOf(packinglistId));
    }
    
    @POST
    @Path("/appoint/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Packinglists> appointCarInPackinglist(String carId, @PathParam("id") String id) throws NamingException {
        return packinglistsBean.appointCarInPackinglist(Integer.valueOf(id), Integer.valueOf(carId));
    }
}
