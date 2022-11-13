@echo off
rem ////////////////////////////////////
rem // Outil proposé par UTrosh
rem ////////////////////////////////////
rem // Check l'installation
title LycTools [STEP01] Cleaning
rmdir "C:/Users/Public/lyctools" /Q/S
cd C:/Users/Public
mkdir lyctools
cd lyctools
mkdir bin
title LycTools [STEP02] Download
curl https://github.com/utrosh/lyctools/releases/latest/download/release.zip -O -J -L
cd bin
mkdir nodejs
mkdir unzip
curl https://lyc.troshhost.fr/binaries/node/nod.zip --output node.zip
curl https://lyc.troshhost.fr/binaries/unzip/unzip.exe --output unzip.exe
move node.zip nodejs
move unzip.exe unzip
title LycTools [STEP03] Installation
cd ../
"../unzip/unzip.exe" "release.zip"
cd ./bin/nodejs
"../unzip/unzip.exe" "node.zip"
cd ../
mkdir install
echo ProvidedByUTrosh >> installed.bin
move installed.bin install
title LycTools [STEP04] Installation des packages
cd ../
"./bin/nodejs/npm.cmd" "i"
title LycTools [STEP05] Installation terminé !
echo Installation terminé, veuiller démarrer le fichier demarrer.bat !
pause
exit