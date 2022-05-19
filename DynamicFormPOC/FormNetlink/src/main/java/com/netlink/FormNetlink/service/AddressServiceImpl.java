package com.netlink.FormNetlink.service;

import com.netlink.FormNetlink.model.Country;
import com.netlink.FormNetlink.repository.CountryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    CountryRepo repo;
    @Override
    public List<Country> getAllCountries() {
        return repo.findCountryList();
    }
}
