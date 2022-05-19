package com.netlink.FormNetlink.repository;

import com.netlink.FormNetlink.model.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepo extends JpaRepository<State, Integer> {

}
