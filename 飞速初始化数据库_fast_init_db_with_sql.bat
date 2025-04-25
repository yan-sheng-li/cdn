@echo off
setlocal

REM —— 第一步：打印 MySQL 版本并询问是否继续 —— 
mysql --version
IF ERRORLEVEL 1 (
    echo.
    echo ? 未检测到可用的 MySQL 命令行工具！请先配置 PATH。
    pause
    exit /b
)

echo.
set /p CONTINUE=检测到以上 MySQL 版本，是否继续初始化？ (Y/N): 
if /I not "%CONTINUE%"=="Y" (
    echo 已取消初始化操作。
    pause
    exit /b
)

REM —— 第二步：输入连接参数 —— 
echo.
set /p PORT=请输入本地 MySQL 端口（默认 3306）: 
if "%PORT%"=="" set PORT=3306

set /p PASSWORD=请输入 MySQL root 密码: 

set /p DATABASE=请输入要创建/初始化的数据库名称（如 mydb）: 
if "%DATABASE%"=="" (
    echo ? 数据库名称不能为空！
    pause
    exit /b
)

set USER=root
set SCRIPT_DIR=%~dp0

REM —— 第三步：检测 .sql 文件 —— 
set FOUND_SQL=false
for %%f in ("%SCRIPT_DIR%*.sql") do (
    if exist "%%f" set FOUND_SQL=true
)
if not %FOUND_SQL%==true (
    echo.
    echo ? 未找到任何 .sql 文件！请确保当前目录有 SQL 脚本。
    pause
    exit /b
)

REM —— 第四步：创建数据库 —— 
echo.
echo 正在创建数据库 [%DATABASE%]...
mysql -u%USER% -P%PORT% -p%PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DATABASE%;"

REM —— 第五步：导入所有 .sql 文件 —— 
echo.
for %%f in ("%SCRIPT_DIR%*.sql") do (
    echo 正在导入 %%~nxf ...
    mysql -u%USER% -P%PORT% -p%PASSWORD% %DATABASE% < "%%f"
    if ERRORLEVEL 1 (
        echo ? 导入 %%~nxf 失败！
    ) else (
        echo ? 导入 %%~nxf 成功
    )
)

echo.
echo ===== 完成 =====
echo 数据库 [%DATABASE%] 初始化已结束。
pause
