$desktop = [System.Environment]::GetFolderPath('Desktop')
$url = "https://it-study-hub-git-main-joseph-2dc7.vercel.app"
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# 1. Create .URL Internet Shortcut
$urlShortcutPath = Join-Path $desktop "IT Study Hub (Online).url"
@"
[InternetShortcut]
URL=$url
IconIndex=0
IconFile=$chromePath
"@ | Out-File -FilePath $urlShortcutPath -Encoding ascii

Write-Host "Created URL shortcut: $urlShortcutPath"

# 2. Create Chrome/Edge App Mode Shortcut (.lnk)
$wsh = New-Object -ComObject WScript.Shell
$lnkPath = Join-Path $desktop "IT Study Hub.lnk"
$shortcut = $wsh.CreateShortcut($lnkPath)

if (Test-Path $chromePath) {
    $shortcut.TargetPath = $chromePath
    $shortcut.Arguments = "--app=$url"
    $shortcut.IconLocation = "$chromePath,0"
} elseif (Test-Path $edgePath) {
    $shortcut.TargetPath = $edgePath
    $shortcut.Arguments = "--app=$url"
    $shortcut.IconLocation = "$edgePath,0"
} else {
    $shortcut.TargetPath = $url
}

$shortcut.Description = "IT Study Hub - Online Vercel App"
$shortcut.WorkingDirectory = $desktop
$shortcut.Save()

Write-Host "Created Desktop App Shortcut: $lnkPath"
