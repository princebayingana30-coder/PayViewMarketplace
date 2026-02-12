// Node.js environment requires node-fetch
const fetch = require('node-fetch');

// Test registration function
async function testRegister(userData) {
    try {
        const response = await fetch('https://payviewmarketplace.onrender.com/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log('Registration result:', data);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Test login function
async function testLogin(loginData) {
    try {
        const response = await fetch('https://payviewmarketplace.onrender.com/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });
        const data = await response.json();
        console.log('Login result:', data);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Test scenarios
(async () => {
    console.log('Testing registration with valid data...');
    await testRegister({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+250123456789',
        password: 'password123'
    });

    console.log('Testing registration with existing email...');
    await testRegister({
        name: 'Test User 2',
        email: 'test@example.com', // same email
        phone: '+250987654321',
        password: 'password123'
    });

    console.log('Testing login with correct credentials...');
    await testLogin({
        email: 'test@example.com',
        password: 'password123'
    });

    console.log('Testing login with wrong password...');
    await testLogin({
        email: 'test@example.com',
        password: 'wrongpassword'
    });
})();
