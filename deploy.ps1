# index.html만 spanishstory.netlify.app에 올린다 (작업노트.md 같은 파일은 올리지 않음)
$dist = Join-Path $env:TEMP "casita_dist"
New-Item -ItemType Directory -Force $dist | Out-Null
Get-ChildItem $dist | Remove-Item -Force -Recurse
Copy-Item (Join-Path $PSScriptRoot "index.html") $dist
netlify deploy --prod --dir $dist --site f5f23025-a706-4c2e-b05a-dfb369f7354e --message "update from Claude"
