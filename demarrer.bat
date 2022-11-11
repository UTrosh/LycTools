@echo off
rem ////////////////////////////////////
rem // Outil proposé par UTrosh
rem ////////////////////////////////////
set nodebin="./bin/nodejs/node.exe"

rem // Check l'installation
title LycTools [] 0.1B
echo Verification de l'installation...
IF EXIST ./bin/install/installed.bin (
    echo Demarrage...
    %nodebin% "./tools/index.js"
) ELSE (
    cd ./bin
    mkdir nodejs
    cd nodejs
    echo Installation...
    curl https://nodejs.org/dist/v16.16.0/win-x64/node.exe --output node.exe
    cd ../
    mkdir install
    cd install
    echo Installed >> installed.bin
    cd .../
    echo Installation fini, demarrage...
    %nodebin% ./tools/index.js
)