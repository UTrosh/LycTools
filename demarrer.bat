@echo off
rem ////////////////////////////////////
rem // Outil proposé par UTrosh
rem ////////////////////////////////////
set nodebin="./bin/nodejs/node.exe"
set npmbin="./bin/nodejs/npm.cmd"
set unzipbin="../unzip/unzip.exe"

rem // Check l'installation
title LycTools [] 0.3B
echo Verification de l'installation...
IF EXIST C:\Users\Public\lyctools\bin\install\installed.bin (
    cd C:\Users\Public\lyctools
    echo Demarrage...
    %nodebin% "./toolsb/Main.js"
) ELSE (
    mkdir C:\Users\Public\lyctools
    copy * C:\Users\Public\lyctools
    cd C:\Users\Public\lyctools
    powershell "$s=(New-Object -COM WScript.Shell).CreateShortcut('%userprofile%\Desktop\lyctools.lnk');$s.TargetPath='C:\Users\Public\lyctools';$s.Save()"
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
    %npmbin% "i"
    %nodebin% "./toolsb/Main.js"
)