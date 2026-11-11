package com.projects.demo.Controller;

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

import com.projects.demo.DeliveryEntity;
import com.projects.demo.Service.DeliveryServiceInterface1;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping
public class DeliveryController1 {
	@Autowired
	DeliveryServiceInterface1 control;
	
	@GetMapping("/get/{id}")
	public DeliveryEntity getDetailsById(@PathVariable  Integer id) {	//For get we use @PathVariable. It gets a value form url. For suppose if we give "/get/1" then spring takes 1 from url and put it into Integer id
		return control.getDetailsById(id);
	} 
	
	@PostMapping("/post")
	public DeliveryEntity saveDetails(@RequestBody DeliveryEntity delivery) {	//Here postman sends the json data. Then by using @RequestBody. Spring converts this JSON into a DeliveryEntity object. That's why @RequestBody is very common with POST and PUT.
	    return control.saveDetails(delivery);
	}
	
	@PutMapping("/update/{id}")
	public DeliveryEntity updateDetails(@RequestBody DeliveryEntity d, @PathVariable Integer id) {	
		return control.updateDetails(d, id);
	}
	
	@DeleteMapping("/delete/{id}")
	public DeliveryEntity deleteDetails(@PathVariable Integer id) {		//Here @PathVariable is for reading values from URL
	    return control.deleteDetails(id);
	}
	
	@GetMapping("/dashboard")
	public Map<String, Long> getDashboard() {
    return control.getDashboard();
	}
}
