const c = require('colors')
const f = require('../input/fieldInput')
let versionp;
const config = require('../../config')
const hlicense = require('../helper/licenseHelp')
const fs = require('fs');



////// CONFIG



let authorized = false;
function start() {



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
        return f.inputfield();
}


module.exports = {
    start,
    versionp
}
