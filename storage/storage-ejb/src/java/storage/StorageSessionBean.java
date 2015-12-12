package storage;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.Order;

@Stateless
public class StorageSessionBean implements StorageSessionBeanRemote, StorageSessionBeanLocal {
    @PersistenceContext(unitName = "storage-ejbPU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    //Goods
    @Override
    public List<Goods> findGoods() {
        Query query = em.createNamedQuery("Goods.findAll");
        List goods = query.getResultList();
        return goods;
    }
    
    @Override
    public Goods getGoodById(int id) {
        Query query = em.createNamedQuery("Goods.findById");
        query.setParameter("id", id);
        Goods good = (Goods) query.getResultList().get(0);
        return good;
    }
    
    @Override
    public void addGood(Goods good) {
        em.persist(good);
    }
    
    @Override
    public Goods updateGood(Goods good){
        Goods oldGood = (Goods) getGoodById(good.getId());
        good.setCount(oldGood.getCount());
        em.merge(good);
        return good;
    }
    
    @Override
    public void deleteGoodById(int id) {
        em.remove((Goods) getGoodById(id));
    }
    
    @Override
    public Goods incGoodById(int id, int count) {
        Goods good = (Goods) getGoodById(id);
        good.incCount(count);
        em.persist(good);
        return good;
    }

    @Override
    public Goods decGoodById(int id, int count) {
        Goods good = (Goods) getGoodById(id);
        good.decCount(count);
        em.persist(good);
        return good;
    }
    
    //Cars
    @Override
    public List<Cars> findCars() {
        Query query = em.createNamedQuery("Cars.findAll");
        List cars = query.getResultList();
        return cars;
    }
    
    @Override
    public Cars getCarById(int id) {
        Query query = em.createNamedQuery("Cars.findById");
        query.setParameter("id", id);
        Cars car = (Cars) query.getResultList().get(0);
        return car;
    }
    
    @Override
    public void addCar(Cars car) {
        em.persist(car);
    }
    
    @Override
    public Cars updateCar(Cars car) {
        Cars oldCar = (Cars) getCarById(car.getId());
        car.setState(oldCar.getState());
        car.setDate(oldCar.getDate());
        em.merge(car);
        return car;
    }
    
    @Override
    public void deleteCarById(int id) {
        em.remove((Cars) getCarById(id));
    }

    //Customer
    @Override
    public List<Customers> findCustomers() {
        Query query = em.createNamedQuery("Customers.findAll");
        List customer = query.getResultList();
        return customer;
    }

    @Override
    public Customers getCustomerById(int id) {
        Query query = em.createNamedQuery("Customers.findById");
        query.setParameter("id", id);
        if(!query.getResultList().isEmpty()){
            Customers customer = (Customers) query.getResultList().get(0);
            return customer;
        } else
        {
            return null;
        }
    }

    @Override
    public void addCustomer(Customers customer) {
        em.persist(customer);
    }

    @Override
    public Customers updateCustomer(Customers customer) {
        Customers oldCustomer = (Customers) getCustomerById(customer.getId());
        customer.setLogin(oldCustomer.getLogin());
        em.merge(customer);
        return customer;
    }

    @Override
    public void deleteCustomerById(int id) {
        em.remove((Customers) getCustomerById(id));
    }
    
    //Districts
    @Override
    public List<Districts> findDistricts() {
        Query query = em.createNamedQuery("Districts.findAll");
        List districts = query.getResultList();
        return districts;
    }

    @Override
    public Districts getDistrictById(int id) {
        Query query = em.createNamedQuery("Districts.findById");
        query.setParameter("id", id);
        Districts district = (Districts) query.getResultList().get(0);
        return district;
    }

    @Override
    public void addDistrict(Districts district) {
        em.persist(district);
    }

    @Override
    public Districts updateDistrict(Districts district) {
        em.merge(district);
        return district;
    }

    @Override
    public void deleteDistrictById(int id) {
        em.remove((Districts) getDistrictById(id));
    }

    //Orders
    @Override
    public List<Orders> findOrders() {
        Query query = em.createNamedQuery("Orders.findAll");
        List orders = query.getResultList();
        return orders;
    }
    
    @Override
    public List<Orders> findOrdersByCustomerId(int id) {
        
        Query query = em.createNamedQuery("Orders.findByIdCustomers");
        query.setParameter("customerId", id);
        List orders = query.getResultList();
        return orders;
    }
    
    @Override
    public void addOrder(InputOrder inputOrder) {
        Districts district = (Districts) getDistrictById(inputOrder.getDistrictId());
        Customers customer = (Customers) getCustomerById(inputOrder.getCustomerId());
        
        Orders order = new Orders();
        order.setIdCustomer(customer);
        order.setIdDistrict(district);
        order.setAddress(inputOrder.getAddress());
        order.setAmount(0);
        order.setSize(0);
        order.setDate(new Date());
        order.setState(0);
        em.persist(order);
    }

    @Override
    public Orders getOrderById(int id) {
        Query query = em.createNamedQuery("Orders.findById");
        query.setParameter("id", id);
        Orders order = (Orders) query.getResultList().get(0);
        return order;
    }

    @Override
    public void addOrder(Orders order) {
        em.persist(order);
    }

    @Override
    public Orders updateOrder(InputOrder inputOrder) {
        Orders order = (Orders) getOrderById(inputOrder.getId());
        order.setIdDistrict((Districts) getDistrictById(inputOrder.getDistrictId()));
        order.setAddress(inputOrder.getAddress());
        em.persist(order);
        return order;
    }

    @Override
    public void deleteOrderById(int id) {
        em.remove((Orders) getOrderById(id));
    }
    
    //Goodspositions
    @Override
    public Orders addGoodspositionsInOrder(InputGoodspositions inputGP) {
        Orders order = (Orders) getOrderById(inputGP.getOrderId());
        if(order.getIdCustomer().getId() == inputGP.getCustomerId()){  //заявка пренадлежит пользователю
            Goods good = (Goods) getGoodById(inputGP.getGoodId());
            Goodspositions gp = new Goodspositions(good, inputGP.getCount());
            List<Goodspositions> lgp = order.getGoodspositions();
            lgp.add(gp);
            double size = 0.0, amount = 0.0;
            for (int i = 0; i < lgp.size(); i++) {
                Goodspositions iterGP = lgp.get(i);
                if(iterGP.getIdGoods() != null){
                    size += iterGP.getIdGoods().getGoodSize() *  iterGP.getCount();
                    amount += iterGP.getIdGoods().getPrice() *  iterGP.getCount();
                }
                
            }
            order.setAmount(amount);
            order.setSize(size);
            order.setGoodspositions(lgp);
            em.persist(order);
        }
        return order;
//        Goodspositions gp = new Goodspositions();
//        gp.setCount(10);
//        List<Goodspositions> lgp = new ArrayList<Goodspositions>();
//        lgp.add(gp);
//        //em.persist(gp);
//        Orders o = getOrderById(22);
//        o.setGoodspositions(lgp);
//        em.persist(o);
    }
}
