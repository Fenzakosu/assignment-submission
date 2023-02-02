package com.myownplea.AssignmentSubmission.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myownplea.AssignmentSubmission.domain.Assignment;
import com.myownplea.AssignmentSubmission.domain.User;
import com.myownplea.AssignmentSubmission.enums.AssignmentStatusEnum;
import com.myownplea.AssignmentSubmission.enums.AuthorityEnum;
import com.myownplea.AssignmentSubmission.repository.AssignmentRepository;

@Service
public class AssignmentService {

	@Autowired
	private AssignmentRepository assignmentRepository;

	public Assignment save(User user) {
		Assignment assignment = new Assignment();
		assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
		assignment.setAssignmentNum(findNextAssignmentToSubmit(user));
		assignment.setUser(user);
		return assignmentRepository.save(assignment);
	}

	private Integer findNextAssignmentToSubmit(User user) {
		Set<Assignment> assignmentsByUser = assignmentRepository.findByUser(user);
		if (assignmentsByUser == null) {
			return 1;
		}
		Optional<Integer> nextAssignmentNumOpt = assignmentsByUser.stream()
						.sorted((a1,a2) -> {
							if (a1.getAssignmentNum() == null) return 1;
							if (a2.getAssignmentNum() == null) return 1;
							return a2.getAssignmentNum().compareTo(a1.getAssignmentNum());
							})
						.map(assignment -> {
							if (assignment.getAssignmentNum() == null) return 1;
							return assignment.getAssignmentNum() + 1;
							})
						.findFirst();
		return nextAssignmentNumOpt.orElse(1);
	}

	public Set<Assignment> findByUser(User user) {
		// load assignments if you're code reviewer
		boolean hasCodeReviewerRole = user.getAuthorities()
				.stream()
				.filter(auth -> 
				AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
				.count() > 0;
		if (hasCodeReviewerRole) {
			return assignmentRepository.findByCodeReviewer(user);
		} else {
			
			// load assignments if you're student
			return assignmentRepository.findByUser(user);
		}
	}

	public Optional<Assignment> findById(Long assignmentId) {
		return assignmentRepository.findById(assignmentId);
	}

	public Assignment save(Assignment assignment) {
		return assignmentRepository.save(assignment);
	}

}
