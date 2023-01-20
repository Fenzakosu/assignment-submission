package com.myownplea.AssignmentSubmission.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Authority implements GrantedAuthority{
	
	private static final long serialVersionUID = 4792805743911563338L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String authority;
	@JsonBackReference
	@ManyToOne
	private User user;
	
	
	public Authority() {
		
	}
public Authority(String authority) {
		this.authority = authority;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	} 
	
}
