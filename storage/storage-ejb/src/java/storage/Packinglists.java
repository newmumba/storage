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
@Table(name = "PACKINGLISTS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Packinglists.findAll", query = "SELECT p FROM Packinglists p"),
    @NamedQuery(name = "Packinglists.findById", query = "SELECT p FROM Packinglists p WHERE p.id = :id"),
    @NamedQuery(name = "Packinglists.findByPlSize", query = "SELECT p FROM Packinglists p WHERE p.plSize = :plSize"),
    @NamedQuery(name = "Packinglists.findByIdDistrict", query = "SELECT p FROM Packinglists p WHERE p.idDistrict = :idDistrict"),
    @NamedQuery(name = "Packinglists.findByState", query = "SELECT p FROM Packinglists p WHERE p.state = :state"),
    @NamedQuery(name = "Packinglists.findByFirsdate", query = "SELECT p FROM Packinglists p WHERE p.firsdate = :firsdate"),
    @NamedQuery(name = "Packinglists.findByIdCar", query = "SELECT p FROM Packinglists p WHERE p.idCar = :idCar")})
public class Packinglists implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "PL_SIZE")
    private double plSize;
    @Column(name = "ID_DISTRICT")
    private Integer idDistrict;
    @Size(max = 50)
    @Column(name = "STATE")
    private String state;
    @Column(name = "FIRSDATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date firsdate;
    @Column(name = "ID_CAR")
    private Integer idCar;

    public Packinglists() {
    }

    public Packinglists(Integer id) {
        this.id = id;
    }

    public Packinglists(Integer id, double plSize) {
        this.id = id;
        this.plSize = plSize;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getPlSize() {
        return plSize;
    }

    public void setPlSize(double plSize) {
        this.plSize = plSize;
    }

    public Integer getIdDistrict() {
        return idDistrict;
    }

    public void setIdDistrict(Integer idDistrict) {
        this.idDistrict = idDistrict;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Date getFirsdate() {
        return firsdate;
    }

    public void setFirsdate(Date firsdate) {
        this.firsdate = firsdate;
    }

    public Integer getIdCar() {
        return idCar;
    }

    public void setIdCar(Integer idCar) {
        this.idCar = idCar;
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
        if (!(object instanceof Packinglists)) {
            return false;
        }
        Packinglists other = (Packinglists) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "storage.Packinglists[ id=" + id + " ]";
    }
    
}
