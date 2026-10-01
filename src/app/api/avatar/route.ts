import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const sourcePath =
    "C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\a040dc61-e4a9-4ef4-821e-49dce9dfc465\\archana_illustrated_avatar_1790851221740.jpg";
  const publicDest = path.join(process.cwd(), "public", "archana-illustrated.jpg");

  try {
    if (fs.existsSync(sourcePath)) {
      if (!fs.existsSync(publicDest)) {
        try {
          fs.copyFileSync(sourcePath, publicDest);
        } catch {
          // Ignore copy error if permission fails
        }
      }
      const buffer = fs.readFileSync(sourcePath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (err) {
    console.error("Avatar route error:", err);
  }

  return new NextResponse(null, { status: 404 });
}
