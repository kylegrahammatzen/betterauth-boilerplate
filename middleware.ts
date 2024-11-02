import { NextRequest } from "next/server";
import { initAuthbase } from "./lib/db/authbase";

export const PRIVATE_ROUTES = [/^\/app($|\/.*|\d+)/];
export const LOGIN_URL = "/";

// Configuration for Authbase
const authbase = initAuthbase({
  privateRoutes: PRIVATE_ROUTES,
  loginUrl: LOGIN_URL,
});

export async function middleware(request: NextRequest) {
  return await authbase.handleRequest(request);
}

// Next.js routing configuration for excluding specific routes
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
