// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
//import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
//import EmailProvider from "next-auth/providers/email"
//import FacebookProvider from "next-auth/providers/facebook";

import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

// NextAuth( authConfi++providers[]++callbacks[signIn ++ authConfig.callbacks]
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    // Sign in with GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // Sign in with Google
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Sign in with LinkedIn
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    }),
    // // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),
    // Sign in with Credentials
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // GitHub
      if (account.provider === "github") {
        connectToDb();
        try {
          // MongoDB alias for finding someone in the 'User' table
          const foundUser  = await User.findOne({ email: profile.email });

          if (!foundUser) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
              authProvider: account.provider,
              authPayload: profile,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      // Google
      if (account.provider === "google") {
        // ADD LOGIC LATER
        return false;
      }
      // LinkedIn
      if (account.provider === "linkedin") {
        /*
          // Example Response: profile
          {
            "sub": "782bbtaQ",
            "name": "John Doe",
            "given_name": "John",
            "family_name": "Doe",
            "picture": "https://media.licdn-ei.com/dms/image/C5F03AQHqK8v7tB1HCQ/profile-displayphoto-shrink_100_100/0/",
            "locale": "en-US",
            "email": "doe@email.com",
            "email_verified": true
          }
          */

        // ADD LOGIC LATER
        return false;
      }
      // Otherwise 
      return true;
    },
    ...authConfig.callbacks,
  },
});