package com.myownplea.AssignmentSubmission.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myownplea.AssignmentSubmission.domain.Assignment;
import com.myownplea.AssignmentSubmission.domain.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
	public Set<Assignment> findByUser(User user);
}
