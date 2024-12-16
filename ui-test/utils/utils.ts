export class Utils {
    static generateRandomUsername(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const usernameLength = 8;
        const randomChars = Array.from({ length: usernameLength }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        );
        const randomNumbers = Array.from({ length: 2 }, () =>
            numbers[Math.floor(Math.random() * numbers.length)]
        );
        return randomChars.join('') + randomNumbers.join('');
    }

    static generateRandomEmail(): string {
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        return `${this.generateRandomUsername()}@${randomDomain}`;
    }

    static generateRandomPassword(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        const allChars = chars + numbers + specialChars;
        const passwordLength = 12;

        const randomPassword = Array.from({ length: passwordLength }, () =>
            allChars[Math.floor(Math.random() * allChars.length)]
        );
        return randomPassword.join('');
    }
}
