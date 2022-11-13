@echo off
rem ////////////////////////////////////
rem // Outil proposé par UTrosh
rem ////////////////////////////////////


rem // Check l'installation
title LycTools [] 5LimeALPHA
echo Verification de l'installation...
IF EXIST C:/Users/Public/lyctools/bin/install/installed.bin (
    echo Demarrage...
    "C:/Users/Public/lyctools/bin/nodejs/node.exe" "C:/Users/Public/lyctools/toolsb/Main.js"
) ELSE (
    echo Installation...
    start installation.bat
    pause
    "C:/Users/Public/lyctools/bin/nodejs/node.exe" "C:/Users/Public/lyctools/toolsb/Main.js"
)