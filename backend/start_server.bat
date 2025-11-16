@echo off
REM Script สำหรับรัน Flask Backend Server บน Windows

echo >>> กำลังตรวจสอบ Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo >>> ข้อผิดพลาด: ไม่พบ Python กรุณาติดตั้ง Python3 ก่อน
    pause
    exit /b 1
)

echo >>> กำลังตรวจสอบ virtual environment...
if not exist "venv" (
    echo >>> กำลังสร้าง virtual environment...
    python -m venv venv
)

echo >>> กำลังเปิดใช้งาน virtual environment...
call venv\Scripts\activate.bat

echo >>> กำลังติดตั้ง dependencies...
python -m pip install -q --upgrade pip
python -m pip install -q -r requirements.txt

echo >>> กำลังตรวจสอบว่า port 5000 ว่างหรือไม่...
netstat -ano | findstr :5000 >nul
if not errorlevel 1 (
    echo >>> เตือน: Port 5000 ถูกใช้งานอยู่แล้ว
    echo >>> กำลังพยายามปิด process ที่ใช้ port 5000...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 >nul
)

echo >>> กำลังเริ่มรัน Flask Backend Server...
echo >>> Server จะรันที่ http://127.0.0.1:5000
echo >>> กด Ctrl+C เพื่อหยุด server
echo.

python api.py

pause

