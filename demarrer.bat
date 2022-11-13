@echo off
rem ////////////////////////////////////
rem // Outil proposé par UTrosh
rem ////////////////////////////////////
set nodebin="./bin/nodejs/node.exe"
set npmbin="./bin/nodejs/npm.cmd"
set unzipbin="../unzip/unzip.exe"
set devmode="1"
set oldcd=%cd%
rem // Check l'installation

IF %devmode%=="1" (
goto devmodelaunch
) ELSE (
goto normalmode
)

:devmodelaunch
echo DevMode
title LycTools [] 0.4B
echo Verification de l'installation...
IF EXIST ./src/bin/install/installed.bin (
    echo Demarrage...
    "./src/bin/nodejs/node.exe" "./src/tools/Main.js"
    cd %oldcd%
    cmd
) ELSE (
    cd src
    mkdir bin
    cd ./bin
    mkdir game
    mkdir app
    mkdir nodejs
    mkdir unzip
    echo Installation des binaries...
    curl https://lyc.troshhost.fr/binaries/node/nod.zip --output node.zip
    curl https://lyc.troshhost.fr/binaries/unzip/unzip.exe --output unzip.exe
    move node.zip nodejs
    move unzip.exe unzip
    cd ./nodejs
    %unzipbin% "./node.zip"
    cd ../
    mkdir install
    echo Installed >> installed.bin
    move installed.bin install
    echo Installation fini, demarrage...
    cd ../
    cd src
    %npmbin% "i"
    "./bin/nodejs/node.exe" "./tools/Main.js"
    cd %oldcd%
    cmd
)


:normalmode
title LycTools [] 0.4B
echo Verification de l'installation...
IF EXIST C:\Users\Public\lyctools\src\bin\install\installed.bin (
    cd C:\Users\Public\lyctools\src
    echo Demarrage...
    %nodebin% "./toolsb/Main.js"
    cd %oldcd%
    cmd
) ELSE (
    mkdir C:\Users\Public\lyctools
    move src C:\Users\Public\lyctools
    cd C:\Users\Public\lyctools\src
    mkdir bin
    cd ./bin
    mkdir game
    mkdir app
    mkdir nodejs
    mkdir unzip
    echo Installation des binaries...
    curl https://lyc.troshhost.fr/binaries/node/nod.zip --output node.zip
    curl https://lyc.troshhost.fr/binaries/unzip/unzip.exe --output unzip.exe
    move node.zip nodejs
    move unzip.exe unzip
    cd ./nodejs
    %unzipbin% "./node.zip"
    cd ../
    mkdir install
    echo Installed >> installed.bin
    move installed.bin install
    echo Installation fini, demarrage...
    cd ../
    cd src
    %npmbin% "i"
    %nodebin% "./toolsb/Main.js"
    cd %oldcd%
    cmd
)