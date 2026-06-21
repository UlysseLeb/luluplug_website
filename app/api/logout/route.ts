import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  // pour supprimer un cookie httpOnly, on ne peut pas le faire en JS côté navigateur :
  // on renvoie le même cookie avec une durée de vie expirée (maxAge: 0)
  response.cookies.set("session", "", { maxAge: 0, path: "/" });

  return response;
}
