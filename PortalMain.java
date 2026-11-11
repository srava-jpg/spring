package com.example.SpringPrograms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortalMain {

	public static void main(String[] args) {
		
		SpringApplication.run(PortalMain.class, args);
	}

}

// SpringApplication.run() starts the application on port 9997.
// Spring Boot scans the com.example.SpringPrograms package and its subpackages for your entity, repository, service and controller.