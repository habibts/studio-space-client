import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("studio_jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to clear studio_jwt", err instanceof Error ? err.message : "unknown error");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}