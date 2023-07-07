const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  // Création de la fenêtre de navigateur.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contentSecurityPolicy: "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com; script-src 'self' 'unsafe-inline'"
    }
  });

  // et chargement du login.html de l'application.
  mainWindow.loadFile('footballmatchday.html');

  // Ouvrir les outils de développement.
  // mainWindow.webContents.openDevTools()
  mainWindow.webContents.openDevTools({ mode: 'detach' });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // Sur macOS il est commun de re-créer une fenêtre lors 
    // du click sur l'icone du dock et qu'il n'y a pas d'autre fenêtre ouverte.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
