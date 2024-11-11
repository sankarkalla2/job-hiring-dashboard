import { NextResponse } from "next/server";

// This is a mock database. In a real application, you'd use a proper database.
let candidates = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "Pending",
    date: "2023-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "In Progress",
    date: "2023-01-02",
  },
];

export async function GET() {
  return NextResponse.json(candidates);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCandidate = {
    id: Date.now().toString(),
    name: body.name,
    email: body.email,
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
  };
  candidates.push(newCandidate);
  return NextResponse.json(newCandidate, { status: 201 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();
  const candidateIndex = candidates.findIndex((c) => c.id === id);

  if (candidateIndex === -1) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }

  candidates[candidateIndex] = { ...candidates[candidateIndex], ...body };
  return NextResponse.json(candidates[candidateIndex]);
}
