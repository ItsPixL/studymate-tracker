export async function fetchSubjects(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/subjects")
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return await res.json();
}

export async function fetchStreaks(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/streaks")
    if (!res.ok) throw new Error("Failed to fetch streaks");
    return await res.json();
}

export async function fetchWeekly(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/weekly")
    if (!res.ok) throw new Error("Failed to fetch weekly stats");
    return await res.json();
}

export async function fetchMonthly(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/monthly")
    if (!res.ok) throw new Error("Failed to fetch monthly stats");
    return await res.json();
}