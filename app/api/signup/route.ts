import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import bcrypt from "bcryptjs";

// Prisma 7 a besoin d'un "adapter" explicite pour savoir comment parler à SQLite
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter });

export async function POST(request: NextRequest) {
  // request.json() ne peut être lu qu'une seule fois : on le fait une fois, puis on déstructure
  const body = await request.json();
  const { email, password } = body;

  // on hash le mot de passe avant de l'enregistrer, jamais en clair
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, password: hashedPassword } });

  return NextResponse.json({ ok: true });
}
