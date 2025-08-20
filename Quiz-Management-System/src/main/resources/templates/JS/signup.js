document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const response = await fetch("http://localhost:8082/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role })
    });

    const result = await response.json();

    if (response.ok) {
        document.getElementById("signupMessage").innerText = "Signup successful! You can now login.";
        document.getElementById("signupMessage").style.color = "green";
    } else {
        document.getElementById("signupMessage").innerText = result.message || "Signup failed!";
        document.getElementById("signupMessage").style.color = "red";
    }
});
