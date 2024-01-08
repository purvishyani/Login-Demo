
// SIGN-UP PAGE


// FIRST LAST NAME VALIDATION
function capitalLetter(inputValue, id) {
    var modifiedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    document.getElementById(id).value = modifiedValue;
}

// PASSWORD VALIDATION

let toggler = document.getElementById("toggler");
const password = document.getElementById("toggle-password")

toggler.addEventListener("click", () => {

    const type = password.getAttribute("type") === 'password' ? 'text' : 'password';
    password.setAttribute("type", type);

})

// INPUT VALIDATIONS

function validation() {

    validName = /^[a-zA-Z]{4,10}$/;
    var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var first_name = document.getElementById("fName").value;
    var last_name = document.getElementById("lName").value;
    var email = document.getElementById("email").value;

    if (first_name.match(validName) && last_name.match(validName) && email.match(validEmail)) {

        var details = [];
        details = JSON.parse(localStorage.getItem("loginDetails"));

        if (!details) {

            var details = [{
                firstName: first_name,
                lastName: last_name,
                emailAddress: email,
                password: document.getElementById("toggle-password").value,
            }]

            localStorage.setItem("loginDetails", JSON.stringify(details))
            window.location.href = "sign-in.html"
        }
        else {
            var storedItems = JSON.parse(window.localStorage.getItem("loginDetails"));
            var p = 2;
            storedItems.forEach(function (obj) {
                var varifyEmail = obj.emailAddress;
                if (email === varifyEmail) {
                    p = 1;
                }
                else{
                    p=0
                }
            })
            if (p==1){
                alert("This email is already exist")
            }
            else if (p==0)
            {
                console.log(details)
                details.push({
                    firstName: first_name,
                    lastName: last_name,
                    emailAddress: email,
                    password: document.getElementById("toggle-password").value,
                })
                localStorage.setItem("loginDetails", JSON.stringify(details))
                window.location.href = "sign-in.html"
            }
        }
    }
    else 
    {
        if (!first_name.match(validName)) {
            document.getElementById("fname-error").style.display = "block"
            document.getElementById("fName").style.border = "1px solid red"
        }
        if (!last_name.match(validName)) {
            document.getElementById("lname-error").style.display = "block";
            document.getElementById("lName").style.border = "1px solid red"
        }
        if (!email.match(validEmail)) {
            document.getElementById("email-error").style.display = "block";
            document.getElementById("email").style.border = "1px solid red"
        }
    }
}

// SIGN-IN PAGE
function varifyAccount() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("toggle-password").value;
    var storedItems = JSON.parse(window.localStorage.getItem("loginDetails"));

    var p = 0;
    storedItems.forEach(function (obj) {
        var varifyEmail = obj.emailAddress;
        var varifyPwd = obj.password;
        if (email === varifyEmail && password === varifyPwd) {
            window.localStorage.setItem("fullName", obj.firstName + " " + obj.lastName)
            window.location.href = 'index.html';
            p = 1;
        }
    })
    if (p != 1) {
        alert("Please enter valid login details");
    }
}
// FORGOT PASSWORD PAGE

function varifyEmail() {
    var email = document.getElementById("email").value;

    var storedItems = JSON.parse(localStorage.getItem("loginDetails"));
    console.log(storedItems)
    var p = 2;
    storedItems.forEach(function (obj) {
        var varifyEmail = obj.emailAddress;
        if (email == varifyEmail) {
            p = 1;
            window.localStorage.setItem('getEmail', varifyEmail)
        }
    })
    if (p == 1) {
        window.location.href = "reset-pwd.html"
    }
    else {
        alert("Your email does not exist.")
    }
}

// RESET PASSWORD

function resetPwd() {
    var password = document.getElementById("toggle-password").value;
    var confirm_password = document.getElementById("confirm-pwd").value;
    var getEmail = window.localStorage.getItem("getEmail");
    var storedItems = JSON.parse(localStorage.getItem("loginDetails"));

    if (password && confirm_password && password === confirm_password) {

        for (var i = 0; i < storedItems.length; i++) {
            var items = storedItems[i];
            if (items.emailAddress == getEmail) {
                items['password'] = confirm_password
                storedItems.splice(i, 1, items);
                localStorage.setItem("loginDetails", JSON.stringify(storedItems));
            }
        }
        window.location.href ="sign-In.html"
    }
    else {
        alert("Please enter correct password")
    }
}

// INDEX PAGE
function home() {
    var fullname = localStorage.getItem('fullName');

    if (fullname === null) {
        window.location.href = "sign-In.html"
    }
    else {
        document.getElementById("welcome-message").innerHTML = `Hey, ${fullname}`
    }
}

// USER LOGOUT

function userLogout() {
    localStorage.removeItem("fullName");
    window.location.href = "sign-In.html"
}
