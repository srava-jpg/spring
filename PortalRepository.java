package com.example.SpringPrograms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.SpringPrograms.Entity.PortalEntity;

public interface PortalRepository extends JpaRepository<PortalEntity, Integer> {

}
