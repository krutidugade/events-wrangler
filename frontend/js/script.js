function handleLogin(response) {
    // Google gives you a token (ID token)
    const token = response.credential;

    // Save it
    localStorage.setItem("token", token);

    // Go to dashboard
    window.location.href = "dashboard.html";
}
