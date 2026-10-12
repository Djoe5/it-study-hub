# Script to start Study Hub Vite dev server (if not already running) and open the browser
$projectPath = "C:\Users\joenj\.gemini\antigravity\scratch\study-hub"
$port = 5175
$url = "http://localhost:5175/"

# Check if port 5175 is listening
$conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

if (-not $conn) {
    # Start Vite in the background
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd /d `"$projectPath`" && npm run dev" -WindowStyle Hidden
    Start-Sleep -Seconds 3
}

# Open default browser
Start-Process $url
