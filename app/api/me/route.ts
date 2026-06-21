import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  // pas de cookie du tout : personne n'est connecté
  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    // jwt.verify vérifie la signature ET renvoie le contenu si c'est valide ;
    // ça lève une erreur si le token a été modifié ou a expiré
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { email: true }, // jamais le mot de passe, même hashé
    });

    return NextResponse.json({ user });
  } catch {
    // token invalide/expiré : on traite comme "pas connecté"
    return NextResponse.json({ user: null });
  }
}
