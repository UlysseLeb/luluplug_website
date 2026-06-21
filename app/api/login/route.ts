import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // TODO: vérifier l'email/mot de passe contre la vraie base de données
  console.log("Tentative de connexion :", body);

  return NextResponse.json({ ok: true });
}
