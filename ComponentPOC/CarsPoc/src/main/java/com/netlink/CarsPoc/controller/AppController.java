package com.netlink.CarsPoc.controller;

import com.netlink.CarsPoc.domain.Cars;
import com.netlink.CarsPoc.repository.CarsRepo;
import com.netlink.CarsPoc.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppController {

    @Autowired
    CarService service;

    @Autowired
    CarsRepo repo;

    private Sort.Direction getSortDirection(String direction) {
        if (direction.equals("asc")) {
            return Sort.Direction.ASC;
        } else if (direction.equals("desc")) {
            return Sort.Direction.DESC;
        }

        return Sort.Direction.ASC;
    }

    @GetMapping("/allcars/{pageNo}")
    public ResponseEntity<List<Cars>> reteieveAllCarsPage(@PathVariable(value = "pageNo") int pageNo ){
        Page<Cars> pages= service.getAllCars(pageNo,10);
        List<Cars> carsList=pages.getContent();
        return new ResponseEntity<>(carsList, HttpStatus.OK);
    }

    @GetMapping("/allcars/all")
    public ResponseEntity<List<Cars>> reteieveAllCars(){
        return new ResponseEntity<>(service.getAllCars2(), HttpStatus.OK);

    }

    @GetMapping("/getcars")
    public ResponseEntity<Map<String , Object>> getAllCarPages(
            @RequestParam(required = false) String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ){

        try{
            List<Cars> carList=new ArrayList<>();
            Pageable paging= PageRequest.of(page, size);
            Page<Cars> pageTuts= repo.findAll(paging);
            carList=pageTuts.getContent();

            Map<String, Object> response=new HashMap<>();
            response.put("cars", carList);
            response.put("currentPage", pageTuts.getNumber());
            response.put("totalItems", pageTuts.getTotalElements());
            response.put("totalPages", pageTuts.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

//    @GetMapping
//    public ResponseEntity<List<Cars>>getSortedCars(
//            @RequestParam(required = false) String make,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "3") int size,
//            @RequestParam(defaultValue = "id,desc") String[] sort){
//        try {
//            List<Order> orders = new ArrayList<Order>();
//
//            if (sort[0].contains(",")) {
//                // will sort more than 2 fields
//                // sortOrder="field, direction"
//                for (String sortOrder : sort) {
//                    String[] _sort = sortOrder.split(",");
//                    orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
//                }
//            } else {
//                // sort=[field, direction]
//                orders.add(new Order(getSortDirection(sort[1]), sort[0]));
//            }
//            List<Cars> cars=new ArrayList<>();
//            Pageable pagingSort = PageRequest.of(page, size, Sort.by(orders));
//
//            Page<Cars> carTuts;
//            if(null==make){
//                repo
//            }
//        }Ca

    @GetMapping("/get")
    public ResponseEntity<Map<String, Object>> getSorted(
            @RequestParam(required = false) String sorting,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(required = false) String search
    ){
        try{
            List<Cars> carList=new ArrayList<>();
            Page<Cars> pageTuts;

            if(search != null && !search.isEmpty()){
                Pageable pageable=PageRequest.of(page, size);
                pageTuts=repo.findByMakeContains(search, pageable);
                carList=pageTuts.getContent();
                Map<String, Object> response=new HashMap<>();
                response.put("cars", carList);
                response.put("currentPage", pageTuts.getNumber());
                response.put("totalItems", pageTuts.getTotalElements());
                response.put("totalPages", pageTuts.getTotalPages());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else if(sorting != null && !sorting.isEmpty()){
                if(sorting.equals("asc")){
                    pageTuts=repo.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "make")));
                }else {
                    pageTuts=repo.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "make")));
                }

                carList=pageTuts.getContent();
                Map<String, Object> response=new HashMap<>();
                response.put("cars", carList);
                response.put("currentPage", pageTuts.getNumber());
                response.put("totalItems", pageTuts.getTotalElements());
                response.put("totalPages", pageTuts.getTotalPages());

                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            else{
               carList=new ArrayList<>();
                Pageable paging= PageRequest.of(page, size);
                pageTuts= repo.findAll(paging);
                carList=pageTuts.getContent();

                Map<String, Object> response=new HashMap<>();
                response.put("cars", carList);
                response.put("currentPage", pageTuts.getNumber());
                response.put("totalItems", pageTuts.getTotalElements());
                response.put("totalPages", pageTuts.getTotalPages());

                return new ResponseEntity<>(response, HttpStatus.OK);
            }


        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }



    }


}
