package com.myownplea.AssignmentSubmission.util;

import com.myownplea.AssignmentSubmission.domain.User;

public class AuthorityUtil {
	public static boolean hasRole(String role,User user) {
		return user.getAuthorities()
			.stream()
			.filter(auth -> auth.getAuthority().equals(role))
			.count() > 0;
	}
}
