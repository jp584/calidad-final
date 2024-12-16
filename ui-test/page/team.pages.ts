import { Page, Locator } from '@playwright/test';

export class TeamPage {
    readonly page: Page;
    readonly teamTab: Locator;
    readonly addTeamButton: Locator;
    readonly profileInput: Locator;
    readonly nameInput: Locator;
    readonly foundationInput: Locator;
    readonly addButton: Locator;
    readonly teamRowSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.teamTab = page.getByRole('link', { name: ' Team' });
        this.addTeamButton = page.getByRole('button', { name: 'Add Team' });
        this.profileInput = page.getByLabel('Profile');
        this.nameInput = page.getByLabel('Name');
        this.foundationInput = page.getByLabel('Foundation');
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
        this.teamRowSelector = page.locator('table tbody tr'); // Selector para filas de equipos
    }

    async goToTeamTab() {
        await this.teamTab.click();
    }

    async createTeam(teamName: string, foundationDate: string, profileImagePath: string): Promise<string> {
        await this.addTeamButton.click();
        await this.profileInput.setInputFiles(profileImagePath);
        await this.nameInput.fill(teamName);
        await this.foundationInput.fill(foundationDate);
        await this.addButton.click();

        // Esperar que el equipo aparezca en la tabla
        await this.page.waitForSelector('table tbody tr');

        // Obtener el ID del equipo recién creado desde la primera celda
        const teamId = await this.teamRowSelector.last().locator('td:first-child').innerText();
        if (!teamId) {
            throw new Error('No se pudo obtener el ID del equipo recién creado.');
        }
        return teamId.trim(); // Devuelve el ID limpio
    }
}
