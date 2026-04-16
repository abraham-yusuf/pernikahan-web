import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "Password baru wajib diisi." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password baru minimal 8 karakter." },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      const normalizedMessage = error.message.toLowerCase();

      if (
        normalizedMessage.includes("session") ||
        normalizedMessage.includes("expired") ||
        normalizedMessage.includes("invalid")
      ) {
        return NextResponse.json(
          {
            error:
              "Token reset password tidak valid atau sudah kedaluwarsa. Silakan kirim ulang email reset password.",
            code: "INVALID_OR_EXPIRED_TOKEN",
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: "Gagal memperbarui password. Silakan coba lagi." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Password berhasil diperbarui." });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui password." },
      { status: 500 }
    );
  }
}
