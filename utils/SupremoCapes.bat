@ECHO off

REM Sets up the required variables
SETLOCAL
REM Set the path of the hosts file to %HOSTS_FILE%
SET "HOSTS_FILE=%WinDir%\System32\drivers\etc\hosts"
REM Create a temporary file to make the changes too
SET "TEMP_HOSTS_FILE=%TEMP%\%RANDOM%__hosts"

GOTO intro

:intro
    REM Prints the intro message
    echo "      ____                               "
    echo "     / ___|   __ _   _ __     ___   ___  "
    echo "    | |      / _` | | '_ \   / _ \ / __| "
    echo "    | |___  | (_| | | |_) | |  __/ \__ \ "
    echo "     \____|  \__,_| | .__/   \___| |___/ "
    echo "                  |_|                    "
    REM Continue to admin permission checking
    GOTO permissions

:options
    REM Let the user know the options they have
    echo .                                                           
    ECHO O SupremoCapes esta em alfa ele pega nos seguintes clients:
    ECHO Lunar, Todas as versoes optifine e modpack SupremoMc
    ECHO Obrigado por contribuir! 
    echo .                                                           
    ECHO Digite um dos seguintes (utilize um numero)
    ECHO 1) Instalar (Instale o SupremoCapes em seu computador)
    ECHO 2) Remover (Remova o SupremoCapes do seu computador)
    ECHO 3) Sair (Fecha o programa)
    REM Take in user input and store it as %OPTION%
    SET /p choice=Digite o numero que representa uma opção:

    if '%choice%'=='' (
        ECHO "%choice%" Isso não é valido
        GOTO options
    )
    if '%choice%'=='1' GOTO install
    if '%choice%'=='2' GOTO uninstall
    if '%choice%'=='3' EXIT

:permissions
    REM This attempts to add a registry key (This will fail without admin rights)
    REM the key already exists so will not be affected
    REG ADD HKLM /F>nul 2>&1
    if %ERRORLEVEL% == 0 (
        REM The user has admin permissions and can continue
        GOTO options
    ) else (
        REM O usuario não utilizou o administrador 
        ECHO ---------------------------------------------------------
        ECHO SEM PERMISSÕES DE ADMINISTRAÇÃO
        ECHO ---------------------------------------------------------
        ECHO Você não executou isso com permissões de administrador, execute 
        ECHO de novo, mas com permissão de administrador. Para fazer isso, clique com o botão direito
        ECHO este arquivo e clique em "Executar como administrador"
        REM Pausing execution so the user can read the message
        PAUSE
        EXIT
    )

:install
    REM Create a temporary file that and put all of the hosts
    REM file contents in it excluding existing redirects
    FINDSTR /V "34.68.41.85 s.optifine.net # INSERTED BY MINECRAFT CAPES" "%HOSTS_FILE%" > "%TEMP_HOSTS_FILE%"
    REM Add the redirect to the new file
    ECHO 34.68.41.85 s.optifine.net # SupremoCapes >> "%TEMP_HOSTS_FILE%"
    REM Replace the Hosts file with the Temp file
    COPY /b/v/y "%TEMP_HOSTS_FILE%" "%HOSTS_FILE%"
    ECHO Install Complete
    REM Pausing execution so the user can read the message
    PAUSE
    EXIT

:uninstall
    REM Create a temporary file that and put all of the hosts
    REM file contents in it excluding existing redirects
    FINDSTR /V "REPLACE_ME s.optifine.net # INSERTED BY MINECRAFT CAPES" "%HOSTS_FILE%" > "%TEMP_HOSTS_FILE%"
    REM Replace the Hosts file with the Temp file
    COPY /b/v/y "%TEMP_HOSTS_FILE%" "%HOSTS_FILE%"
    ECHO UnInstall Complete
    REM Pausing execution so the user can read the message
    PAUSE
    EXIT