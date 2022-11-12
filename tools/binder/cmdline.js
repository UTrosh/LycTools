const c = require('colors')
const free = require('../input/free')
const prem = require('../input/premium')
let versionp;
const config = require('../../config')
const hlicense = require('../helper/licenseHelp')
const fs = require('fs');



////// CONFIG



let authorized = false;
function start() {
    /// Check file first step

      if (!fs.existsSync('./tools/helper/licenseHelp.js')) {
        console.log("Des fichier sont manquants, sois vous avez pris un crack, sois vous l'avez mal installé.".bgRed)
        return process.exit()
      }
      if (!fs.existsSync('./tools/input/premium.js')) {
        console.log("Des fichier sont manquants, sois vous avez pris un crack, sois vous l'avez mal installé.".bgRed)
        return process.exit()
      }
      if (!fs.existsSync('./tools/input/free.js')) {
        console.log("Des fichier sont manquants, sois vous avez pris un crack, sois vous l'avez mal installé.".bgRed)
        return process.exit()
      }

    /// Check license second step
    hlicense.checkLicense(config.licensecode).then((s) => {
        if (s == 1) {
            authorized = true;
            return paidversion()
        } else {
            authorized = false;
            return freeversion()
        }
    })



}



async function freeversion() {
    console.log('Initialisation de la version gratuite...'.green)
    versionp = "free"
    return terminalfinal();
}

async function paidversion() {
    if (authorized == false) {
        console.log("Vous n'êtes pas autorisé ! éviter de gratter la version premium.".bgRed)
        return process.exit()
    }
    console.log('Initialisation de la version premium...'.bgGreen)
    versionp = "Premium"
    return terminalfinal();
}


async function terminalfinal() {
    console.log(`Bienvenue !
    Version : ${versionp}
    Version outil : 0.1b
    API : Succès
     `.blue)
    console.log(`Pour voir la liste des commandes, écrivez "help" ou bien "aide"
Et pour quitter, écrivez "exit" ou "leave"`.bgGreen)
    if (versionp == "Premium") {
        return prem.inputfield();
    } else {
        return free.inputfield()
    }
}


module.exports = {
    start,
    authorized
}