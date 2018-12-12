package com.ekki.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ekki.domain.Favorite;
import com.ekki.domain.User;
import com.ekki.repository.FavoriteRepository;

@Service
public class FavoriteService {
	
	@Autowired
	private FavoriteRepository favoriteRepository;
	
	public Favorite create(Favorite favorite) {
		return favoriteRepository.save(favorite);
	}

	public Favorite update(Favorite favorite) {
		return favoriteRepository.saveAndFlush(favorite);
	}

	public Favorite findById(Long id) {
		Optional<Favorite> favorite = favoriteRepository.findById(id);
		return favorite.isPresent() ? favorite.get() : null;
	}

	public List<Favorite> findByUser(User user) {
		return favoriteRepository.getByUser(user);
	}
	
	public void delete(Favorite favorite) {
		favoriteRepository.delete(favorite);
	}
	
	public boolean exists(Long id) {
		return favoriteRepository.existsById(id);
	}



}
