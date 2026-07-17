$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$logosDirectory = Join-Path $projectRoot "logos"
$manifestPath = Join-Path $projectRoot "logos-manifest.js"
$supportedExtensions = @(".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif")

$logoPaths = @(
  Get-ChildItem -LiteralPath $logosDirectory -File |
    Where-Object { $supportedExtensions -contains $_.Extension.ToLowerInvariant() } |
    Sort-Object Name |
    ForEach-Object { "logos/$($_.Name)" }
)

$json = ConvertTo-Json -InputObject $logoPaths -Compress
$manifest = "window.SOCIAL_PROOF_LOGOS = $json;`r`n"
Set-Content -LiteralPath $manifestPath -Value $manifest -Encoding UTF8

Write-Host "Updated logos-manifest.js with $($logoPaths.Count) logo(s)."
