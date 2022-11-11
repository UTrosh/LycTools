const c = require('colors')
const term = require( 'terminal-kit' ).terminal ;
const shell = require('shelljs')
const req = require('axios');
const { exec } = require('child_process');
let versionp;
const licensecode = "admins"
var ds = require('https');
var fs = require('fs');
const unzip = require('unzipper');



////// CONFIG


var autoComplete = [
	'help' ,
	'aide' ,
	'exit' ,
	'leave' ,
	'quitter' ,
	'game install' ,
	'app install' ,
] ;

const baseapi = "https://lyc.troshhost.fr"

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
req.get(`${baseapi}/licenses.php?key=${licensecode}`)
  .then(res => {
    if (res = 200) {
        console.log("[API] Version payant activé..".green)
        return paidversion()
    } else {
        console.log("[API] License invalide... version gratuit activé..".yellow)
        return freeversion()
    }
  })
  .catch(err => {
    if (err.message.includes("404")) {
        console.log("Erreur : cet outil n'est plus disponible. Passage en version gratuit.".bgRed)
        return freeversion()
    } else if (err.message.includes("ENOTFOUND")) {
        console.log("Erreur : Le serveur n'est pas disponible pour le moment, passage en version gratuit.".bgRed)
        return freeversion()
    }
    else {
        return console.log(err.message)
    }
  });

async function freeversion() {
    console.log('Initialisation de la version gratuite...'.green)
    versionp = "free"
    return terminalfinal();
}

async function paidversion() {
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
    return inputfield();
}
function inputfield() {
term.inputField(
    {autoComplete: autoComplete ,autoCompleteHint: true , autoCompleteMenu: true},
    function( error , input ) {
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
                    console.log("Téléchargement en cours... (il peut durer longtemps)".yellow)
                req.get(`${baseapi}/gamelist/${args[2]}.zip`).then((res) => {

                    shell.mkdir(`-p`, `./bin/game/${args[2]}`)

                    ds.get(`${baseapi}/gamelist/${args[2]}.zip`,(res) => {
                  
                        // Image will be stored at this path
                        const path = `./bin/game/${args[2]}/${args[2]}.zip`; 
                        const filePath = fs.createWriteStream(path);
                        res.pipe(filePath);
                        filePath.on('finish',() => {
                            filePath.close();
                            console.log('Téléchargement terminé, installation en cours...'.green);
                            fs.createReadStream(`./bin/game/${args[2]}/${args[2]}.zip`)
                            .pipe(unzip.Extract({ path: `./bin/game/${args[2]}/` }))
                            .promise()
                            .then(() => {
                                console.log('Installation terminé, nettoyage en cours...'.green);
                                shell.rm('-rf', `./bin/game/${args[2]}/${args[2]}.zip`)
                                console.log(`Le jeu ${args[2]} est désormais installé, pour le lancer, écriver "game launch ${args[2]}"`.bgGreen)
                            })
                        })
                    })
                }).catch(err => {
                    if (err.message.includes("404")) {
                        return console.log("\nCe jeu n'est pas encore disponible".red)
                    }
                })
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