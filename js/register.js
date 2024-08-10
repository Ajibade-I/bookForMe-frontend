document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");

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
    const requiredFields = ["firstName", "lastName", "email", "password", "contact"];

    requiredFields.forEach((field) => {
      if (!data[field]) {
        document.getElementById(`error-${field}`).textContent = `${field} is required`;
        hasError = true;
      }
    });

    if (hasError) {
      return; // Don't submit the form if there are validation errors
    }

    // Submit the form data to the server
    fetch("https://bookforme.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "login.html";
        } else if (data.errors) {
          // Display validation errors from server
          for (const [key, value] of Object.entries(data.errors)) {
            const errorElement = document.getElementById(`error-${key}`);
            if (errorElement) {
              errorElement.textContent = value;
            }
          }
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });
});
