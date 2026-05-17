# Run in Terminal 2 while `python server/app.py` is running in Terminal 1
$ngrok = Join-Path $PSScriptRoot "..\tools\ngrok\ngrok.exe"
if (-not (Test-Path $ngrok)) {
    Write-Error "Missing tools\ngrok\ngrok.exe"
    exit 1
}

Write-Host "Starting ngrok tunnel to localhost:8000 ..."
Write-Host "Copy the https:// URL into iPhone Safari."
Write-Host ""
& $ngrok http 8000
