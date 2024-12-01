/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("nav-panel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("nav-panel").style.width = "0";
}


/* Add-Ons Functions */
function openExtrasMenu() {
    document.getElementById("add-ons-menu").style.display = "grid";
}

function closeExtrasMenu() {
    document.getElementById("add-ons-menu").style.display = "none";
}

function confirmExtras() {
    document.getElementById("add-ons-menu").style.display = "none";
    alert("Extras successfully added");
}

/* Quantity Selector */
document.addEventListener("DOMContentLoaded", () => {
    const cart = document.querySelector(".container");

    // Event listener for buttons
    cart.addEventListener("click", (event) => {
        const target = event.target;
        const item = target.closest(".product");

        if (!item) return; // Ensure click is inside an item

        const input = item.querySelector(".quantity-field");

        if (target.classList.contains("plus")) {
            // Increase quantity
            input.value = parseInt(input.value) + 1;
        } 
        else if (target.classList.contains("minus")) {
            // Decrease quantity (but not below the minimum)
            const newValue = parseInt(input.value) - 1;
            input.value = newValue < 1 ? 1 : newValue;
        }

        // Handle item removal
        else if (target.classList.contains("remove-button")) {
            item.remove();
        }
    });

    // Ensure input field validation
    cart.addEventListener("input", (event) => {
        const target = event.target;
        if (target.classList.contains("quantity-field")) {
            const value = parseInt(target.value);
            if (isNaN(value) || value < 1) {
                target.value = 1; // Reset to minimum value
            }
        }
    });
});

/* Contact Us Submit Button Message */


/* Checkout Interactions */


/* Sign In/Sign Up */
document.addEventListener("DOMContentLoaded", () => {
    fetch("/header.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("header-container").innerHTML = html;

            // Once the header is injected, initialize the auth system
            const script = document.createElement("script");
            script.src = "/main.js";
            script.onload = initializeAuth; // Call initializeAuth after the script loads
            document.body.appendChild(script);
        });

    function initializeAuth() {
        const signInBtn = document.getElementById("signIn-button");
        const signUpBtn = document.getElementById("signUp-button");
        const profileBtn = document.getElementById("user-profile");
        const logOutBtn = document.getElementById("logOut-button");

        // Form Elements (if available on the page)
        const signInForm = document.getElementById("signIn-form");
        const signUpForm = document.getElementById("signUp-form");

        const signInSubmit = document.getElementById("signIn-submit");
        const signUpSubmit = document.getElementById("signUp-submit");

        // Check if the user is logged in
        function checkLoginStatus() {
            const loggedInUser = localStorage.getItem("loggedInUser");
            if (loggedInUser) {
                // User is logged in
                signInBtn.style.display = "none";
                signUpBtn.style.display = "none";
                profileBtn.style.display = "block";
                logOutBtn.style.display = "block";
            } else {
                // User is not logged in
                signInBtn.style.display = "block";
                signUpBtn.style.display = "block";
                profileBtn.style.display = "none";
                logOutBtn.style.display = "none";
            }
        }

        // Redirect to Sign In page
        signInBtn.addEventListener("click", () => {
            window.location.href = "/signIn.html"; // Correct path to the Sign In page
        });

        // Redirect to Sign Up page
        signUpBtn.addEventListener("click", () => {
            window.location.href = "/signUp.html"; // Correct path to the Sign Up page
        });

        // Profile Button functionality
        profileBtn.addEventListener("click", () => {
            const loggedInUser = localStorage.getItem("loggedInUser");
            if (loggedInUser) {
                window.location.href = "/profile/profile.html"; // Correct path to the Profile page
            }
        });

        // Log Out functionality
        logOutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser"); // Clear the logged-in user
            alert("You have successfully logged out.");
            checkLoginStatus(); // Update button visibility
            window.location.href = "/home.html"; // Redirect to the home page (or a landing page)
        });

        // Sign In functionality
        if (signInSubmit) {
            signInSubmit.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent default form submission

                const username = document.getElementById("signIn-email").value.trim();
                const password = document.getElementById("signIn-password").value.trim();

                const users = JSON.parse(localStorage.getItem("users")) || {};
                if (users[username] && users[username] === password) {
                    localStorage.setItem("loggedInUser", username);
                    alert("Sign In Successful!");
                    window.location.href = "/profile/profile.html"; // Redirect after sign in
                } else {
                    alert("Invalid username or password.");
                }
            });
        }

        // Sign Up functionality
        if (signUpSubmit) {
            signUpSubmit.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent default form submission

                const username = document.getElementById("signUp-email").value.trim();
                const password = document.getElementById("signUp-password").value.trim();

                if (!username || !password) {
                    alert("Please enter both username and password.");
                    return;
                }

                const users = JSON.parse(localStorage.getItem("users")) || {};

                if (users[username]) {
                    alert("Email already registered.");
                } else {
                    users[username] = password;
                    localStorage.setItem("users", JSON.stringify(users));
                    alert("Sign Up Successful! You can now sign in.");
                    window.location.href = "/signIn.html"; // Redirect to sign in page
                }
            });
        }

        // Initialize login status
        checkLoginStatus();
    }
});
