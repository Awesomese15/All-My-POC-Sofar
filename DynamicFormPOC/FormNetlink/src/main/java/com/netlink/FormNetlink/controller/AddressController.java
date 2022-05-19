package com.netlink.FormNetlink.controller;

import com.netlink.FormNetlink.model.Country;
import com.netlink.FormNetlink.service.AddressService;
import com.netlink.FormNetlink.service.AddressServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path ="/address")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class AddressController {

    @Autowired
    AddressService service;

    @GetMapping("/getCountries")
    public ResponseEntity<List<Country>> getCountries(){
        return new ResponseEntity<>(service.getAllCountries(), HttpStatus.OK);
    }
}
