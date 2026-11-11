package com.example.SpringPrograms.Entity;

import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//Here we created another entity class for JobPortal. To update the details of edit profile and store it in mysql
@Entity
@Table(name="profile")
@Setter
@Getter
public class ProfilePortalEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
    private String role;
    private String email;
}
