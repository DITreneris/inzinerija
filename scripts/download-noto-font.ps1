# Atsisiunčia NotoSans-Regular.ttf į public/fonts/ (lietuviškų raidžių palaikymui PDF).
# Paleisti iš projekto šaknies: .\scripts\download-noto-font.ps1

$fontsDir = (Join-Path (Join-Path $PSScriptRoot "..") "public\fonts")
$outPath = Join-Path $fontsDir "NotoSans-Regular.ttf"
$url = "https://github.com/google/fonts/raw/main/ofl/notosans/NotoSans-Regular.ttf"

if (-not (Test-Path $fontsDir)) {
    New-Item -ItemType Directory -Path $fontsDir -Force | Out-Null
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
try {
    Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -TimeoutSec 60
    Write-Host "OK: NotoSans-Regular.ttf įrašytas į public/fonts/"
} catch {
    Write-Host "Klaida: $($_.Exception.Message)"
    Write-Host "Galite atsisiųsti rankiniu būdu: $url"
    Write-Host "Įrašykite failą į: $outPath"
    exit 1
}
