package storage;

import java.util.Date;
import java.util.List;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

@Path("/customers")
public class CustomersController {
    
    StorageSessionBeanRemote customerBean;

    public CustomersController() throws NamingException {
        InitialContext ic = new InitialContext();
        customerBean = (StorageSessionBeanRemote) ic.lookup("storage.StorageSessionBeanRemote");
    }
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Customers> getCustomers() throws NamingException{
        System.out.print(123);
         return customerBean.findCustomers();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createCustomer(Customers customer) throws NamingException{
        customerBean.addCustomer(customer);
    }
    
    @POST
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Customers getCustomerById(@PathParam("id") String id) throws NamingException{
        return customerBean.getCustomerById(Integer.valueOf(id));
    }
    
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void delCustomers(String id) throws NamingException {
        customerBean.deleteCustomerById(Integer.valueOf(id));
    }

    @POST
    @Path("/update/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Customers updateCustomer(Customers customer, @PathParam("id") String id) throws NamingException {
        customer.setId(Integer.valueOf(id));
        return customerBean.updateCustomer(customer);
    }
}
