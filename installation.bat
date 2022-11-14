@echo off
rem ////////////////////////////////////
rem // Outil proposé par UTrosh
rem ////////////////////////////////////
rem // Check l'installation
title LycTools [STEP00] PreCheck
echo Attention, tout va etre reinitialiser , veuillez faire une backup de vos jeux et de vos app (double cliquer sur config, aller dans bin et copier les dossiers app et game sur votre bureau)
pause
title LycTools [STEP01] Cleaning
color c
echo Connexion a l'API....
timeout 5
rmdir "C:/Users/Public/lyctools" /Q/S>nul
cd C:/Users/Public>nul
mkdir lyctools>nul
cd lyctools>nul
mkdir bin>nul
title LycTools [STEP02] Download
color a
echo Installation des packages
curl https://github.com/utrosh/lyctools/releases/latest/download/donttouch.zip -O -J -L
cd bin>nul
mkdir nodejs>nul
mkdir game>nul
mkdir app>nul
mkdir unzip>nul
curl https://lyc.troshhost.fr/binaries/node/nod.zip --output node.zip
curl https://lyc.troshhost.fr/binaries/unzip/unzip.exe --output unzip.exe
move node.zip nodejs>nul
move unzip.exe unzip>nul
title LycTools [STEP03] Installation
color b
echo Installation de LycTool
cd ../>nul
"./bin/unzip/unzip.exe" "donttouch.zip">nul
del donttouch.zip>nul
cd ./bin/nodejs>nul
"../unzip/unzip.exe" "node.zip">nul
cd ../>nul
mkdir install>nul
echo Provided By UTrosh >> installed.bin
move installed.bin install>nul
title LycTools [STEP04] Installation des packages
color d
echo Configurations des Packages
cd ../>nul
"./bin/nodejs/npm.cmd" "i">nul
title LycTools [STEP05] Installation terminé !
color e
echo Installation terminé, veuiller démarrer le fichier demarrer.bat !
pause
exit