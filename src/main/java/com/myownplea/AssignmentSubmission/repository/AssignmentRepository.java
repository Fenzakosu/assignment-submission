package com.myownplea.AssignmentSubmission.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myownplea.AssignmentSubmission.domain.Assignment;
import com.myownplea.AssignmentSubmission.domain.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
	public Set<Assignment> findByUser(User user);
	
	@Query("SELECT a FROM Assignment a "
			+ "WHERE a.status = 'submitted' "
			+ "OR a.codeReviewer = :codeReviewer" )
	public Set<Assignment> findByCodeReviewer(User codeReviewer);
}
