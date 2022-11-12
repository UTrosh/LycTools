const c = require('colors')
const term = require( 'terminal-kit' ).terminal ;
const shell = require('shelljs')
const config = require('../config')
const hlicense = require('./helper/licenseHelp')
const typeline = require('./binder/cmdline')


console.log(`
██╗  ██╗   ██╗ ██████╗    ████████╗ ██████╗  ██████╗ ██╗     ███████╗
██║  ╚██╗ ██╔╝██╔════╝    ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
██║   ╚████╔╝ ██║            ██║   ██║   ██║██║   ██║██║     ███████╗
██║    ╚██╔╝  ██║            ██║   ██║   ██║██║   ██║██║     ╚════██║
███████╗██║   ╚██████╗       ██║   ╚██████╔╝╚██████╔╝███████╗███████║
╚══════╝╚═╝    ╚═════╝       ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
                                                                     `.blue)
console.log('Démarrage en cours...'.blue)
console.log("Requête à l'api...".yellow)


typeline.start()
