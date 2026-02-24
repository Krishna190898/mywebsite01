console.log("test");


let form = document.getElementById("myForm");

if (form) {

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let password = document.getElementById("password").value;
        let cpassword = document.getElementById("cpassword").value;

        document.querySelectorAll(".error").forEach(el => el.innerHTML = "");

        let userPattern = /^[A-Za-z0-9]+$/;
        if (!userPattern.test(username)) {
            document.getElementById("userErr").innerHTML = "Only alphabets and numbers allowed";
            valid = false;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById("emailErr").innerHTML = "Invalid email";
            valid = false;
        }

        let phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            document.getElementById("phoneErr").innerHTML = "Only 10 digits allowed";
            valid = false;
        }

        let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passPattern.test(password)) {
            document.getElementById("passErr").innerHTML = "Min 8 chars, upper, lower, num & special char";
            valid = false;
        }

        if (password !== cpassword) {
            document.getElementById("cpassErr").innerHTML = "Passwords do not match";
            valid = false;
        }

        if (valid) {

            // ✅ username save કરો
            sessionStorage.setItem("username", username);

            // ✅ login status save કરો
            sessionStorage.setItem("isLoggedIn", "true");

            alert("Form submitted successfully");

            window.location.href = "index.html";

        }

    });

}
