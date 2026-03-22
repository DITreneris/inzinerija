# Atsisiunčia Roboto-Regular.ttf į public/fonts/ (jsPDF 4 + lietuviškos raidės PDF).
# Anksčiau: NotoSans – kai kurie TTF build'ai kėlė jsPDF „No unicode cmap“. Roboto (Apache 2.0) – stabilesnis.
# Paleisti iš projekto šaknies: .\scripts\download-noto-font.ps1
#
# GitHub – Roboto (pageidautina nuoroda – openmaptiles/fonts, žemėlapių stack'ui paruoštas TTF):
#   Blob: https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf
#   Raw:  https://raw.githubusercontent.com/openmaptiles/fonts/master/roboto/Roboto-Regular.ttf
# Atsarginis (google/fonts):
#   https://github.com/google/fonts/raw/main/apache/roboto/Roboto-Regular.ttf
# Noto Sans (atsarginis PDF): google/fonts ofl/notosans – žr. PDF_FONTS_GITHUB_SOURCES.md
# Dokumentacija: docs/development/PDF_FONTS_GITHUB_SOURCES.md

$fontsDir = (Join-Path (Join-Path $PSScriptRoot "..") "public\fonts")
$outPath = Join-Path $fontsDir "Roboto-Regular.ttf"
$urlPrimary = "https://raw.githubusercontent.com/openmaptiles/fonts/master/roboto/Roboto-Regular.ttf"
$urlFallback = "https://github.com/google/fonts/raw/main/apache/roboto/Roboto-Regular.ttf"

if (-not (Test-Path $fontsDir)) {
    New-Item -ItemType Directory -Path $fontsDir -Force | Out-Null
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ok = $false
foreach ($url in @($urlPrimary, $urlFallback)) {
    try {
        Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -TimeoutSec 60
        Write-Host "OK: Roboto-Regular.ttf -> public/fonts/ (saltinis: $url)"
        $ok = $true
        break
    } catch {
        Write-Host "Nepavyko: $url - $($_.Exception.Message)"
    }
}
if (-not $ok) {
    Write-Host "Abu saltiniai nepavyko. Atsisiusti ranka:"
    Write-Host "  $urlPrimary"
    Write-Host "  arba $urlFallback"
    Write-Host "Irasykite i: $outPath"
    exit 1
}
