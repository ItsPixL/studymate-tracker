![StudyMate Logo](logo.png)

# StudyMate 📚

_A minimal Python + React JS study‑time tracker for both terminal lovers and UI fans trying to improve their focus and learning._  
StudyMate helps you focus on your learning by tracking study sessions, timing them, and showing your progress.

- Whether you like the **simplicity of the CLI** or the **polish of a web UI**, StudyMate has you covered.
- Log each study session by **subject**, **date**, and **duration** then shows weekly and all‑time summaries.
- Use the built-in **timer**, **pomodoro**, or **stopwatch** to focus on your learning.

---

## ✨ Current Features

- Add subjects on the fly
- Log a session (subject, minutes, date)
- View a list of all sessions
- View totals of sessions per subject
- Built-in timer, stopwatch, and pomodoro to time your sessions (and automatically log them)
- Weekly and monthly stats
- React JS + Motion based Frontend with beautiful animations and seamless integration to the app.

## 🛣️ Possible Future Features

- More gamified experience
- Graphs and charts
- Improvements to UI and animations

---

## 🖥️ Quick Start

### 1️⃣ Clone the repo

```bash
git clone https://github.com/ItsPixL/studymate-tracker.git
cd studymate-tracker
```

### 2️⃣ Choose your mode (SETUP ONLY)

#### CLI mode (SETUP ONLY)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

#### GUI mode (SETUP ONLY)

```bash
# Backend setup
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend/studymate-frontend
npm install
npm run build

# Run Flask server
cd ../backend
python app.py
```

### 3️⃣ Lock in!

You're all setup! Now you can:

- Add some subjects
- Log a session manually
- Use the built-in timers to focus
- Watch your stats (and grades) grow

#### Start CLI

```bash
cd backend
python main.py
```

#### Start GUI

```bash
cd backend
python app.py
```

Both the GUI and CLI work simultaneously, so you can easily switch between them! All your data is stored in `backend/data/sessions.json` and `backend/data/subjects.json` and nothing is sent to any servers or anything external (the app can run fully offline)!

---

## 🛠️ Troubleshooting

Here are common things that might go wrong:

### 1. "Unexpected token '<'" is not valid JSON"

This usually happens if the backend is serving the HTML fallback page instead of JSON.

- Check that the backend is running before making requests.
- Ensure the API endpoint URL is correct in your frontend config.

### 2. "ModuleNotFoundError"

- Make sure your virtual environment is activated (source venv/bin/activate or venv\Scripts\activate on Windows).
- Install requirements again using `pip install -r requirements.txt`.

### 3. Frontend not updating after changes

- Rebuilt the frontend using `npm run build` (inside the frontend/studymate-frontend/ folder)

---

## 😄 Contribution

Help and suggestions are welcome! Use issues for anything you want to discuss. Or email me at `sheth.neer27@gmail.com`.

---

## 🤖 A Note on AI Use

AI has been used in this project, but very minimally. ChatGPT was used in creating this README, as well as generating the idea and general development roadmap. However, no AI was used for code or debugging - this was all done manually using documentation and lots of trial and error.

---

## 📃 MIT Licence

Copyright 2025 Neer Sheth

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
