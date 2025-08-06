export async function fetchSubjects(): Promise<string[]> {
    const res = await fetch("http://localhost:5000/api/subjects")
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return await res.json();
}