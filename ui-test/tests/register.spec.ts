import { test } from '@playwright/test';
import { Utils } from '../utils/utils';
import { AuthPage } from '../page/auth.pages';
import * as fs from 'fs';
import * as path from 'path';

test('Registrar un usuario con datos aleatorios y loguearlo', async ({ page }) => {
    const authPage = new AuthPage(page);

    // Generar datos aleatorios
    const username = Utils.generateRandomUsername();
    const email = Utils.generateRandomEmail();
    const password = Utils.generateRandomPassword();

    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    // Guardar los datos en un archivo JSON
    const userDataPath = path.resolve('user-data.json');
    try {
        fs.writeFileSync(userDataPath, JSON.stringify({ username, password }, null, 2));
        console.log('Datos guardados en user-data.json.');
    } catch (error) {
        console.error('Error al guardar el archivo user-data.json:', error);
        throw error;
    }

    // Ir a la página de login
    await authPage.gotoLoginPage();

    // Registrar un nuevo usuario
    await authPage.register(username, email, password);
    console.log('Registro exitoso.');

    // Regresar a la página de login para iniciar sesión
    await authPage.gotoLoginPage();

    // Iniciar sesión con las credenciales registradas
    await authPage.login(username, password);

    console.log('Login exitoso.');
});
