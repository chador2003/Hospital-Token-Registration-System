// Function Definitions
export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

// Function Definitions (Moved to the top for hoisting)
const tokenAvilable = (data, sicknessvalue, datevalue) => {
    const lengthh = data.length;
    let actual_token = 0; // Default value if no matching department is found
    for (let i = 0; i < lengthh; i++) {
        var datas = data[i];
        if ((datas.department === sicknessvalue) && datas.date === datevalue) {
            actual_token = datas.noOfToken;
        }
    }
    return actual_token;
};


const showToken = (data, sicknessvalue,datevalue) => { 
    var count = 0;
    var length = data.length;
    console.log("This is of token: ", data[0]);
    console.log();
    for (let i = 0; i < length; i++) {
        var feed = data[i];
        var department = feed.departmentR;
        var date = feed.date;
        if ((department === sicknessvalue) && (date === datevalue)) {
            count += 1;
            console.log(count);
        }
    }
    return count;
};

const tokenregister = async(date, departmentR, username, cid, phoneno)=>{
    try{
        console.log("i am inside");
        const res = await axios({
            method:"POST",
            url:"http://localhost:4001/api/v1/tokens/Ctoken",
            data:{
                date,
                departmentR,
                username,
                cid,
                phoneno
            }
        });
        console.log(res.data);
        if(res.data.status === "success"){
            showAlert("success", `SUCCESS: token registered successfully!${departmentR}`)

            window.setTimeout(() => {
                location.assign("/home3")
            }, 1500)
        }
    } catch (err){
        console.log("i am outside");
        console.log(err);
        let message = typeof err.response !== 'undefined' ? err.response.data.message: err.message
        showAlert('error', 'ERROR: incorrect registration', message)
    }
}

// Function to fetch dashboard_data
const fetchDashboardData = async () => {
    const response = await fetch('http://localhost:4001/api/v1/dashboard1');
    const objectData = await response.json();
    return objectData.data;
};

const dd = await fetchDashboardData();
console.log("the dashbord data is: ",dd);

// Function to fetch tokendata
const fetchTokenData = async () => {
    const responsetoken = await fetch('http://localhost:4001/api/v1/tokens');
    const objecttokenData = await responsetoken.json();
    return objecttokenData.data;
};

const td = await fetchTokenData();
console.log("token data is: ",td);

// Event Listener
document.getElementById("token-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const datev = document.getElementById("date").value;
    const sickness = document.getElementById("sickness").value;

    var cookie = document.cookie.split("token=")[1];
    var User = JSON.parse(cookie.split(";")[0]);

    var username = User.name;
    var cid = User.cidNumber;
    var phoneno = User.contactNumber;

    const datevalue = datev.trim();
    const sicknessvalue = sickness.trim();
    const usernamevalue = username.trim();
    const cidvalue = cid.trim();

    console.log(typeof phoneno);

    // Fetch dashboard_data and tokendata outside the event listener
    const dashboard_data = await fetchDashboardData();
    const tokendata = await fetchTokenData();

    // Call tokenAvilable and showToken functions with sicknessvalue
    const avilabletoken = tokenAvilable(dashboard_data, sicknessvalue, datevalue);
    const noOfTokenUsed = showToken(tokendata, sicknessvalue,datevalue);

    // Check token availability and show appropriate message
    let message;
    if(avilabletoken === 0){
        message = "no token"
        showAlert('error', 'ERROR: No TOKEN avilable for this day, please try on another day ', message)
        console.log("NO token");
    }else if(noOfTokenUsed < avilabletoken){
        console.log("Registration going");
        tokenregister(datevalue, sicknessvalue, usernamevalue, cidvalue, phoneno);
    }else{
        message = "TOKEN FULL"
        showAlert('error', 'ERROR: TOKEN FULL', message)
        console.log("Token full");
    }
});
