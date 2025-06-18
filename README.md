# StudyMate 📚

*A minimal Python study‑time tracker you run from the terminal.*  
Logs each study session by **subject**, **date**, and **duration**; then shows weekly and all‑time summaries.

---

## ✨ Current Features
- Add subjects on the fly  
- Log a session (subject, minutes)  
- View today’s total per subject  
- View weekly totals (last 7 days)

> **Road‑map** is managed as GitHub Issues – see the **Projects** tab or Issues list.

---

## 🖥️ Quick Start

```bash
# clone & enter
git clone https://github.com/<your‑user>/studymate‑tracker
cd studymate‑tracker

# create / activate virtual‑env
python3 -m venv .venv
source .venv/bin/activate   # Windows (WSL) users stay inside WSL

# install deps (none yet, but later...)
pip install -r requirements.txt   # file will appear once we add deps

# run it
python main.py
