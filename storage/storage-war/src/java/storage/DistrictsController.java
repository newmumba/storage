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
import javax.ws.rs.core.MediaType;

@Path("/districts")
public class DistrictsController {
    
    StorageSessionBeanRemote cistrictBean;
    
    public DistrictsController() throws NamingException {
        InitialContext ic = new InitialContext();
        cistrictBean = (StorageSessionBeanRemote) ic.lookup("storage.StorageSessionBeanRemote");
    }
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Districts> getDistricts() throws NamingException {
        return cistrictBean.findDistricts();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createDistrict(Districts district) throws NamingException {
        cistrictBean.addDistrict(district);
    }

    @POST
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Districts getDistrictById(@PathParam("id") String id) throws NamingException {
        return cistrictBean.getDistrictById(Integer.valueOf(id));
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void delDistricts(String id) throws NamingException {
        cistrictBean.deleteDistrictById(Integer.valueOf(id));
    }

    @POST
    @Path("/update/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Districts updateDistrict(Districts district, @PathParam("id") String id) throws NamingException {
        district.setId(Integer.valueOf(id));
        return cistrictBean.updateDistrict(district);
    }
}
