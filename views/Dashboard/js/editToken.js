        const hideAlert = () => {
            const el = document.querySelector('.alert')
            if (el) el.parentElement.removeChild(el)
        }

        const showAlert = (type, msg) => {
            hideAlert()
            const markup = `<div class="alert alert--${type}">${msg}</div>`
            document.querySelector('body').insertAdjacentHTML('afterbegin', markup)
            window.setTimeout(hideAlert, 5000)
        };

// Function to fetch dashboard_data
const fetchDashboardData = async () => {
    const response = await fetch('http://localhost:4001/api/v1/dashboard1');
    const objectData = await response.json();
    return objectData.data;
};

const dd = await fetchDashboardData();
console.log("the dashbord data is: ",dd);


// ...

// Event Listener for "sickness" select element
document.getElementById('sickness').addEventListener('change', (e) => {
    const selectedDepartment = e.target.value;
    const dashboarddata = dd;
    updateDashboardInfo(selectedDepartment, dashboarddata);
});

// ...
const dateInputs = document.querySelectorAll('.dashboard-date');
const tokensInputs = document.querySelectorAll('.dashboard-tokens');

const displayDashboardInfo = (date, noOfToken) => {
    // Update the input fields with the fetched data
    document.getElementById('dashboard-date').value = date;
    document.getElementById('dashboard-tokens').value = noOfToken;

    // Show the dashboard-info section
    document.querySelectorAll('.dashboard-info').forEach((info) => {
        info.style.display = 'block';
        });
}

// ====================================================================
// ...

const updateDashboardInfo = (selectedDepartment, dashboarddata) => {
    var date;
    var noOfToken;
    var matchingIds = [];  // Array to store matching IDs

    console.log("Selected department:", selectedDepartment);

    for (let i = 0; i < dashboarddata.length; i++) {
        if (selectedDepartment === dashboarddata[i].department) {
            date = dashboarddata[i].date;
            noOfToken = dashboarddata[i].noOfToken;
            const id = dashboarddata[i]._id;

            matchingIds.push(id);  // Store the matching ID

            console.log(id);
            console.log(date, noOfToken);

            // Call a function to display the data in the frontend
            displayDashboardInfo(date, noOfToken);
        }
    }

    if (matchingIds.length === 0) {
        // If no match is found, hide the dashboard-info section
        document.getElementById('dashboard-info').style.display = 'none';
    }

    // Log all matching IDs
    console.log("Matching IDs:", matchingIds);
};

// ...




// Event Listener for "Edit token" form submission
document.getElementById('token-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const selectedDepartment = document.getElementById('sickness').value;
    const date = document.getElementById('dashboard-date').value;
    const noOfToken = document.getElementById('dashboard-tokens').value;

    // Get the department ID from the dashboard data
    let d_id;
    for (let i=0; i<dd.length; i++){
        if(selectedDepartment === dd[i].department){
            d_id = dd[i]._id;
        }
    }
    console.log(d_id);
    updatetokenno(d_id,date,selectedDepartment, noOfToken)
});


const updatetokenno = async (departmentId, date, department, noOfToken) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://localhost:4001/api/v1/dashboard1/${departmentId}`,
            data: {
                date,
                department,
                noOfToken
            }
        });
        if (res.data.status === 'success') {
            console.log("Successful");
            showAlert("success", "Token updated successfully");
            
            // Refresh the page after a short delay (e.g., 1000 milliseconds or 1 second)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    } catch (err) {
        showAlert("error", "Product updated failed");
    }
};



// ...
