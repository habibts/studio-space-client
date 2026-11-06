import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }
    const token = jwt.sign(
      { id: session.user.id, email: session.user.email, name: session.user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const cookieStore = await cookies();
    cookieStore.set("studio_jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to issue studio_jwt", err instanceof Error ? err.message : "unknown error");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
