import { Page, Locator, expect } from '@playwright/test';

export class PlayerPage {
    readonly page: Page;
    readonly playersTab: Locator;
    readonly addPlayerButton: Locator;
    readonly profileInput: Locator;
    readonly nameInput: Locator;
    readonly ciInput: Locator;
    readonly birthdateInput: Locator;
    readonly positionSelect: Locator;
    readonly teamSelect: Locator;
    readonly addButton: Locator;
    readonly playerRowSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.playersTab = page.getByRole('link', { name: ' Players' });
        this.addPlayerButton = page.getByRole('button', { name: 'Add Player' });
        this.profileInput = page.getByLabel('Profile');
        this.nameInput = page.getByLabel('Name');
        this.ciInput = page.getByLabel('Ci');
        this.birthdateInput = page.getByLabel('Birthdate');
        this.positionSelect = page.locator('select[name="positionId"]');
        this.teamSelect = page.locator('select[name="teamId"]');
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
        this.playerRowSelector = page.locator('table tbody tr'); // Selector para filas de jugadores
    }

    async goToPlayersTab() {
        await this.playersTab.click();
    }

    async createPlayer(
        name: string,
        ci: string,
        birthdate: string,
        position: string,
        team: string,
        profileImagePath: string
    ) {
        await this.addPlayerButton.click();
        await this.profileInput.setInputFiles(profileImagePath);
        await this.nameInput.fill(name);
        await this.ciInput.fill(ci);
        await this.birthdateInput.fill(birthdate);
        await this.positionSelect.selectOption(position);
        await this.teamSelect.selectOption(team);
        await this.addButton.click();
    }

    async validatePlayerCreation(name: string, ci: string) {
        // Esperar que la tabla de jugadores se actualice
        await this.page.waitForSelector('table tbody tr');

        // Buscar la fila que contiene el nombre y CI del jugador
        const playerExists = await this.playerRowSelector.locator(`td:has-text("${name}")`).first().isVisible();
        const ciExists = await this.playerRowSelector.locator(`td:has-text("${ci}")`).first().isVisible();

        // Validar que el jugador y su CI existen en la tabla
        expect(playerExists).toBeTruthy();
        expect(ciExists).toBeTruthy();

        console.log(`El jugador "${name}" con CI "${ci}" fue creado correctamente.`);
    }
}
