package storage;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("/auth")
public class AuthController {
     StorageSessionBeanRemote authBean;
    
    public AuthController() throws NamingException {
        InitialContext ic = new InitialContext();
        authBean = (StorageSessionBeanRemote) ic.lookup("storage.StorageSessionBeanRemote");
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void authTest(Auth auth) throws NamingException{
            System.out.print(auth);
    }
}
