document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.trim();
    });

    // Basic client-side validation
    let hasError = false;
    if (!data.email) {
      document.getElementById("error-email").textContent = "Email is required";
      hasError = true;
    }
    if (!data.password) {
      document.getElementById("error-password").textContent =
        "Password is required";
      hasError = true;
    }

    if (hasError) {
      return; // Don't submit the form if there are validation errors
    }

    // Submit the form data to the server
    fetch("https://bookforme.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Add this to see what the API returns
        if (data.success) {
          // Store user data in sessionStorage
          sessionStorage.setItem("userData", JSON.stringify(data.user));

          // Redirect to index.html
        //   window.location.href = "index.html";
        } else {
          if (data.errors) {
            // Display validation errors from server
            for (const [key, value] of Object.entries(data.errors)) {
              const errorElement = document.getElementById(`error-${key}`);
              if (errorElement) {
                errorElement.textContent = value;
              }
            }
          } else {
            alert("Login failed. Please check your credentials and try again.");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });
});
