import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (email !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Crear token JWT
    const token = await createToken({ email });

    // Crear la respuesta
    const response = NextResponse.json(
      { success: true, message: "Login exitoso" },
      { status: 200 }
    );

    // Establecer la cookie en la respuesta
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 horas
    });

    return response;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
