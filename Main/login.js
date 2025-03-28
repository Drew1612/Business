document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Hash the entered password
            const hashedPassword = await hashPassword(password);

            // Correct stored username and hashed password (this must match)
            const storedUsername = "admin";
            const storedHashedPassword = "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"; // Correct hash

            if (username === storedUsername && hashedPassword === storedHashedPassword) {
                loginMessage.textContent = "Login successful!";
                loginMessage.style.color = "green";

                // Generate and store secure session token
                const sessionToken = generateSessionToken();
                localStorage.setItem("authToken", sessionToken);

                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 1000);
            } else {
                loginMessage.textContent = "Invalid username or password.";
                loginMessage.style.color = "red";
            }
        });
    }

    // Redirect to login if not authenticated
   // if (!localStorage.getItem("authToken") && window.location.pathname !== "/Main/login.html") {
 //       window.location.href = "../Main/login.html";
//    }
});

// Hash password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Generate secure session token
function generateSessionToken() {
    return [...crypto.getRandomValues(new Uint8Array(32))]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Logout function
function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "../Main/login.html";
}
