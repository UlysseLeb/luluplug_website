import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // TODO: valider les données et les écrire dans une vraie base de données
  console.log("Nouveau compte reçu :", body);

  return NextResponse.json({ ok: true });
}
