import { NextResponse } from "next/server";

const CLI_HOSTS = new Set(["cli.holmes.id.vn", "cli.localhost"]);

export function middleware(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host")?.split(":")[0];

  if (CLI_HOSTS.has(host) && url.pathname === "/") {
    url.pathname = "/cli";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
