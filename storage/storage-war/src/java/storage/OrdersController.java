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

@Path("/orders")
public class OrdersController {
    
    StorageSessionBeanRemote ordersBean;
    
     public OrdersController() throws NamingException {
        InitialContext ic = new InitialContext();
        ordersBean = (StorageSessionBeanRemote) ic.lookup("storage.StorageSessionBeanRemote");
    }
    
    @GET
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Orders> getOrders(@PathParam("id") String id) throws NamingException{
         return ordersBean.findOrdersByCustomerId(Integer.valueOf(id));
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createForCustomer(InputOrder inputOrder) throws NamingException {
        ordersBean.addOrder(inputOrder);
    }
    
    @POST
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Orders getOrderById(@PathParam("id") String id) throws NamingException{
        return ordersBean.getOrderById(Integer.valueOf(id));
    }
    
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void delOrders(String id) throws NamingException {
        ordersBean.deleteOrderById(Integer.valueOf(id));
    }

    @POST
    @Path("/update/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Orders updateOrder(InputOrder inputOrder, @PathParam("id") String id) throws NamingException {
        inputOrder.setId(Integer.valueOf(id));
        return ordersBean.updateOrder(inputOrder);
    }
}
