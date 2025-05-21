// import axios from 'axios';
const outputElement = document.getElementById("output");


// Filter the tokens with departmentR "Anesthesiology"
const filteredTokens = alltoken.filter(token => token.departmentR === "Anesthesiology");

// Create an HTML table to display the filtered tokens
const table = document.createElement("table");
table.innerHTML = `
    <thead>
        <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>Phone No</th>
            <th>Department</th>
        </tr>
    </thead>
    <tbody>
        ${filteredTokens.map((token, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${token.username}</td>
                <td>${token.phoneno}</td>
                <td>${token.departmentR}</td>
            </tr>
        `).join('')}
    </tbody>
`;

// Append the table to the outputTableElement
outputTableElement.appendChild(table);


// const log = async () => {
    // const gettoken = await axios({
    //     method: "GET",
    //     url: "http://localhost:4001/api/v1/tokens",
    // });

    // const alltoken = gettoken.data.data;

    // const departmentArray = alltoken.map((token) => token.departmentR);
//     console.log(departmentArray.length);
// }
