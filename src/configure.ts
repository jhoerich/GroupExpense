import * as fs from 'fs';
import * as path from 'path';
import 'reflect-metadata';

export async function initAll() {
    await scanAndImportModules(__dirname);
}

async function scanAndImportModules(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await scanAndImportModules(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.js')) {
            await import(fullPath);
        }
    }
}