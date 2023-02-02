package com.myownplea.AssignmentSubmission.dto;

//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;

import com.myownplea.AssignmentSubmission.domain.Assignment;
import com.myownplea.AssignmentSubmission.enums.AssignmentEnum;
import com.myownplea.AssignmentSubmission.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {
	
	private Assignment assignment;
//	private List<AssignmentEnumDto>  assignmentEnums= new ArrayList<>();
	
	private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
	
	private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
	
	public AssignmentResponseDto(Assignment assignment) {
		super();
		this.assignment = assignment;
//		Arrays.stream(AssignmentEnum.values())
//			.forEach(assignmentEnum -> {
//				AssignmentEnumDto assignmentEnumDto = new AssignmentEnumDto(assignmentEnum.getAssignmentName(),assignmentEnum.getAssignmentNum());
//				assignmentEnums.add(assignmentEnumDto);
//			});
	}
	public Assignment getAssignment() {
		return assignment;
	}
	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
	}
//	public List<AssignmentEnumDto> getAssignmentEnum() {
//		return assignmentEnums;
//	}
//	
	public AssignmentEnum[] getAssignmentEnums() {
		return assignmentEnums;
	}
	public AssignmentStatusEnum[] getStatusEnums() {
		return statusEnums;
	}
	
	
	
}
