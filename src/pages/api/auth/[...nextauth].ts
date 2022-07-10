import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { v4 as uuid } from 'uuid';
import { enviroment } from '@utils/enviroment';
import { mongoClient } from '@database/mongo';

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: enviroment.DISCORD_CLIENT_ID,
      clientSecret: enviroment.DISCORD_SECRET,
      authorization: { params: { scope: 'identify email connections guilds' } },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;

      return session;
    },
    async signIn({ account, profile, user }) {
      const { email } = user;
      const userAlredyExists = await mongoClient.collection('users').findOne({ email });
      if (userAlredyExists) {
        return true;
      }
      await mongoClient.collection('users').insertOne({
        id: uuid(),
        name: profile.username,
        email: profile.email,
        avatar: profile.image_url,
        accesToken: account.access_token,
        refreshToken: account.refresh_token,
      });
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});
