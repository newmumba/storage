package storage;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "GOODSPOSITIONS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Goodspositions.findAll", query = "SELECT g FROM Goodspositions g"),
    @NamedQuery(name = "Goodspositions.findById", query = "SELECT g FROM Goodspositions g WHERE g.id = :id"),
    @NamedQuery(name = "Goodspositions.findByCount", query = "SELECT g FROM Goodspositions g WHERE g.count = :count")})
public class Goodspositions implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "GOODPOSITION_ID")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "GOODPOSITION_GOOD_ID", referencedColumnName = "GOOD_ID")
    private Goods good;
    @Basic(optional = false)
    @NotNull
    @Column(name = "COUNT")
    private int count;

    public Goodspositions() {
    }

    public Goodspositions(Integer id) {
        this.id = id;
    }

    public Goodspositions(Integer id, int count) {
        this.id = id;
        this.count = count;
    }

    public Goodspositions(Goods good, int count) {
        this.good = good;
        this.count = count;        
    }
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Goods getIdGoods() {
        return good;
    }

    public void setIdGoods(Goods good) {
        this.good = good;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
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
        if (!(object instanceof Goodspositions)) {
            return false;
        }
        Goodspositions other = (Goodspositions) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "storage.Goodspositions[ id=" + id + " ]";
    }
    
}
