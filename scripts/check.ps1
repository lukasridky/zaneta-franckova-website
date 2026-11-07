$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$publicRoot = Join-Path $projectRoot 'public'
$html = Get-Content (Join-Path $publicRoot 'index.html') -Raw -Encoding UTF8
foreach ($match in [regex]::Matches($html, '(?:src|href)="([^"#]+)"')) {
  $target = $match.Groups[1].Value
  if ($target -notmatch '^https?:' -and -not (Test-Path -LiteralPath (Join-Path $publicRoot $target))) { throw "Missing asset: $target" }
}
$data = Get-Content (Join-Path $publicRoot 'content.js') -Raw -Encoding UTF8
foreach ($match in [regex]::Matches($data, "image: '([^']+)'")) {
  if (-not (Test-Path -LiteralPath (Join-Path $publicRoot $match.Groups[1].Value))) { throw 'Missing gallery image' }
}
$ids = [regex]::Matches($data, "id: '([^']+)'") | ForEach-Object { $_.Groups[1].Value }
if (($ids | Select-Object -Unique).Count -ne $ids.Count) { throw 'Duplicate artwork IDs' }
foreach ($id in @('galerie','o-autorce','zakazky','kontakt','artworks','art-dialog','inquiry-form','draft-text')) {
  if (-not $html.Contains('id="' + $id + '"')) { throw "Missing target: $id" }
}
if (-not $html.Contains('noindex, nofollow')) { throw 'Review indexing intentionally before launch' }
if ($html -match 'https?://') { throw 'Unexpected remote dependency in HTML' }
foreach ($file in Get-ChildItem (Join-Path $publicRoot 'assets') -Filter '*.svg') {
  $null = [xml](Get-Content $file.FullName -Raw -Encoding UTF8)
}
Write-Output 'PASS: local assets, gallery IDs, section targets, placeholder indexing and SVG XML.'
