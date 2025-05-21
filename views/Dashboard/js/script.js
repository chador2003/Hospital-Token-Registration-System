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


        const customizetoken = async (date, department, noOfToken) => {
            try{
                const res = await axios({
                    method:"POST",
                    url:"http://localhost:4001/api/v1/dashboard1/ctoken",
                    data: {
                        date,
                        department,
                        noOfToken,
                    }
                });
                if(res.data.status === 'success'){
                    showAlert('success',`SUCCESS: token customized successfully in ${department}`)
                    // window.setTimeout(() => {
                    //     location.assign("/dashboard1")
                    // }, 1500)
                }
            }catch (error){
                console.log(error);
                let message = typeof error.response !== 'undefined' ? error.response.data.message: err.message
                showAlert('error', 'Error: cannot processed please try again', message)
            }
        }

        document.querySelector('.form').addEventListener('submit', (e) => {
            e.preventDefault()
            const date = document.getElementById('date').value;
            const department = document.getElementById('sickness').value
            const noOfToken = document.getElementById('noOF_Token').value
            console.log(date,department,noOfToken)
            customizetoken(date, department, noOfToken)
        })

        // ==============  simply assigning the number of  users ====================
        const noOfUserElement = document.getElementById("noOF_User");

        fetch('http://localhost:4001/api/v1/users')
            .then((jsonData) => {
                // data in json format
                return jsonData.json(); // converted to object
            })
            .then((objectData) => {
                // Assuming objectData.data is an array of users
                const userCount = objectData.data.length;

                // Update the content of the element
                noOfUserElement.textContent = userCount;
                console.log(userCount);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

            noOfUserElement.style.color = "white"