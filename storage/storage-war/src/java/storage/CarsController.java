package storage;

import java.util.Date;
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

@Path("/cars")
public class CarsController {
    
    StorageSessionBeanRemote carsBean;
    
    public CarsController() throws NamingException {
        InitialContext ic = new InitialContext();
        carsBean = (StorageSessionBeanRemote) ic.lookup("storage.StorageSessionBeanRemote");
    }
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Cars> getCars() throws NamingException{
         return carsBean.findCars();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createCar(Cars car) throws NamingException{
        car.setDate(new Date());
        car.setState(true);
        carsBean.addCar(car);
    }
    
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void delCar(String id) throws NamingException {
        carsBean.deleteCarById(Integer.valueOf(id));
    }

    @POST
    @Path("/update/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Cars updateCar(Cars car, @PathParam("id") String id) throws NamingException {
        car.setId(Integer.valueOf(id));
        return carsBean.updateCar(car);
    }
}
