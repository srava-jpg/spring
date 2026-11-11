package com.example.SpringPrograms;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.SpringPrograms.Entity.PortalEntity;
import com.example.SpringPrograms.repository.PortalRepository;

@Service
public class PortalServiceImpl implements PortalService{

	@Autowired
	PortalRepository repository;
	
	@Override
	public PortalEntity getDetailsById(Integer id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public PortalEntity deleteDetailsById(Integer id) {
		PortalEntity p= repository.findById(id).orElse(null);
        if (p != null) {
            repository.deleteById(id);
            return p;
        }
        return null;
	}

	@Override
	public List<PortalEntity> getAllDetails() {
		return repository.findAll();
	}

	@Override
	public PortalEntity createDetails(PortalEntity details) {
		return repository.save(details);
	}

// repository.findById(jobTitle).orElse(null). It is the existing data.  details.getJobTitle() it is the updated data
// p represents the existing record retrieved from the database.
// details represents the new details provided by the user.
	
	@Override
	public PortalEntity updateDetails(Integer id, PortalEntity details) {
		PortalEntity p = repository.findById(id).orElse(null);
		if(p != null) {
			p.setJobTitle(details.getJobTitle());
			p.setCompany(details.getCompany());
			p.setApplicationDate(details.getApplicationDate());
			p.setType(details.getType());
			 p.setStatus(details.getStatus());

			return repository.save(p);
		}
		return null;
	}

	
	@Override
	public Map<String, Long> getDashboardStatus() {
		 List<PortalEntity> applications = repository.findAll();		
		 
		long totalApplied = applications.size();  // returns the number of elements in the list.
		long scheduled = applications.stream().filter(p -> "SCHEDULED".equalsIgnoreCase(p.getStatus())).count();
		long completed = applications.stream().filter(p -> "COMPLETED".equalsIgnoreCase(p.getStatus())).count();
		return Map.of("totalApplied", totalApplied,
				"scheduled", scheduled,
				"completed", completed);
	}

	

}

//In our application consists of '3' records like frontend, web and software developers nd they consists of different status like applied, scheduled, completed
// So we use List<PortalEntity> applications = repository.findAll();  It retrives all the records using findAll() and stores it in a list containing PortalEntity object 


// .filter(p -> "SCHEDULED".equalsIgnoreCase(p.getStatus())). This selects only the records whose status is SCHEDULED.
// p represents one PortalEntity object at a time. 
// p.getStatus() retrieves the status of that object. 
// "SCHEDULED".equalsIgnoreCase(...) checks whether that status matches SCHEDULED. 
// filter() keeps the matching records and excludes the others.
