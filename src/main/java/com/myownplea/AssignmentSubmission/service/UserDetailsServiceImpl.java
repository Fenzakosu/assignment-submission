package com.myownplea.AssignmentSubmission.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.myownplea.AssignmentSubmission.domain.User;
import com.myownplea.AssignmentSubmission.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> userOpt = userRepository.findByUsername(username);

		return userOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid Credentials"));
//		User user = new User();
//		user.setUsername(username);
//		user.setPassword(passwordEncoder2().encode("password"));
//		user.setId(1L);
//		return user;
	}
	
//	@Bean
//	public PasswordEncoder passwordEncoder2() {
//		return new BCryptPasswordEncoder();
//	}

}
