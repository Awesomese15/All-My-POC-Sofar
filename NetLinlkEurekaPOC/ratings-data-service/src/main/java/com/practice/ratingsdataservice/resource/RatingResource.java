package com.practice.ratingsdataservice.resource;


import com.practice.ratingsdataservice.model.Rating;
import com.practice.ratingsdataservice.model.UserRating;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import sun.security.jgss.HttpCaller;

@Repository
@RequestMapping("/ratingsdata")
public class RatingResource {
    @RequestMapping("/movies/{movieId}")
    public Rating getMovieRating(@PathVariable("movieId") String movieId) {
        return new Rating(movieId, 4);
    }

    @RequestMapping("/user/{userId}")
    public ResponseEntity<UserRating>  getUserRatings(@PathVariable("userId") String userId) {
        UserRating userRating = new UserRating();
        userRating.initData(userId);
        return new ResponseEntity<>(userRating, HttpStatus.OK);

    }
}
