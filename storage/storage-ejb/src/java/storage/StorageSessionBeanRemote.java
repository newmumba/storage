/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package storage;

import java.util.List;
import javax.ejb.Remote;

/**
 *
 * @author Антон
 */
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
    Cars getCarById(int id);
    void addCar(Cars car);
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
    void addOrder(InputOrder inputOrder);
    Orders getOrderById(int id);
    void addOrder(Orders order);
    Orders updateOrder(InputOrder inputOrder);
    void deleteOrderById(int id);
    
    //Goodspositions
    Orders addGoodspositionsInOrder(InputGoodspositions inputGP);
    Goodspositions getGoodspositionsById(int id);
    Orders deleteGoodspositionsInOrder(Integer goodspositionsId, Integer orderId);
}
