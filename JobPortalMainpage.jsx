
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./JobPortal.css";
import { useState, useEffect } from "react";

const API = "http://localhost:9998/portal";

function JobPortalMainpage() {
  const [applications, setApplications] = useState([]);
  const [editing, setEditing] = useState(false);
  

  const[profile, setProfile] = useState({
    id: 1,
    name: "Praveen Sharma",
    role: "Java Full Stack Developer",
    email: "sravan412@gmail.com"
  });
const [stats, setStats] = useState({
    totalApplied: 0,
    scheduled: 0,
    completed: 0
});

{/* It goes to dashboard/status end point in spring controller.   loadStats() function is used to retrieve dashboard statistics from your Spring Boot backend and display them in your React webpage. 
  fetch() is a JavaScript function used to send HTTP requests to the backend.
  const data = await response.json();     response.json() reads the response body and converts it into a JavaScript object. and we get like    const data = {
    totalApplied: 5,
    scheduled: 2,
    completed: 1
    }
     And  <h2>{stats.totalApplied}</h2>   it displays those updated values using setStatus(data)
;*/}
const loadStats = async () => {
    try {
        const response = await fetch(`${API}/dashboard/status`);
        if (!response.ok) throw new Error("Failed to load statistics");

        const data = await response.json();
        setStats(data);
    } catch (error) {
        console.error("Error loading statistics:", error);
    }
};

useEffect(() => {
    loadStats();
}, []);

{/*  handleApply      – function name.
async                 – allows us to use await inside the function.
job                   – receives the selected job object.
new Date()            – gets the current date and time.
.toISOString()        – converts it into an ISO date-time string.
.split("T")           – separates the date and time using T.
[0]                   – takes only the first part (date).
*/}

const handleApply = async (job) => {      {/* you are creating a new object called application. */}
    const application = {           
        jobTitle: job.title,
        company: job.company,
        applicationDate: new Date().toISOString().split("T")[0],
        type: job.type,
        status: "APPLIED"
    };                    {/* Initially sets the status to APPLIED */}

{/*   The try block contains the code that may produce an error. If something goes wrong while sending the request, JavaScript moves to the catch block.  
  fetch() is used to communicate with your Spring Boot backend.
   "Content-Type": "application/json"    -  This tells Spring Boot that you are sending JSON data.
   JSON.stringify() converts that javascript object into a JSON string so it can be sent in the HTTP request body. and "@Requestbody" converts the JSON string into java object
   So in this way we send the application object data into string data like this to spring boot
   If !response.ok then it shows errror message. Otherwise it shows "applicated saved successfully" and goes to loadstatus()
  */}


    try {
        const response = await fetch(`${API}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error("Could not save application");
        }

        alert("Application saved successfully!");
        await loadStats();
    } catch (error) {
        console.error(error);
        alert("Unable to apply. Check your Spring Boot server.");
    }
};

const loadProfile = async () => {
    try {
        const response = await fetch(`${API}/profile/1`);

        if (!response.ok) {
            throw new Error("Failed to load profile");
        }

        const data = await response.json();
        setProfile(data);

    } catch (error) {
        console.error(error);
    }
};

const loadApplications = async () => {
    try {
        const response = await fetch(`${API}/getAll`);

        if (!response.ok) {
            throw new Error("Failed to load applications");
        }

        const data = await response.json();
        setApplications(data);

    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    loadStats();
    loadApplications();
    loadProfile();
}, []);

const handleStatusChange = async (app, newStatus) => {

    const updatedApplication = {
        jobTitle: app.jobTitle,
        company: app.company,
        applicationDate: app.applicationDate,
        type: app.type,
        status: newStatus
    };

    try {
        const response = await fetch(`${API}/update/${app.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedApplication)
        });

        if (!response.ok) {
            throw new Error("Unable to update status");
        }

        alert("Status updated successfully!");

        await loadApplications();
        await loadStats();

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const setChanges = async () => {
    try {
        const response = await fetch(
            `${API}/profile/update/${profile.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            }
        );

        if (!response.ok) {
            throw new Error("Profile update failed");
        }

         const data = await response.json();
        setProfile(data);
        setEditing(false);
        alert("Profile updated successfully!");     
    } catch (error) {
        console.error(error);
        alert("Unable to update profile");
    }
};
const jobs = [
  {
    title: "Frontend Developer",
    company: "Agnee Technologies",
    icon: "bi bi-code-slash",
    type: "react",
  },
  {
    title: "Web Developer",
    company: "Webcraft Solutions",
    icon: "bi bi-globe",
    type: "web",
  },
  {
    title: "Software Developer",
    company: "Pinnacle Systems",
    icon: "bi bi-person-workspace",
    type: "software",
  },
];

{/* navbar	                    - Creates the navbar
navbar-expand-lg	            - Expands the navbar on large screens and above
bg-dark	                        - a dark background
navbar-dark	                    - Makes navbar text suitable for a dark background
container	                    - Aligns content and adds horizontal spacing
navbar-brand                    - Styles the website name or logo
navbar-nav	                    - Groups navigation links
nav-link	                    - Styles individual links
active	                        - Indicates the currently selected link
ms-auto                         - Pushes the navigation links to the right
dropdown                        - Creates the dropdown element
dropdown-toggle                 - Creates the arrow and apply styling for it
data-bs-toggle="dropdown"       - Tells Bootstrap JavaScript that clicking this link should open or close the dropdown menu 
aria-expanded="false"           - Indicates that the menu is initially closed. Bootstrap updates this accessibility attribute as the menu opens and closes 
dropdown-menu                   - Create the menu container 
dropdown-item                   - Item for that toggle     
bi bi-house-door                - It adds the predefined icon from bootstrap    
rounded                         - Border-radius
fs-2                            - Font-size     */}

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#home">
            Smartphone
          </a>

          <div className="navbar-nav ms-auto flex-row align-items-center gap-3">
            <a className="nav-link active" href="#home">
              <i className="bi bi-house-door me-1"></i>Home
            </a>

            <div className="dropdown">
              <button
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"
              >
                Mobiles
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><a className="dropdown-item" href="#samsung">Samsung</a></li>
                <li><a className="dropdown-item" href="#vivo">Vivo</a></li>
              </ul>
            </div>

            <a className="nav-link" href="#offers">Offers</a>
            <a className="nav-link" href="#about">About</a>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <aside className="col-lg-3 col-md-4 sidebar bg-dark text-white p-3">
            <a className="fs-3 text-white text-decoration-none" href="#home">
              Hello
            </a>

            <ul className="list-unstyled sidebar-menu mt-4">
              <li><a href="#dashboard"><i className="bi bi-speedometer2" /> Dashboard</a></li>
              <li><a href="#applications"><i className="bi bi-file-earmark-text" /> My application</a></li>
              <li><a href="#messages"><i className="bi bi-chat-dots" /> Messages</a></li>
              <li><a href="#job-search"><i className="bi bi-search" /> Job Search</a></li>
            </ul>

            <p className="text-secondary fw-bold mt-4">SETTINGS</p>
            <ul className="list-unstyled sidebar-menu">
              <li><a href="#settings"><i className="bi bi-gear" /> Settings</a></li>
              <li><a href="#support"><i className="bi bi-question-circle" /> Help support</a></li>
            </ul>

            <div className="coach-card bg-light text-dark rounded p-3 mt-5">
              <span className="badge bg-primary">HIRELLY PRO</span>
              <button className="btn-close float-end" aria-label="Close" />
              <h5 className="mt-3">
                Get <span className="text-primary">Personal Career Coach</span>{" "}
                On-the-go
              </h5>
              <p className="small">
                Get reach and hired easily with tips from our professional coach.
              </p>
              <a className="btn btn-outline-primary btn-sm" href="#upgrade">
                Upgrade to PRO <i className="bi bi-lightning-charge-fill" />
              </a>
            </div>
          </aside>

          {/* Main dashboard */}
          <main className="col-lg-9 col-md-8 p-4">
            <div className="d-flex align-items-center justify-content-end gap-3 flex-wrap">
              <div className="position-relative search-box">
                <input type="search" className="form-control ps-5 pe-5" placeholder="Search anything here"/>
                <i className="bi bi-search search-icon" />
                <i className="bi bi-bell bell-icon" />
              </div>

              <img src="/Profile.png" alt="Profile" width="50" height="50" className="profile-image rounded-circle border border-primary"/>
              <span>Praveen Sharma</span>
            </div>

            <div id="dashboard" className="d-flex justify-content-between align-items-center mt-4 mb-3">
              <h4>Dashboard</h4>
              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button">
                  <i className="bi bi-calendar me-2" />
                  This month
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><button className="dropdown-item">This week</button></li>
                  <li><button className="dropdown-item">This month</button></li>
                  <li><button className="dropdown-item">Next month</button></li>
                </ul>
              </div>
            </div>

            {/* Statistics */}
            <div className="row g-3">
              <div className="col-xl-4 col-sm-6">
                <div className="stat-card">
                  <i className="bi bi-envelope stat-icon bg-primary" />
                  <h6>Total Job Applied</h6>
                  <h2>{stats.totalApplied}</h2>
                </div>
              </div>

              <div className="col-xl-4 col-sm-6">
                <div className="stat-card">
                  <i className="bi bi-calendar stat-icon bg-success" />
                  <h6>Interviews scheduled</h6>
                  <h2>{stats.scheduled}</h2>
                </div>
              </div>

              <div className="col-xl-4 col-sm-6">
                <div className="stat-card">
                  <i className="bi bi-calendar-check stat-icon bg-warning" />
                  <h6>Interviews completed</h6>
                  <h2>{stats.completed}</h2>
                </div>
              </div>
            </div>

            {/* Profile */}
            <section className="content-card mt-4">
              <h5>Your profile</h5>
              <div className="profile-card d-flex flex-wrap align-items-center gap-3 mt-3">
                <img
                  src="/Profile.png"
                  alt="Praveen Sharma"
                  className="profile-image rounded-circle border border-primary"
                />

                <div className="flex-grow-1">
                  <h5>{profile.name}</h5>
                  <p>{profile.role}</p>
                  <p>   <i className="bi bi-envelope"></i>   {profile.email} </p>
                </div>

                <button className="btn btn-outline-primary btn-sm" onClick={() => setEditing(true)}>
                  <i className="bi bi-pencil me-2" />
                     Edit Profile
                </button>

                
              </div>

              {editing && (
                  <div className="card p-3 mt-3">
                    <label>Name</label>
                    <input type="text" className="form-control mb-3" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})}/>

                    <label> Job role </label>
                    <input type="text" className="form-control mb-3" value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})}/>

                    <label> Email</label>
                    <input type="text" className="form-control mb-3" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})}/>

                    <button className="btn btn-primary" onClick={setChanges}> Save changes </button>
                    <button className="btn btn-secondary mt-2" onClick={() => setEditing(false)}> Cancel </button>
                  </div>
                )}
              <a href="#schedule" className="d-inline-block mt-3 text-decoration-none">
                View Schedule <i className="bi bi-chevron-right ms-2" />
              </a>
            </section>

            {/* Recommended jobs */}
            <section className="content-card mt-4" id="job-search">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>
                  <i className="bi bi-star me-2 text-primary" />
                  Recommended jobs
                </h5>
                <a href="#all-jobs" className="text-decoration-none">View all</a>
              </div>

{/* key={job.title}       -	Gives each rendered card a unique identifier so React can track list items.
<i className={`${job.icon} job-icon ${job.type}`} aria-hidden="true"/>  -   This displays the icon specified in your jobs array. ` ` it combines multiple classes
aria-hidden="true"        — tells screen readers to ignore the icon because it is decorative.
    */}
              <div className="row g-3">
                {jobs.map((job) => (
                  <div className="col-xl-4 col-md-6" key={job.title}>
                    <div className="job-card h-100">
                      <div className="d-flex align-items-center gap-3">
                        <i className={`${job.icon} job-icon ${job.type}`} aria-hidden="true"/>
                        <div>
                          <h6>{job.title}</h6>
                          <p className="text-secondary small mb-0"> {job.company} </p>
                        </div>
                      </div>

                      <button className="btn btn-primary btn-sm w-100 mt-4" onClick={() => handleApply(job)}> Apply Now </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* My Applications */}
<section className="content-card mt-4">

    <h5>My Applications</h5>

    <div className="row g-3">

        {applications.map((app) => (

            <div className="col-xl-4 col-md-6" key={app.id}>

                <div className="job-card h-100">

                    <h6>{app.jobTitle}</h6>

                    <p className="text-secondary">
                        {app.company}
                    </p>

                    <p>
                        Application Date: {app.applicationDate}
                    </p>

                    <label className="form-label">
                        Application Status
                    </label>

                    <select
                        className="form-select"
                        value={app.status}
                        onChange={(e) =>
                            handleStatusChange(app, e.target.value)
                        }
                    >
                        <option value="APPLIED">Applied</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="COMPLETED">Completed</option>
                    </select>

                </div>

            </div>

        ))}

    </div>

</section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default JobPortalMainpage

{/*  React: User clicks Apply Now.
     React: Creates application object.
     React: Sends POST request.
     Controller: Receives JSON using @RequestBody.
     Service: Calls repository.save().
     MySQL: Stores the application.   */}

{/*  Normally we use (!response.ok) because when we use the fetch it recieves response from springboot. for success it shows - 200 to 299 for error it shows 400, 404
     Fetch does not automatically throw an error for HTTP 404. Therefore, the catch block will not execute automatically.
     We use !response.ok to check whether the response is successful. If it is unsuccessful, throw new Error() manually creates an error. Now the catch block executes.*/}

{/* const data = await response.json(); here response.json() converts the json data from backend to javascript object
    Like {
    "totalApplied": 10,
    "scheduled": 4,
    "completed": 2
}  It is JSON data
     */}