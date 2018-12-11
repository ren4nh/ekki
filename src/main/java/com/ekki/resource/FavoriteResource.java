package com.ekki.resource;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ekki.bean.FavoriteBean;
import com.ekki.domain.Favorite;
import com.ekki.domain.User;
import com.ekki.service.FavoriteService;
import com.ekki.service.UserService;
import com.ekki.utils.ApiResponse;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("favorite")
public class FavoriteResource {

	@Autowired
	private FavoriteService favoriteService;
	@Autowired
	private UserService userService;

	@PostMapping
	@ApiOperation(value = "Creates a new favorite")
	public ResponseEntity<Object> createFavorite(@Valid @RequestBody FavoriteBean favoriteBean) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "User not found"), HttpStatus.NOT_FOUND);
		}
		User fav = userService.findByUsername(favoriteBean.getEmail());
		if (fav == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "User not found"), HttpStatus.NOT_FOUND);
		}
		Favorite favorite = Favorite.builder().description(favoriteBean.getDescription()).user(u).favorite(fav).build();
		favorite = favoriteService.create(favorite);
		return new ResponseEntity<Object>(new ApiResponse(favorite), HttpStatus.CREATED);
	}

	@GetMapping("/user")
	@ApiOperation(value = "Get all favorites by user")
	public ResponseEntity<Object> getAllFavorites() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User u = userService.findByUsername(authentication.getName());
		if (u == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "User not found"), HttpStatus.NOT_FOUND);
		}
		List<Favorite> favorites = favoriteService.findByUser(u);
		return new ResponseEntity<Object>(new ApiResponse(favorites), HttpStatus.OK);
	}

	@PutMapping("/{favoriteId}")
	@ApiOperation(value = "Update a favorite")
	public ResponseEntity<Object> updateFavorite(@PathVariable("favoriteId") Long favoriteId, @Valid @RequestBody FavoriteBean favoriteBean) {
		Favorite favorite = favoriteService.findById(favoriteId);
		if (favorite == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Bank not found"), HttpStatus.NOT_FOUND);
		}
		User fav = userService.findByUsername(favoriteBean.getEmail());
		if (fav == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "User not found"), HttpStatus.NOT_FOUND);
		}
		favorite.setDescription(favoriteBean.getDescription());
		favorite.setFavorite(fav);
		favorite = favoriteService.update(favorite);
		return new ResponseEntity<Object>(new ApiResponse(favorite), HttpStatus.OK);
	}

	@DeleteMapping("/{favoriteId}")
	@ApiOperation(value = "Delete a favorite")
	public ResponseEntity<Object> deleteBank(@PathVariable("favoriteId") Long favoriteId) {
		Favorite favorite = favoriteService.findById(favoriteId);
		if (favorite == null) {
			return new ResponseEntity<Object>(new ApiResponse(404, 404, "Bank not found"), HttpStatus.NOT_FOUND);
		}
		favoriteService.delete(favorite);
		return new ResponseEntity<Object>(new ApiResponse(true), HttpStatus.OK);
	}

}
