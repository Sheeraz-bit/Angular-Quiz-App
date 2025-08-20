package com.example.Quiz.Management.System;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "username")
	private String username;
	private String email;
	private String password;
	private String role;
	@Column(name = "attempt")
	@JsonProperty("attemptedExam")
	private boolean attemptedExam = false;
	
	

	public User() {}


	public User(Long id, String username, String email, String password, String role, boolean attemptedExam) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.attemptedExam = attemptedExam;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public boolean isAttemptedExam() {
		return attemptedExam;
	}


	public void setAttemptedExam(boolean attemptedExam) {
		this.attemptedExam = attemptedExam;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", role="
				+ role + ", attemptedExam=" + attemptedExam + "]";
	}


	@Override
	public int hashCode() {
		return Objects.hash(attemptedExam, email, id, password, role, username);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return attemptedExam == other.attemptedExam && Objects.equals(email, other.email)
				&& Objects.equals(id, other.id) && Objects.equals(password, other.password)
				&& Objects.equals(role, other.role) && Objects.equals(username, other.username);
	}
	
	
	

}
