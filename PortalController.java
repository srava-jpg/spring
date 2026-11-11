package com.example.SpringPrograms.controler;
// Handles job application details using PortalEntity.

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringPrograms.PortalService;
import com.example.SpringPrograms.Entity.PortalEntity;

@RestController
@RequestMapping("/portal")
@CrossOrigin(origins = "http://localhost:3000")
public class PortalController {

	@Autowired
	PortalService service;
	
	@GetMapping("/get/{id}")
	public PortalEntity getDetailsById(@PathVariable Integer id) {
		return service.getDetailsById(id);
	}
	
	 @GetMapping("/getAll")
	    public List<PortalEntity> getAllDetails() {
	        return service.getAllDetails();
	    }
	 
	@PostMapping("/create")
	public PortalEntity createDetails(@RequestBody PortalEntity details) {
		return service.createDetails(details);
	}
	
	@PutMapping("/update/{id}")
	public PortalEntity updateDetails(@PathVariable Integer id, @RequestBody PortalEntity details) {
		return service.updateDetails(id, details);
	}
	
	@DeleteMapping("/delete/{id}")
	public PortalEntity deleteDetailsById(@PathVariable Integer id) {
		return service.deleteDetailsById(id);
	}
	
	@GetMapping("/dashboard/status")
	public Map<String, Long> getDashboardStatus() {
		return service.getDashboardStatus();
	}
	
	
}
