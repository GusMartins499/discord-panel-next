import NextAuth from 'next-auth';
import DiscordProvider from "next-auth/providers/discord"
import { enviroment } from '../../../utils/enviroment';

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: enviroment.DISCORD_CLIENT_ID,
      clientSecret: enviroment.DISCORD_SECRET,
    }),
  ],
  
});