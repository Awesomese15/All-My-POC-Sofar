package com.netlink.CarsPoc.repository;


import com.netlink.CarsPoc.domain.Cars;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarsRepo extends JpaRepository<Cars, Integer> {

    @Query(value = "SELECT * FROM cars WHERE make LIKE %?1%", nativeQuery = true)
    public Page<Cars> findByMakeContains(String search, Pageable pageable);

}
