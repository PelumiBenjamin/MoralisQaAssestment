export const LoginSelectors = {
    emailLabel: '#login-form-center > div:nth-child(1) > label',
    emailInput: { role: 'textbox' as const, name: 'Email' },
    passwordInput: { role: 'textbox' as const, name: 'Password' },
    loginButton: { role: 'button' as const, name: 'Log In' },
    captchaText: 'text="Complete the captcha verification"',
    acceptAllButton: 'button[name="ACCEPT ALL"]',
    welcomeText: '#main_top > main > div > span',
    forgetPassword: 'data-testid="test-link-text"'
};