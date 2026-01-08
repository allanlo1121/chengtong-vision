Write-Host "Checking for running Next.js or Node dev processes..." -ForegroundColor Cyan

# 查找占用 3000 / 3001 / 3002 的 Node 进程
$ports = @(3000, 3001, 3002)

foreach ($port in $ports) {
    $processId = (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
                  Select-Object -ExpandProperty OwningProcess -ErrorAction SilentlyContinue)

    if ($processId) {
        Write-Host "⚠ Port $port is occupied by PID $processId. Killing..." -ForegroundColor Yellow
        taskkill /PID $processId /F | Out-Null
    }
}

# 删除 .next.lock
$lockPath = "apps/frontend/.next/dev/lock"
if (Test-Path $lockPath) {
    Write-Host "Removing leftover Next.js lock file..." -ForegroundColor Yellow
    Remove-Item -Force $lockPath
}

# 删除 .next 目录
$nextDir = "apps/frontend/.next"
if (Test-Path $nextDir) {
    Write-Host "Cleaning .next cache..." -ForegroundColor DarkYellow
    Remove-Item -Recurse -Force $nextDir
}

Write-Host "Starting Turbo dev..." -ForegroundColor Green
pnpm turbo run dev --parallel
