const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = rootPath

  return Promise.resolve({
    appDirectory: path.join(outPath, 'dist/Academic-Calculator-win32-x64/'),
    authors: 'Jeffrey Hui',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'Academic-Calculator.exe',
    setupExe: 'Academic-CalculatorInstaller.exe',
  })
}