export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.username = user?.username || "UnknownUsername";
        token.img = user?.img || "/pbk-logo.png"
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.username = token?.username || "UnknownUsername";
        session.user.img = token?.img || "/pbk-logo.png"
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isLoggedIn = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
      if (isOnBlogPage && !isLoggedIn) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && isLoggedIn) {
          return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
      if (isOnDashboard && !isLoggedIn) {
        Response.redirect(new URL("/", request.nextUrl));
        return false;
      }

      return true
    },
  },
};
