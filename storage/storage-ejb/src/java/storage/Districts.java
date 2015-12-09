/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package storage;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Антон
 */
@Entity
@Table(name = "DISTRICTS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Districts.findAll", query = "SELECT d FROM Districts d"),
    @NamedQuery(name = "Districts.findById", query = "SELECT d FROM Districts d WHERE d.id = :id"),
    @NamedQuery(name = "Districts.findByDistrict", query = "SELECT d FROM Districts d WHERE d.district = :district")})
public class Districts implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "DISTRICT_ID")
    private Integer id;
    @Size(max = 100)
    @Column(name = "DISTRICT")
    private String district;

    public Districts() {
    }

    public Districts(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
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
        if (!(object instanceof Districts)) {
            return false;
        }
        Districts other = (Districts) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "storage.Districts[ id=" + id + " ]";
    }
    
}
