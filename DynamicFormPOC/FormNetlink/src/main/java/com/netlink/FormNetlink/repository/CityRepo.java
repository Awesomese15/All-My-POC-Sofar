package com.netlink.FormNetlink.repository;

import com.netlink.FormNetlink.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepo extends JpaRepository<City, Integer> {


}
