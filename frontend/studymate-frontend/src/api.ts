// Fetch Subjects
export async function fetchSubjects(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/subjects")
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return await res.json();
}

// Fetch Streaks
export async function fetchStreaks(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/streaks")
    if (!res.ok) throw new Error("Failed to fetch streaks");
    return await res.json();
}

// Fetch Weekly Stats
export async function fetchWeekly(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/weekly")
    if (!res.ok) throw new Error("Failed to fetch weekly stats");
    return await res.json();
}

// Fetch Monthly Stats
export async function fetchMonthly(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/monthly")
    if (!res.ok) throw new Error("Failed to fetch monthly stats");
    return await res.json();
}

// Add Subject
export async function addSubject(subjectName: string): Promise<{ message: string }> {
    const res = await fetch("http://localhost:5000/api/addSubject", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: subjectName }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add subject: ${errorText}`);
    }

    return await res.json();
}

// Remove Subject
export async function removeSubject(subjectName: string): Promise<{ message: string }> {
    const res = await fetch("http://localhost:5000/api/removeSubject", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({subject: subjectName})
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add subject: ${errorText}`)
    }

    return await res.json()
}

// Log Session
export async function logSession(subjectName: string, duration: number): Promise<{ message: string }> {
    const res = await fetch("http://localhost:5000/api/logSession", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({subject: subjectName, duration: duration})
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to log session: ${errorText}`)
    }

    return await res.json()
}