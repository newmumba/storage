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
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Orders> getOrdersAll() throws NamingException {
        return ordersBean.findOrders();
    }

    @GET
    @Path("/sent")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Orders> getOrdersSent() throws NamingException {
        return ordersBean.findOrdersSent();
    }
    
    @GET
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Orders> getOrders(@PathParam("id") String id) throws NamingException{
         return ordersBean.findOrdersByCustomerId(Integer.valueOf(id));
    }
    
    @POST
    @Path("/add/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createForCustomer(InputOrder inputOrder) throws NamingException {
        ordersBean.addOrder(inputOrder);
    }
    
    @POST
    @Path("/send/{customerId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Orders> sendOrder(String orderId, @PathParam("customerId") String customerId) throws NamingException {
        return ordersBean.sendOrder(Integer.valueOf(orderId), Integer.valueOf(customerId));
    }
    
    @POST
    @Path("/accept/")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Orders> acceptOrder(String orderId) throws NamingException {
        return ordersBean.acceptOrder(Integer.valueOf(orderId));
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
