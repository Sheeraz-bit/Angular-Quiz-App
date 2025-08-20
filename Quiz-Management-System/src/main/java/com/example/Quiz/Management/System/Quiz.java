package com.example.Quiz.Management.System;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "quiz_questions")
public class Quiz {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@JsonProperty("optA")
	private String opta;
	
	@JsonProperty("optB")
	private String optb;
	
	@JsonProperty("optC")
	private String optc;
	
	@JsonProperty("optD")
	private String optd;
	
	private String answer;
	private String question;

	
    public Quiz() {}

	public Quiz(Long id, String question, String optA, String optB, String optC, String optD, String answer) {
		this.id = id;
		this.question = question;
		this.opta = optA;
		this.optb = optB;
		this.optc = optC;
		this.optd = optD;
		this.answer = answer;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getOptA() {
		return opta;
	}

	public void setOptA(String optA) {
		this.opta = optA;
	}

	public String getOptB() {
		return optb;
	}

	public void setOptB(String optB) {
		this.optb = optB;
	}

	public String getOptC() {
		return optc;
	}

	public void setOptC(String optC) {
		this.optc = optC;
	}

	public String getOptD() {
		return optd;
	}

	public void setOptD(String optD) {
		this.optd = optD;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	@Override
	public String toString() {
	    return "Quiz [id=" + id + ", question=" + question + ", optA=" + opta + ", optB=" + optb + 
	           ", optC=" + optc + ", optD=" + optd + ", answer=" + answer + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(answer, id, opta, optb, optc, optd, question);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Quiz other = (Quiz) obj;
		return Objects.equals(answer, other.answer) && Objects.equals(id, other.id) && Objects.equals(opta, other.opta)
				&& Objects.equals(optb, other.optb) && Objects.equals(optc, other.optc)
				&& Objects.equals(optd, other.optd) && Objects.equals(question, other.question);
	}
	
    
}
