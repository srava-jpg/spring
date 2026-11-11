package com.example.SpringPrograms;

import java.util.List;
import java.util.Map;

import com.example.SpringPrograms.Entity.PortalEntity;

public interface PortalService {

	PortalEntity getDetailsById(Integer id);
	PortalEntity deleteDetailsById(Integer id);
	List<PortalEntity> getAllDetails();
	PortalEntity createDetails(PortalEntity details);
	PortalEntity updateDetails(Integer id, PortalEntity details);
	
	Map<String, Long> getDashboardStatus();
	
}
