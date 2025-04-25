@echo off
setlocal

REM ���� ��һ������ӡ MySQL �汾��ѯ���Ƿ���� ���� 
mysql --version
IF ERRORLEVEL 1 (
    echo.
    echo ? δ��⵽���õ� MySQL �����й��ߣ��������� PATH��
    pause
    exit /b
)

echo.
set /p CONTINUE=��⵽���� MySQL �汾���Ƿ������ʼ���� (Y/N): 
if /I not "%CONTINUE%"=="Y" (
    echo ��ȡ����ʼ��������
    pause
    exit /b
)

REM ���� �ڶ������������Ӳ��� ���� 
echo.
set /p PORT=�����뱾�� MySQL �˿ڣ�Ĭ�� 3306��: 
if "%PORT%"=="" set PORT=3306

set /p PASSWORD=������ MySQL root ����: 

set /p DATABASE=������Ҫ����/��ʼ�������ݿ����ƣ��� mydb��: 
if "%DATABASE%"=="" (
    echo ? ���ݿ����Ʋ���Ϊ�գ�
    pause
    exit /b
)

set USER=root
set SCRIPT_DIR=%~dp0

REM ���� ����������� .sql �ļ� ���� 
set FOUND_SQL=false
for %%f in ("%SCRIPT_DIR%*.sql") do (
    if exist "%%f" set FOUND_SQL=true
)
if not %FOUND_SQL%==true (
    echo.
    echo ? δ�ҵ��κ� .sql �ļ�����ȷ����ǰĿ¼�� SQL �ű���
    pause
    exit /b
)

REM ���� ���Ĳ����������ݿ� ���� 
echo.
echo ���ڴ������ݿ� [%DATABASE%]...
mysql -u%USER% -P%PORT% -p%PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DATABASE%;"

REM ���� ���岽���������� .sql �ļ� ���� 
echo.
for %%f in ("%SCRIPT_DIR%*.sql") do (
    echo ���ڵ��� %%~nxf ...
    mysql -u%USER% -P%PORT% -p%PASSWORD% %DATABASE% < "%%f"
    if ERRORLEVEL 1 (
        echo ? ���� %%~nxf ʧ�ܣ�
    ) else (
        echo ? ���� %%~nxf �ɹ�
    )
)

echo.
echo ===== ��� =====
echo ���ݿ� [%DATABASE%] ��ʼ���ѽ�����
pause
