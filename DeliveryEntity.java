package com.projects.demo;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class DeliveryEntity {

	@Id
	private Integer id;	
	private String trackingNo;
	private String pickupAddress;
	private String deliveryAddress;
	private String currentStatus;
	private LocalDate orderedDate;
	private LocalDate expectedDate;
}
