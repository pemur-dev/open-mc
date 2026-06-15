@echo off
setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [open-mc] Installing required dependencies...
    powershell -Command "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process; npm install --silent"
    if !ERRORLEVEL! neq 0 (
        echo [open-mc] Failed to install dependencies. Make sure Node.js and npm are installed.
        pause
        exit /b 1
    )
)

:: Check if dist exists
if not exist "dist\" (
    echo [open-mc] Building project...
    powershell -Command "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process; npm run build"
    if !ERRORLEVEL! neq 0 (
        echo [open-mc] Failed to build project.
        pause
        exit /b 1
    )
)

:: If no arguments, prompt for a command
if "%~1"=="" (
    echo.
    echo ========================================
    echo   open-mc Minecraft Server Manager
    echo ========================================
    echo.
    echo Available commands:
    echo   init   - Setup a new server
    echo   plugin - Add plugins (e.g. plugin add essentials)
    echo   start  - Start the server
    echo.
    set /p "cmd_input=Enter command: "
    if "!cmd_input!"=="" exit /b 0
    
    node "dist\index.js" !cmd_input!
) else (
    node "dist\index.js" %*
)

if %ERRORLEVEL% neq 0 (
    echo.
    echo [open-mc] Command failed with error code %ERRORLEVEL%
    pause
) else (
    :: Only pause if we're in the interactive mode (no initial args)
    if "%~1"=="" (
        echo.
        echo Command finished.
        pause
    )
)

endlocal
