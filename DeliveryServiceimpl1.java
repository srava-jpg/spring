package com.projects.demo.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.projects.demo.DeliveryEntity;
import com.projects.demo.DeliveryRepository1;

@Service
public class DeliveryServiceimpl1 implements DeliveryServiceInterface1{
	
	@Autowired
	DeliveryRepository1 service;

	@Override
	public DeliveryEntity getDetailsById(Integer id) {
		
		return service.findById(id).orElse(null);
	}

	
	@Override
	public DeliveryEntity deleteDetails( Integer id) {

	    DeliveryEntity res = getDetailsById(id);

	    if (res != null) {
	        service.deleteById(id);
	        return res;
	    }

	    return null;
	}
	
	@Override
	public List<DeliveryEntity> getAllDetailsByid(Integer id){
		return null;
	}

	@Override
	public DeliveryEntity saveDetails(DeliveryEntity delivery) {
		
		return service.save(delivery);
	}

	@Override
	public DeliveryEntity updateDetails(@RequestBody DeliveryEntity d, @PathVariable Integer id) {		//d → the new data coming from the request body.  id → the ID coming from the URL.
		
		DeliveryEntity res = getDetailsById(id);		//It calls the previous record and store it in res
		res.setCurrentStatus(d.getCurrentStatus());		//d.getCurrentStatus() gets the new status from the request. And it is set
		if (res != null) {
	        res.setTrackingNo(d.getTrackingNo());
	        res.setPickupAddress(d.getPickupAddress());
	        res.setDeliveryAddress(d.getDeliveryAddress());
	        res.setCurrentStatus(d.getCurrentStatus());
	        res.setOrderedDate(d.getOrderedDate());
	        res.setExpectedDate(d.getExpectedDate());
		return service.save(res);
	}

	return null;
}

//Map means a collection that stores key-value pairs like  "total":0, "delivered":0, "In Transit":0. Here total is string and 0 is long
//The put() method adds a key-value pair to the map. service.count() gets the total number of records from the database means count
//	data.put("delivered", service.countByCurrentStatus("Delivered"));  This counts the delivery records whose currentStatus is "Delivered" and stores the result under the key "delivered".
	@Override
	public Map<String, Long> getDashboard() {

	    Map<String, Long> data = new HashMap<>();

	    data.put("total", service.count());
	    data.put("delivered", service.countByCurrentStatus("Delivered"));
	    data.put("inTransit", service.countByCurrentStatus("In Transit"));
	    data.put("pending", service.countByCurrentStatus("Pending"));

	    return data;
	}

}
