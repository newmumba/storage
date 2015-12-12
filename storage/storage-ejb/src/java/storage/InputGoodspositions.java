package storage;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class InputGoodspositions implements Serializable{
    
    private Integer orderId;
    private Integer goodId;
    private Integer customerId;
    private Integer count;
    

    public InputGoodspositions(){
    }

    public InputGoodspositions(Integer orderId, Integer goodId, Integer customerId, Integer count) {
        this.orderId = orderId;
        this.goodId = goodId;
        this.customerId = customerId;
        this.count = count;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getGoodId() {
        return goodId;
    }

    public void setGoodId(Integer goodId) {
        this.goodId = goodId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
