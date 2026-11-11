import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';

const Delivery = () => {
    const [delivery, setDelivery] = useState({
        id: "",
        trackingNo: "",
        pickupAddress: "",
        deliveryAddress: "",
        currentStatus: "",
        orderedDate: "",
        expectedDate: ""
    });
   
    const [data, setData] = useState({
        total: 0,
        delivered: 0,
        inTransit: 0,
        pending: 0
    });

//  async allows you to use await inside the function. (e) is a parameter that can receive an event objectfetch() sends the HTTP request.  await waits for the server's response. !res.ok means the response was not successful. throw new Error(...) creates an error and transfers execution to catch.  
    const getDetails = async (e) => {
         try { 
            const res = await fetch(`http://localhost:9998/get/${delivery.id}`);
                 if (!res.ok) { 
                    throw new Error("Failed to fetch delivery details"); 
                }
        const store = await res.json();     //  res.json() converts that JSON response into a JavaScript object.  
        setDelivery(store);
    }catch (error) { 
        console.error("GET error:", error); 
        alert("Unable to fetch data. Check Spring Boot."); 
    } 
};

    
    const handleChange = (e) => {       // Here e means parameter. ...delivery is a spread operator which saves the existing data. "e.target.value" gives the whatever user typed. Here e.target.name gives trackingno and e.target.value gives what ever user typed like if he enters "TNK3003" then it  gives those value. For storing previous data we use ...delivery 
        setDelivery({...delivery, [e.target.name] : e.target.value})
};


// It sends a request to spring boot. Here method is http request type and header tells that the data is JSON type.   JSON.stringify(delivery) converts the JavaScript object into JSON: 
    const postDelivery = async () => {
     try{
        const res = await fetch("http://localhost:9998/post",
        {
            method : "POST",  headers: {"Content-Type": "application/json"},   
         body: JSON.stringify(delivery)     
    });
    if (!res.ok) {
         throw new Error("Failed to save delivery"); 
    }
     const store = await res.json();        //  After passing the data into database it may sends a response back. SO we use res.json() which converts json into java object 

        setDelivery(store);

        alert("Delivery saved successfully");
    } catch (error) {
        console.error("POST error:", error);
        alert("Unable to save delivery. Check Spring Boot.");
    }
    };
    
    const deleteDelivery = async () => {
    try {
        const res = await fetch(
            `http://localhost:9998/delete/${delivery.id}`,
            {
                method: "DELETE"
            }
        );
         if (!res.ok) {
            throw new Error("Failed to delete delivery");
        }
        alert("Delivery deleted successfully");
         } catch (error) {
                console.error("DELETE error:", error);
                 alert("Unable to delete delivery. Check the ID and Spring Boot.");
                        }
};


const updateDelivery = async () => {
    try {
        if (!delivery.id) {
            alert("Please enter or fetch a delivery ID first");
            return;
        }

        const res = await fetch(`http://localhost:9998/update/${delivery.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(delivery)
            }
        );

        if (!res.ok) {
            throw new Error(
                `Update failed: HTTP ${res.status}`
            );
        }

        const store = await res.json();
        setDelivery(store);
        alert("Delivery updated successfully");
    } catch (error) {
        console.error("UPDATE error:", error);
        alert(error.message);
    }
};

// useEffect is a React Hook used to perform an operation when a component renders, or when specified dependencies change. .then() specifies what to do after the previous asynchronous operation completes successfully.  .then(result => setData(result)).  This receives the JavaScript object produced by res.json(). result stores the dashboard data. setData(result) Updates React state so the dashboard can display the new counts. 
    useEffect(() => {
        fetch("http://localhost:9998/dashboard")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch dashboard");
                }
                return res.json();
            })
            .then(result => setData(result))
            .catch(error => console.error(error));
    }, []);


    {/* 
Class	                Purpose
container	            Gives proper width and spacing
mt-4	                Top margin
mb-4	                Bottom margin
table	                Bootstrap table styling
table-bordered	        Adds borders
table-hover	            Highlights row when mouse moves over it
align-middle	        Vertically centers content
text-center	            Centers text
table-dark	            Dark table header
table-responsive	    Makes table scrollable on small screens
shadow	                Adds shadow around table
rounded	                Rounded corners
badge bg-primary	    Makes status look like a badge
g-3                     Means space betweeen
col-md-3                On medium and larger screens, the column takes 3 of 12 grid units (25% width).
col-6                   On extra-small screens, the column takes 6 of 12 grid units (50% width)    */}

    return(
    <div className="container mt-4">
        
        <h2 className="text-center mb-4">  Delivery Tracker Dashboard </h2>

        {/* Dashboard Cards */}
        <div className="row g-3 mb-4">

            <div className="col-md-3 col-6">
                <div className="card bg-primary text-white shadow">
                    <div className="card-body">
                        <h6>Total Deliveries</h6>
                        <h2>{data.total}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-6">
                <div className="card bg-success text-white shadow">
                    <div className="card-body">
                        <h6>Delivered</h6>
                        <h2>{data.delivered}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-6">
                <div className="card bg-warning shadow">
                    <div className="card-body">
                        <h6>In Transit</h6>
                        <h2>{data.inTransit}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-6">
                <div className="card bg-secondary text-white shadow">
                    <div className="card-body">
                        <h6>Pending</h6>
                        <h2>{data.pending}</h2>
                    </div>
                </div>
            </div>

        </div>

{/*  Here input is used for post(). here we give name ="trackingNo" and value={delivery.trackingNo} means then delivery.trackingNo = "" beacuse we initialise delivery at starting. onChange means it modifies the user input when it goes under {handleChange} */}
{/*  form-control     -     Styles the input with a border, padding, rounded corners, and a consistent width.
    custom-input      -     Lets you customize the input's height, background, border, and focus effects.           w -50   -    Means width is 50%*/}
        <div className='row'>
            <div className='col-md-6'>

                <label className="form-label fw-semibold"> Id </label>
                <input type="text" name="id" className="form-control custom-input w-50 " placeholder="enter id" value={delivery.id} onChange={handleChange}/> 

                <label className="form-label fw-semibold"> TrackNo </label>
                <input type="text" name="trackingNo" className="form-control custom-input w-50 " placeholder="enter number" value={delivery.trackingNo} onChange={handleChange}/> 

                <label  className="form-label fw-semibold"> pickupAddress </label> 
                <input type="text" name="pickupAddress"  className="form-control custom-input w-50 " placeholder="enter entryAddress" value={delivery.pickupAddress} onChange={handleChange}/>

                <label  className="form-label fw-semibold"> DeliveryAddress </label>
                <input type="text" name="deliveryAddress"  className="form-control custom-input w-50 " placeholder="enter LastAddress" value={delivery.deliveryAddress} onChange={handleChange}/>  

                <label  className="form-label fw-semibold"> currentStatus </label>    
                <input type="text" name="currentStatus"  className="form-control custom-input w-50 " placeholder="enter currectStatus" value={delivery.currentStatus} onChange={handleChange}/>

                <label  className="form-label fw-semibold"> orderedDate </label>
                <input type="date" name="orderedDate"  className="form-control custom-input w-50 " placeholder="enter orderedDate" value={delivery.orderedDate} onChange={handleChange}/> 

                <label  className="form-label fw-semibold"> expectedDate </label>
                <input type="date" name="expectedDate"  className="form-control custom-input w-50 " placeholder="enter expectedDate" value={delivery.expectedDate} onChange={handleChange}/>       
            </div>
        </div>
        <button  className="btn btn-primary mb-4"  onClick={getDetails}> GET DELIVERY   </button>
        <button className="btn btn-primary mb-4 ms-4" onClick={postDelivery}> Post Delivery </button>
        <button className="btn btn-primary mb-4 ms-4" onClick={deleteDelivery}> Delete </button>
        <button className="btn btn-primary mb-4 ms-4" onClick={updateDelivery}> Update </button>
        <div className="table-responsive rounded">

            {delivery  && <table className="table table-bordered table-hover align-middle text-center mb-0">
        <thead className="table-dark p-2">
            <tr>
                <th> id </th>
                <th> trackingNo </th>
                <th> pickupAddress </th>
                <th> deliveryAddress </th>
                <th> currentStatus</th>
                <th> orderedDate </th>
                <th> expectedDate </th>
            </tr>
        </thead>

        <tbody>
            
            <tr>
                <td>{delivery.id}</td>              {/* Firstly when we click on getDetails. Then it goes to getDetails function. Then it gets the data from backend by using fetch(). Then it converts the json data into delivery object in store by using res.json. then we setDelivery(store). Means the data from backend is stored in Delivery. Now we can return the data by using {delivery.id} delivery object and its fields. This is for get(). For get we only use  */}
                <td>{delivery.trackingNo}</td>
                <td>{delivery.pickupAddress}</td>
                <td>{delivery.deliveryAddress}</td>
                <td>{delivery.currentStatus}</td>
                <td>{delivery.orderedDate}</td>
                <td>{delivery.expectedDate}</td>
            </tr>
            
        </tbody>
            </table>
        }
        </div>
    </div>
    );
};

export default Delivery;

