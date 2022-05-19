package com.netlink.CarsPoc.domain;

import javax.persistence.*;

@Entity
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "make")
    private String make;
    @Column(name="model")
    private String model;
    @Column(name="price")
    private Integer price;

    public Cars() {
    }

    public Cars(int id, String make, String model, Integer price) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.price = price;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
