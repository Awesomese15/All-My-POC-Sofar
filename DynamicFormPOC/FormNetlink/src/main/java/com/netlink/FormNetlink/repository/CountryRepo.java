package com.netlink.FormNetlink.repository;


import com.netlink.FormNetlink.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepo extends JpaRepository<Country, Integer> {
       @Query(value = "SELECT * FROM country", nativeQuery = true)
        public List<Country> findCountryList();

}
