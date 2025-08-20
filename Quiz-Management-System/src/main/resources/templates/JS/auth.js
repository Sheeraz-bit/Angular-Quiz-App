document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("http://localhost:8082/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            alert("Invalid email or password");
            return;
        }

        const user = await response.json();
        console.log("User object received:", user);

        // Save user
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // check user role and redirect accordingly
        if (user.role === "student") {
            // check if student already attempted exam
            if (user.attemptedExam == true) {
                // student already took exam, show results
                window.location.href = "result.html";
            } else {
                // student can take exam
                window.location.href = "student-dashboard.html";
            }
        } else if (user.role === "admin") {
            // admin goes to admin panel
            window.location.href = "admin-dashboard.html";
        } else {
            alert("Invalid user role!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
    }
});
