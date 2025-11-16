#!/bin/bash

# Script สำหรับรัน Flask Backend Server

echo ">>> กำลังตรวจสอบ Python..."
if ! command -v python3 &> /dev/null; then
    echo ">>> ข้อผิดพลาด: ไม่พบ Python3 กรุณาติดตั้ง Python3 ก่อน"
    exit 1
fi

echo ">>> กำลังตรวจสอบ virtual environment..."
if [ ! -d "venv" ]; then
    echo ">>> กำลังสร้าง virtual environment..."
    python3 -m venv venv
fi

echo ">>> กำลังเปิดใช้งาน virtual environment..."
source venv/bin/activate

echo ">>> กำลังติดตั้ง dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo ">>> กำลังตรวจสอบว่า port 5000 ว่างหรือไม่..."
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo ">>> เตือน: Port 5000 ถูกใช้งานอยู่แล้ว"
    echo ">>> กำลังพยายามปิด process ที่ใช้ port 5000..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

echo ">>> กำลังเริ่มรัน Flask Backend Server..."
echo ">>> Server จะรันที่ http://127.0.0.1:5000"
echo ">>> กด Ctrl+C เพื่อหยุด server"
echo ""

python3 api.py

