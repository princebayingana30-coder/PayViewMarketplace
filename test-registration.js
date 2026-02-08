// Test registration functionality
console.log('Testing registration functionality...');

// Simulate localStorage
if (typeof localStorage === 'undefined') {
    global.localStorage = {
        data: {},
        getItem: function(key) { return this.data[key] || null; },
        setItem: function(key, value) { this.data[key] = value; },
        removeItem: function(key) { delete this.data[key]; }
    };
}

// Initialize storage
function initializeStorage() {
    if (!localStorage.getItem('listings')) {
        localStorage.setItem('listings', JSON.stringify([]));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify([]));
    }
}

// Register function
function register(userData) {
    const users = JSON.parse(localStorage.getItem('users'));

    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email already registered' };
    }

    if (userData.password !== userData.confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
    }

    const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return { success: true, user: newUser };
}

// Test registration
initializeStorage();

console.log('Testing registration with valid data...');
const result1 = register({
    name: 'Test User',
    email: 'test@example.com',
    phone: '+250123456789',
    password: 'password123',
    confirmPassword: 'password123'
});

console.log('Registration result:', result1);

console.log('Testing registration with existing email...');
const result2 = register({
    name: 'Test User 2',
    email: 'test@example.com',
    phone: '+250987654321',
    password: 'password123',
    confirmPassword: 'password123'
});

console.log('Registration result:', result2);

console.log('Testing registration with mismatched passwords...');
const result3 = register({
    name: 'Test User 3',
    email: 'test3@example.com',
    phone: '+250555555555',
    password: 'password123',
    confirmPassword: 'differentpassword'
});

console.log('Registration result:', result3);

console.log('All tests completed!');