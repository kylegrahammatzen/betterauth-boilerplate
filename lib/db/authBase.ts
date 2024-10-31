import { NextRequest, NextResponse } from "next/server";
import { authClient } from "../authClient";

export type AuthbaseConfig = {
  privateRoutes: (string | RegExp)[];
  loginUrl: string;
};

export function initAuthbase(config: AuthbaseConfig): Authbase {
  return new Authbase(config);
}

class Authbase {
  private readonly privateRoutes: (string | RegExp)[];
  private readonly loginUrl: string;

  constructor(config: AuthbaseConfig) {
    this.privateRoutes = config.privateRoutes;
    this.loginUrl = config.loginUrl;
  }

  private isPrivateRoute(url: string): boolean {
    return this.privateRoutes.some((route) => {
      if (typeof route === "string") {
        return route === url;
      }
      return route.test(url);
    });
  }

  async handleRequest(request: NextRequest): Promise<NextResponse | null> {
    const path = request.nextUrl.pathname;

    if (this.isPrivateRoute(path)) {
      const { data: session } = await authClient.getSession({
        fetchOptions: {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      });

      if (!session) {
        return NextResponse.redirect(new URL(this.loginUrl, request.url));
      }
    }

    return null;
  }
}
