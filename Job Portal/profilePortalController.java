package com.example.SpringPrograms.controler;
// Handles profile details using ProfilePortalEntity.

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.SpringPrograms.profilePortalService;
import com.example.SpringPrograms.Entity.ProfilePortalEntity;

@RestController
@RequestMapping("portal/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class profilePortalController {
	@Autowired
	profilePortalService controller1;
	
	// Get profile details
    @GetMapping("/{id}")
    public ProfilePortalEntity getProfile(@PathVariable Integer id) {

        return controller1.getProfile(id);
    }
	
    @PutMapping("/update/{id}")
	public ProfilePortalEntity updateProfile(@PathVariable Integer id, @RequestBody ProfilePortalEntity details) {
		return controller1.updateProfile(id, details);
	}
}
