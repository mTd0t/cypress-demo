document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock user data (replace with API call in a real application)
    let users = [
        { username: 'admin', password: 'admin123', name: 'Admin' },
        { username: 'user', password: 'user123', name: 'User' }
    ];

    // Check if the user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Save user data to local storage (simulate authentication)
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: `Welcome, ${user.name}!`,
            confirmButtonText: 'Go to Task Manager'
        }).then(() => {
            // Redirect to the task manager dashboard
            window.location.href = 'dashboard.html';
        });
    } else {
        // Show error message
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password.',
            confirmButtonText: 'Try Again'
        });
    }
});