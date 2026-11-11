package com.example.SpringPrograms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringPrograms.Entity.ProfilePortalEntity;
import com.example.SpringPrograms.repository.profilePortalRepository;

@Service
public class profilePortalServiceImpl implements profilePortalService{

	@Autowired
	profilePortalRepository repository1;
	
	@Override
	public ProfilePortalEntity updateProfile(Integer id, ProfilePortalEntity details) {

		ProfilePortalEntity p1 = repository1.findById(id).orElse(null);
	    if (p1 != null) {
	        p1.setName(details.getName());
	        p1.setRole(details.getRole());
	        p1.setEmail(details.getEmail());
	        return repository1.save(p1);		// This service calls repository. Then repository calls Spring Data JPA and saves the record in the MySQL portal table.
	    }
	    return null;
	}
	
	@Override
	 public ProfilePortalEntity getProfile(Integer id) {
	        return repository1.findById(id).orElse(null);
	    }
	
	
}
