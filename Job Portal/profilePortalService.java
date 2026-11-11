package com.example.SpringPrograms;

import com.example.SpringPrograms.Entity.ProfilePortalEntity;

public interface profilePortalService {

	public ProfilePortalEntity updateProfile(Integer id, ProfilePortalEntity details);
	ProfilePortalEntity getProfile(Integer id);
}
