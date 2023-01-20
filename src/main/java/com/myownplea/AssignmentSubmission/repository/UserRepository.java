package com.myownplea.AssignmentSubmission.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myownplea.AssignmentSubmission.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);

}
