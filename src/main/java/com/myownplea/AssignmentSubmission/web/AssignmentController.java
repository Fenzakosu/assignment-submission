package com.myownplea.AssignmentSubmission.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myownplea.AssignmentSubmission.domain.Assignment;
import com.myownplea.AssignmentSubmission.domain.User;
import com.myownplea.AssignmentSubmission.dto.AssignmentResponseDto;
import com.myownplea.AssignmentSubmission.enums.AuthorityEnum;
import com.myownplea.AssignmentSubmission.service.AssignmentService;
import com.myownplea.AssignmentSubmission.service.UserService;
import com.myownplea.AssignmentSubmission.util.AuthorityUtil;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

	@Autowired
	private AssignmentService assignmentService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("")
	public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
		 Assignment newAssignment = assignmentService.save(user);
		 
		 return ResponseEntity.ok(newAssignment);
	}
	
	@GetMapping("")
	public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
		
		
		Set<Assignment> assignments = assignmentService.findByUser(user);
		return ResponseEntity.ok(assignments);
	} 
	
	@GetMapping("{assignmentId}")
	public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user){
		Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
		
		
		AssignmentResponseDto response = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
		return ResponseEntity.ok(response);
	} 
	
	@PutMapping("{assignmentId}")
	public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId,
			@RequestBody Assignment assignment,@AuthenticationPrincipal User user){
		
		// add the code reviewer to this assignment if it was claimed
		User codeReviewer = assignment.getCodeReviewer();
		if (codeReviewer != null) {
			codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());
			if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)) {
				assignment.setCodeReviewer(codeReviewer);
			}
		}
		
		Assignment updatedAssignment = assignmentService.save(assignment);
		return ResponseEntity.ok(updatedAssignment);
	}
}
