document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const action = event.submitter.value; // Determine which button was clicked

    // Mock user data (replace with API call in a real application)
    let users = JSON.parse(localStorage.getItem('users')) || [
        { username: 'admin', password: 'admin123', name: 'Admin' },
        { username: 'user', password: 'user123', name: 'User' }
    ];

    if (action === 'login') {
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
    } else if (action === 'register') {
        // Check if the username already exists
        const userExists = users.some(u => u.username === username);
        if (userExists) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'Username already exists.',
                confirmButtonText: 'Try Again'
            });
        } else {
            // Add new user to the list
            const newUser = { username, password, name: username }; // You can modify this to include more fields
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You can now log in with your credentials.',
                confirmButtonText: 'OK'
            });
        }
    }
});