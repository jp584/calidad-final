import { test } from '@playwright/test';
import { AuthPage } from '../page/auth.pages';
import { PlayerPage } from '../page/equipo.pages';
import * as fs from 'fs';
import * as path from 'path';

test('Loguearse y crear un jugador en un equipo', async ({ page }) => {
    const authPage = new AuthPage(page);
    const playerPage = new PlayerPage(page);

    const userDataPath = path.resolve('user-data.json');
    if (!fs.existsSync(userDataPath)) {
        throw new Error('El archivo user-data.json no existe. Asegúrate de ejecutar primero el test de registro.');
    }

    const teamDataPath = path.resolve('team-data.json');
    if (!fs.existsSync(teamDataPath)) {
        throw new Error('El archivo team-data.json no existe. Asegúrate de ejecutar primero el test de creación de equipo.');
    }

    const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
    const teamData = JSON.parse(fs.readFileSync(teamDataPath, 'utf-8'));

    const username = userData.username;
    const password = userData.password;
    const teamId = teamData.teamId;

    const profileImagePath = path.resolve('C:\\Users\\JOSE\\OneDrive\\Imágenes\\equipos\\descarga (1).jpg');
    if (!fs.existsSync(profileImagePath)) {
        throw new Error(`El archivo de imagen no existe: ${profileImagePath}`);
    }

    const playerName = 'Maria';
    const playerCi = '3414341';
    const playerBirthdate = '2024-12-14';
    const playerPosition = '1'; // ID de la posición

    await authPage.gotoLoginPage();
    await authPage.login(username, password);
    console.log('Login exitoso.');

    await playerPage.goToPlayersTab();
    await playerPage.createPlayer(
        playerName,
        playerCi,
        playerBirthdate,
        playerPosition,
        teamId,
        profileImagePath
    );
    console.log('Jugador creado exitosamente.');

    // Validar que el jugador fue creado
    await playerPage.validatePlayerCreation(playerName, playerCi);
});
