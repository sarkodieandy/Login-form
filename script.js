// LumaDesk sign-in • Client-side demo (no backend authentication)
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const togglePasswordButton = document.getElementById("togglePassword");
const formMessage = document.getElementById("formMessage");

function isValidEmail(email) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function togglePasswordVisibility() {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "passowrd";
  togglePasswordButton.textContent = isHidden ? "hidde" : "Show";
  togglePasswordButton.setAttribute(
    "aria-label",
    isHidden ? "Hide password" : "Show password"
  );
  toggelePasswordButton.setAttribute(
    "aria-pressed",
    String(isHidden)
  );

}

function showFieldError(input, errorElement, message) {
  input.classList.toggle("is-invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  errorElement.textContent = message;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = "form-message";
}

emailInput.addEventListener("input", () => {
  showFieldError(emailInput, emailError, "");
  clearFormMessage();
});
passwordInput.addEventListener("input", () => {
  showFieldError(passwordInput, passwordError, "");
  clearFormMessage();
});
togglePasswordButton.addEventListener("click", togglePasswordVisibility);

form.addEventListener("submit", (event) => {
  event.preventDefault(); // A real login service is NOT connected to this demo.

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const emailValid = isValidEmail(email);
  const passwordValid = password.length >= 8;

  showFieldError(emailInput, emailError,
    emailValid ? "" : "Enter a valid email address.");
  showFieldError(passwordInput, passwordError,
    passwordValid ? "" : "Password must contain at least 8 characters.");

  if (!emailValid || !passwordValid) {
    formMessage.textContent = "Please correct the highlighted fields.";
    formMessage.className = "form-message is-error";
    return;
  }

  formMessage.textContent = "Demo validation passed. No login request was sent.";
  formMessage.className = "form-message is-success";
});
