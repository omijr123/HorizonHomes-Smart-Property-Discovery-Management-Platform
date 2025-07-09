// Authentication Handler

document.addEventListener('DOMContentLoaded', function() {
    initPasswordToggles();
    initLoginForm();
    initRegisterForm();
    initSocialLogin();
    initPasswordStrength();
});
function initPasswordToggles() {
    const toggles = document.querySelectorAll('.password-toggle'); 
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}
async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const loadingIcon = loginBtn.querySelector('.loading-icon');
    showLoading(loginBtn, btnText, loadingIcon);
    try {
        await simulateDelay(1500);
        const email = formData.get('email');
        const password = formData.get('password');
        if (validateLogin(email, password)) {
            const userData = {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: email,
                userType: 'buyer',
                joinDate: new Date().toISOString()
            };
            window.authStatusManager.login(userData);
        } else {
            throw new Error('Invalid email or password. Please try again.');
        }
        
    } catch (error) {
        hideLoading(loginBtn, btnText, loadingIcon);
        window.authStatusManager.showError(error.message);
    }
}
async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const registerBtn = document.getElementById('registerBtn');
    const btnText = registerBtn.querySelector('.btn-text');
    const loadingIcon = registerBtn.querySelector('.loading-icon');
    if (!validateRegistrationForm(formData)) {
        return;
    }
    showLoading(registerBtn, btnText, loadingIcon);
    try {
        await simulateDelay(2000);
        const userData = {
            id: Date.now(),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            userType: formData.get('userType'),
            newsletter: formData.get('newsletter') === 'on',
            joinDate: new Date().toISOString()
        };
        window.authStatusManager.register(userData);
    } catch (error) {
        hideLoading(registerBtn, btnText, loadingIcon);
        window.authStatusManager.showError(error.message);
    }
}
function initSocialLogin() {
    const googleButtons = document.querySelectorAll('#googleLogin, #googleRegister');
    googleButtons.forEach(btn => {
        btn.addEventListener('click', handleGoogleLogin);
    });
    const facebookButtons = document.querySelectorAll('#facebookLogin, #facebookRegister');
    facebookButtons.forEach(btn => {
        btn.addEventListener('click', handleFacebookLogin);
    });
}
async function handleGoogleLogin() {
    try {
        await simulateDelay(1000);
        const userData = {
            id: Date.now(),
            firstName: 'Google',
            lastName: 'User',
            email: 'user@gmail.com',
            userType: 'buyer',
            provider: 'google',
            joinDate: new Date().toISOString()
        };
        window.authStatusManager.login(userData);
    } catch (error) {
        window.authStatusManager.showError('Google login failed. Please try again.');
    }
}
async function handleFacebookLogin() {
    try {
        await simulateDelay(1000);
        const userData = {
            id: Date.now(),
            firstName: 'Facebook',
            lastName: 'User',
            email: 'user@facebook.com',
            userType: 'buyer',
            provider: 'facebook',
            joinDate: new Date().toISOString()
        };
        window.authStatusManager.login(userData);
    } catch (error) {
        window.authStatusManager.showError('Facebook login failed. Please try again.');
    }
}
function initPasswordStrength() {
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.getElementById('password-strength');
    if (passwordInput && strengthMeter) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value, strengthMeter);
        });
    }
}
function updatePasswordStrength(password, strengthMeter) {
    const strengthFill = strengthMeter.querySelector('.strength-fill');
    const strengthText = strengthMeter.querySelector('.strength-text');
    const strength = calculatePasswordStrength(password);
    strengthFill.style.width = `${strength.percentage}%`;
    strengthFill.className = `strength-fill ${strength.level}`;
    strengthText.textContent = strength.text;
}
function calculatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;
    if (score < 50) {
        return { percentage: score, level: 'weak', text: 'Weak password' };
    } else if (score < 75) {
        return { percentage: score, level: 'medium', text: 'Medium strength' };
    } else {
        return { percentage: score, level: 'strong', text: 'Strong password' };
    }
}
function validateLogin(email, password) {
    return email && password && email.includes('@') && password.length >= 6;
}
function validateRegistrationForm(formData) {
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    if (password !== confirmPassword) {
        window.authStatusManager.showError('Passwords do not match.');
        return false;
    }
    if (!terms) {
        window.authStatusManager.showError('Please accept the terms and conditions.');
        return false;
    }
    if (password.length < 8) {
        window.authStatusManager.showError('Password must be at least 8 characters long.');
        return false;
    }
    return true;
}
function showLoading(btn, btnText, loadingIcon) {
    btn.disabled = true;
    btnText.style.display = 'none';
    loadingIcon.style.display = 'inline-block';
}
function hideLoading(btn, btnText, loadingIcon) {
    btn.disabled = false;
    btnText.style.display = 'inline';
    loadingIcon.style.display = 'none';
}
function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
