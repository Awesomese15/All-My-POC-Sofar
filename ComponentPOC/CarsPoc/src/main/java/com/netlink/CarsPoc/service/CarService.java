package com.netlink.CarsPoc.service;

import com.netlink.CarsPoc.domain.Cars;
import com.netlink.CarsPoc.repository.CarsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    CarsRepo carsRepo;

    public Page<Cars> getAllCars(int pageNo, int pageSize){
        Pageable pageable= PageRequest.of(pageNo-1, pageSize);
        return carsRepo.findAll(pageable);
    }

    public List<Cars> getAllCars2(){
        return carsRepo.findAll();
    }



}
