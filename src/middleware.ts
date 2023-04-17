import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.SECRET;

export function middleware(req: NextRequest) {
  const { cookies } = req;

  const jwt = cookies.get("OursiteJWT");

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register")
  ) {
    if (jwt) {
      try {
        verify(jwt.value, secret!);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (err) {
        return NextResponse.next();
      }
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (jwt == undefined) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (secret == undefined) {
      console.log("processs.env.SECRET is undefined");
      return NextResponse.redirect("/login");
    }
    try {
      verify(jwt.value, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect("/login");
    }
  }
  return NextResponse.next();
}

export async function verify(token: string, secret: string): Promise<any> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

  return payload;
}
