package com.myownplea.AssignmentSubmission.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myownplea.AssignmentSubmission.domain.User;
import com.myownplea.AssignmentSubmission.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public Optional<User> findUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}
