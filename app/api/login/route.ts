import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

// Prisma 7 a besoin d'un "adapter" explicite pour savoir comment parler à SQLite
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

//Permet de crypter le cookie d'utilisateur (sécurisé) pour l'authentification
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {

    // request.json() ne peut être lu qu'une seule fois : on le fait une fois, puis on déstructure

  const body = await request.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });

  // si l'email n'existe pas, "user" est null : on ne peut pas comparer un mot de passe
  // avec quelque chose qui n'existe pas, donc on s'arrête ici avec une erreur générique
  if (!user) {


    return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
  }

  // bcrypt.compare recalcule le hash du mot de passe saisi et le compare à celui stocké
  // (on ne "déshash" jamais, on ne fait que comparer)
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    // même message que ci-dessus : on ne révèle jamais si c'est l'email OU le mot de passe
    // qui est faux, sinon on donne des indices à quelqu'un qui essaierait de deviner un compte
    return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
  }


  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

  // on attache le token au cookie de la réponse ; httpOnly empêche le JS du
  // navigateur de le lire (protection contre le vol de session via une faille XSS)
  const response = NextResponse.json({ ok: true });
  response.cookies.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
