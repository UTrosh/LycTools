const c = require('colors')
const term = require( 'terminal-kit' ).terminal ;
const shell = require('shelljs')
const req = require('axios');
const { exec } = require('child_process');
let versionp;
const config = require('../../config')
const hlicense = require('../helper/licenseHelp')
const Downloader = require("nodejs-file-downloader");
const fs = require('fs');
const unzip = require('unzipper');
const baseapi = "https://lyc.troshhost.fr"
var autoComplete = [
	'help' ,
	'aide' ,
	'exit' ,
	'leave' ,
	'quitter' ,
	'game install' ,
	'app install' ,
] ;
function inputfield() {
    term.inputField(
        {autoComplete: autoComplete ,autoCompleteHint: true , autoCompleteMenu: true},
        async function( error , input ) {
            if (input.includes("help" || "aide")) {
                console.log(`
                                Liste des commandes                     `.bgYellow)
                console.log(`Jeux`.bgBlue)
                console.log("game install".green + " <nom du jeu>" + " | Installe un jeu".green)
                console.log("game launch".green + " <nom du jeu>" + " | Lance un jeu".green)
                console.log("game uninstall".green + " <nom du jeu>" + " | désinstalle un jeu".green)
                console.log("game list".green + " | Liste tout les jeux disponibles".green)
                console.log("\n")
                console.log("Logiciel".bgBlue)
                console.log("app install".green + " <nom du jeu>" + " | Installe un logiciel".green)
                console.log("app launch".green + " <nom du jeu>" + " | Lance un logiciel".green)
                console.log("app uninstall".green + " <nom du jeu>" + " | désinstalle un logiciel".green)
                console.log("app list".green + " | Liste tout les logiciels disponibles".green)
                return inputfield()
            } else if (input.includes("exit" || "leave" || "quitter")) {
                process.exit()
            } else if (input.includes("game install" || "jeux install")) {
                const args = input.split(" ")
                if (!args[2]) {
                    console.log("\nUtilisations : ".green + " game install <nom du jeu>")
                    return inputfield()
                } else {
                    console.log("\nRecherche du jeu en cours".bgYellow)
                    if (fs.existsSync(`./bin/game/${args[2]}`)) {
                        console.log("Ce jeu est déja installé, si il est corrompu, il faut le déinstallé et le réinstallé".red)
                    } else {
                        
                            shell.mkdir(`./bin/game/${args[2]}`)
                            function onResponse(res) {
                                console.log("Téléchargement en cours... (il peut durer longtemps)".yellow)
                 }
                            const downloader = new Downloader({
                              url: `${baseapi}/gamelist/${args[2]}.zip`,
                              directory: `./bin/game/${args[2]}`, 
                              onResponse,
                            });
                          
                            try {
                              await downloader.download().then(() => {
                                console.log("Téléchargement terminé, installation en cours...".green)
                              fs.createReadStream(`./bin/game/${args[2]}/${args[2]}.zip`)
                              .pipe(unzip.Extract({ path: `./bin/game/${args[2]}/` }))
                              .promise()
                              .then(() => {
                                  console.log('Installation terminé, nettoyage en cours...'.green);
                                  shell.rm('-rf', `./bin/game/${args[2]}/${args[2]}.zip`)
                                  console.log(`Le jeu ${args[2]} est désormais installé, pour le lancer, écriver "game launch ${args[2]}"`.bgGreen)
                                })
                  })
                            } catch (error) {
                              console.log("Le jeu n'est pas encore disponible".red);
                              shell.rm('-rf', `./bin/game/${args[2]}`)
                              return inputfield()
                            }
                      
                               
                }
                         
      
     
                    return inputfield()
                }
    
            } else if (input.includes("game uninstall" || "jeux uninstall")) {
                const args = input.split(" ")
                if (!args[2]) {
                    console.log("\nUtilisations : ".green + " game uninstall <nom du jeu>")
                    return inputfield()
                } else {
                    console.log("\nRecherche du jeu en cours".bgYellow)
                    fs.access(`./bin/game/${args[2]}`, function(error) {
                        if (error) {
                            console.log("Ce jeu n'est pas installé".red)
                            return inputfield()
                        } else {
                            console.log('Désinstallation en cours...'.yellow)
                            shell.rm('-rf', `./bin/game/${args[2]}`)
                            console.log('Désintallation terminé !'.green)
                            return inputfield()
                        }
                      })
                    
                }
            
            } else if (input.includes("game launch" || "jeux launch")) {
                const args = input.split(" ")
                if (!args[2]) {
                    console.log("Utilisation : game launch".green + " <nom du jeu>")
                    return inputfield()
                } else {
                    fs.access(`./bin/game/${args[2]}`, function(error) {
                        if (error) {
                            console.log("Ce jeu n'est pas installé".red)
                            return inputfield()
                        } else {
                            fs.readFile(`./bin/game/${args[2]}/lyclaunch.bin`, 'utf8', function(err, data) {
                                if (err) return console.log("Ce jeu est corrompu, désintallé le et réinstallé le".bgRed)
                                console.log('\nLancement du jeu...'.green)
                                filedata = data
                                console.log('\nOption de lancement : ' + filedata)
                                exec(`"./bin/game/${args[2]}/${filedata}"`, (err, stdout, stderr) => {
                                    if (err) return console.log(`Jeu corrompu, veuillez le réinstaller. (${err})`.red);
                        });
                                return inputfield()
                            
                            });
                            
                        }
                      })
                }
            }
            
            else {
                console.log("\nCommande invalide".red)
                return inputfield()
            }
            
        }
    ) ;
    }

module.exports = {
    inputfield
}