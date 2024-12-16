import { test } from '@playwright/test';
import { AuthPage } from '../page/auth.pages';
import { TeamPage } from '../page/team.pages';
import * as fs from 'fs';
import * as path from 'path';

test('Loguearse y crear un equipo', async ({ page }) => {
    const authPage = new AuthPage(page);
    const teamPage = new TeamPage(page);

    // Verificar si el archivo user-data.json existe
    const userDataPath = path.resolve('user-data.json');
    console.log('Ruta del archivo user-data.json:', userDataPath);

    if (!fs.existsSync(userDataPath)) {
        console.error('El archivo user-data.json no existe.');
        throw new Error('El archivo user-data.json no existe. Asegúrate de ejecutar primero el test de registro.');
    } else {
        console.log('Archivo user-data.json encontrado.');
    }

    // Leer los datos del usuario registrado
    const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
    const username = userData.username;
    const password = userData.password;

    // Datos para crear un equipo
    const teamName = 'Equipo 2';
    const foundationDate = '2024-12-13';

    // Ruta absoluta de la imagen
    const profileImagePath = path.resolve('C:\\Users\\JOSE\\OneDrive\\Imágenes\\equipos\\descarga (1).jpg');
    console.log('Ruta de la imagen:', profileImagePath);

    if (!fs.existsSync(profileImagePath)) {
        console.error(`El archivo de imagen no existe: ${profileImagePath}`);
        throw new Error(`El archivo de imagen no existe: ${profileImagePath}`);
    } else {
        console.log('Archivo de imagen encontrado.');
    }

    // Paso 1: Ir a la página de login e iniciar sesión
    await authPage.gotoLoginPage();
    await authPage.login(username, password);
    console.log('Login exitoso.');

    // Paso 2: Navegar a la pestaña de equipos y crear un equipo
    await teamPage.goToTeamTab();
    const teamId = await teamPage.createTeam(teamName, foundationDate, profileImagePath);
    console.log(`Equipo creado exitosamente con ID: ${teamId}`);

    // Guardar el ID del equipo en un archivo JSON
    const teamDataPath = path.resolve('team-data.json');
    try {
        fs.writeFileSync(teamDataPath, JSON.stringify({ teamId }, null, 2));
        console.log('Datos del equipo guardados en team-data.json.');
    } catch (error) {
        console.error('Error al guardar el archivo team-data.json:', error);
        throw error;
    }
});
