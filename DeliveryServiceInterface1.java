package com.projects.demo.Service;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import com.projects.demo.DeliveryEntity;

public interface DeliveryServiceInterface1 {
	
	List<DeliveryEntity> getAllDetailsByid(Integer id);
	DeliveryEntity getDetailsById(Integer id);
	DeliveryEntity updateDetails(@RequestBody DeliveryEntity d, @PathVariable Integer id);
	DeliveryEntity deleteDetails(Integer id);		//We don't need to use @Pathvariable. Because it recieves the value normally. Because in controller it already reads the id from URl
	DeliveryEntity saveDetails(DeliveryEntity delivery);	//It is for post. SO we use DeliveryEntity object which consists of all columns which are mentioned in entity class
	Map<String, Long> getDashboard();
}
