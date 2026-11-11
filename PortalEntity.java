package com.example.SpringPrograms.Entity;

import java.time.LocalDate;			

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Entity;

@Entity
@Table(name="portal")
@Setter
@Getter
public class PortalEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String jobTitle;
    private String company;
    private LocalDate applicationDate;
    private String type;
    private String status;
    
}