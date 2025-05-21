// const { showAlert } = require("./alert")

document.getElementById("output_table4");
fetch('http://localhost:4001/api/v1/tokens')
    .then((jsonData) => {
          // data in json format
        return jsonData.json(); // converted to object
    })
    .then((objectData) => {
        // console.log("the length of data is: ", objectData.data.length);
        // console.log(objectData.data);
        showAll(objectData.data);
    });

const showAll = (data, err) => {
    lengthh = data.length;

    doc = document.getElementById("output_table4");
 
    for (let i = 0; i < lengthh; i++) {
        feed = data[i];
        console.log(feed);
        const phoneno = feed.phoneno;
        const date = feed.date;
        const username = feed.username;
        const department = feed.departmentR;
        const checkUpdate = feed.checkUpdate;
        const id = feed._id;
        if (department === "ENT") {
            console.log("Huiii!!!");
            createTable(id, username, phoneno, department, date, checkUpdate);
            // saveTupdates(username, phoneno, department, date, checkUpdate);
        }
    }
};

// Initialize the checkbox state from localStorage when the page loads
window.addEventListener('load', function () {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        var row = checkbox.closest('tr');
        var rowId = row.getAttribute('data-row-id');
        var isChecked = localStorage.getItem('checkbox_' + rowId);
        if (isChecked) {
            checkbox.checked = true;
            row.style.background = 'green';
        }
    });
});

function createTable(id, username, phoneno, department, date, checkUpdate) {
    var outputTable = document.getElementById('output_table4');

    // Check if the table exists, if not create it
    // if (!outputTable.querySelector('table')) {
    //     var table = document.createElement('table');
    //     outputTable.appendChild(table);

    //     // Create a container div to center the table and add padding
    //     var tableContainer = document.createElement('div');
    //     tableContainer.style.textAlign = 'center'; // Center align the table
    //     tableContainer.style.paddingLeft = '30%'; // Add left padding
    //     tableContainer.appendChild(table);
    //     outputTable.appendChild(tableContainer);

    //     table.style.border = '1px solid white';
    //     table.style.color = 'white';

    //     // Create table headers
    //     var thead = document.createElement('thead');
    //     var headerRow = thead.insertRow();
    //     headerRow.style.background = 'white'; // Header background color
    //     headerRow.style.color = 'black'; // Header text color

    //     headerRow.insertCell().textContent = 'Sl. No';
    //     headerRow.insertCell().textContent = 'Username';
    //     headerRow.insertCell().textContent = 'Phone No';
    //     headerRow.insertCell().textContent = 'Department';
    //     headerRow.insertCell().textContent = 'Date';
    //     headerRow.insertCell().textContent = 'Do/Not';

    //     table.appendChild(thead);
    // Check if the table exists, if not create it
    if (!outputTable.querySelector('table')) {
        var table = document.createElement('table');
        outputTable.appendChild(table);

        // Create a container div to center the table and add padding
        var tableContainer = document.createElement('div');
        tableContainer.style.textAlign = 'center'; // Center align the table
        tableContainer.style.padding = '20px'; // Add padding
        tableContainer.style.borderRadius = '10px'; // Add border radius
        tableContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)'; // Add box shadow
        tableContainer.appendChild(table);
        outputTable.appendChild(tableContainer);

        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.color = 'white';
        table.style.border = '1px solid black'; // Add black border

        // Create table headers
        var thead = document.createElement('thead');
        var headerRow = thead.insertRow();
        headerRow.style.background = 'white'; // Header background color
        headerRow.style.color = 'black'; // Header text color
        headerRow.style.fontWeight = 'bold'; // Header font weight
        headerRow.style.padding = '10px'; // Header padding

        headerRow.insertCell().textContent = 'Token No';
        headerRow.insertCell().textContent = 'Username';
        headerRow.insertCell().textContent = 'Phone No';
        headerRow.insertCell().textContent = 'Department';
        headerRow.insertCell().textContent = 'Date';
        headerRow.insertCell().textContent = 'Status';

        table.appendChild(thead);
    }

    // Get the table body
    var tbody = outputTable.querySelector('table tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        outputTable.querySelector('table').appendChild(tbody);
    }

    // Apply CSS styles to table data rows
    var newRow = tbody.insertRow();
    newRow.style.background = 'white'; // Data row background color
    newRow.style.color = 'black'; // Data row text color

    // Apply CSS styles to table data cells (td) to change the border color to black
    newRow.insertCell().textContent = tbody.rows.length;
    newRow.insertCell().textContent = username;
    newRow.insertCell().textContent = phoneno;
    newRow.insertCell().textContent = department;
    newRow.insertCell().textContent = date;

    // Create a new cell for the checkbox
    var checkboxCell = newRow.insertCell();
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox_${tbody.rows.length} `;
    checkboxCell.appendChild(checkbox);

    // Set the checkbox state based on the checkUpdate value
    checkbox.checked = checkUpdate === 'Yes';
    checkbox.disabled = true;

    if (checkUpdate === 'Yes') {
    newRow.style.background = 'green';
}

}

