package storage;

import java.util.List;
import javax.ejb.Remote;

@Remote
public interface StorageSessionBeanRemote {
    //Goods
    List<Goods> findGoods();
    Goods getGoodById(int id);
    void addGood(Goods good);
    Goods updateGood(Goods good);
    void deleteGoodById(int id);
    Goods incGoodById(int id, int count);
    Goods decGoodById(int id, int count);
    
    //Cars
    List<Cars> findCars();
    List<Cars> findCarsFree();
    Cars getCarById(int id);
    void addCar(Cars car);
    void returnCar(int id);
    Cars updateCar(Cars car);
    void deleteCarById(int id);
    
    //Customers
    List<Customers> findCustomers();
    Customers getCustomerById(int id);
    void addCustomer(Customers customer);
    Customers updateCustomer(Customers customer);
    void deleteCustomerById(int id);
    
    //Districts
    List<Districts> findDistricts();
    Districts getDistrictById(int id);
    void addDistrict(Districts district);
    Districts updateDistrict(Districts district);
    void deleteDistrictById(int id);
    
    //Orders
    List<Orders> findOrders();
    List<Orders> findOrdersByCustomerId(int id);
    List<Orders> findOrdersSent();
    List<Orders> sendOrder(int id, int customerId);
    List<Orders> acceptOrder(int id);
    
    void addOrder(InputOrder inputOrder);
    Orders getOrderById(int id);
    void addOrder(Orders order);
    Orders updateOrder(InputOrder inputOrder);
    void deleteOrderById(int id);
    void addOrderInPackinglist(Orders order);
    
    //Goodspositions
    Orders addGoodspositionsInOrder(InputGoodspositions inputGP);
    Goodspositions getGoodspositionsById(int id);
    Orders deleteGoodspositionsInOrder(Integer goodspositionsId, Integer orderId);
    Orders incGoodspositionInOrder(Integer goodspositionsId, Integer orderId);
    Orders decGoodspositionInOrder(Integer goodspositionsId, Integer orderId);
    
    //Packinglists
    List<Packinglists> findPackinglists();
    List<Packinglists> findPackinglistsAccepted();
    List<Packinglists> findOpenPackinglistsByDistrict(Districts district);
    List<Packinglists> acceptPackinglist(int id);
    List<Packinglists> appointCarInPackinglist(int id, int carId);
    
    Packinglists findPackinglistForReturn(int carId);
    Packinglists addPackinglist(Districts district);
    Packinglists getPackinglistById(int id);
}
