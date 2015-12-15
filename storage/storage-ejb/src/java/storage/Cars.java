/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package storage;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Антон
 */
@Entity
@Table(name = "CARS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Cars.findAll", query = "SELECT c FROM Cars c"),
    @NamedQuery(name = "Cars.findFree", query = "SELECT c FROM Cars c WHERE c.state = 1"),
    @NamedQuery(name = "Cars.findById", query = "SELECT c FROM Cars c WHERE c.id = :id"),
    @NamedQuery(name = "Cars.findByName", query = "SELECT c FROM Cars c WHERE c.name = :name"),
    @NamedQuery(name = "Cars.findByCarSize", query = "SELECT c FROM Cars c WHERE c.carSize = :carSize"),
    @NamedQuery(name = "Cars.findByState", query = "SELECT c FROM Cars c WHERE c.state = :state"),
    @NamedQuery(name = "Cars.findByDate", query = "SELECT c FROM Cars c WHERE c.date = :date")})
public class Cars implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 100)
    @Column(name = "NAME")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CAR_SIZE")
    private double carSize;
    @Basic(optional = false)
    @NotNull
    @Column(name = "STATE")
    private Boolean state;
    @Column(name = "DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    public Cars() {
    }

    public Cars(Integer id) {
        this.id = id;
    }

    public Cars(Integer id, double carSize, Boolean state) {
        this.id = id;
        this.carSize = carSize;
        this.state = state;
    }
    
    public Cars(String name, double carSize, Boolean state, Date date) {
        this.name = name;
        this.carSize = carSize;
        this.state = state;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCarSize() {
        return carSize;
    }

    public void setCarSize(double carSize) {
        this.carSize = carSize;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Cars)) {
            return false;
        }
        Cars other = (Cars) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "storage.Cars[ id=" + id + " ]";
    }
    
}
