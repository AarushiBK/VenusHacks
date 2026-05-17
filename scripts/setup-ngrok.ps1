# One-time: add your ngrok authtoken from https://dashboard.ngrok.com/get-started/your-authtoken
param(
    [Parameter(Mandatory = $true)]
    [string]$Token
)

$ngrok = Join-Path $PSScriptRoot "..\tools\ngrok\ngrok.exe"
if (-not (Test-Path $ngrok)) {
    Write-Error "ngrok.exe not found. Run from repo root after tools/ngrok is installed."
    exit 1
}

& $ngrok config add-authtoken $Token
Write-Host "Authtoken saved. Now run: .\scripts\start-ngrok.ps1"
