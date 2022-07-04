const enviroment = {
  DISCORD_CLIENT_ID: String(process.env.DISCORD_CLIENT_ID),
  DISCORD_SECRET: String(process.env.DISCORD_SECRET),
  MONGODB_USER: String(process.env.MONGODB_USER),
  MONGODB_PASSWORD: String(process.env.MONGODB_PASSWORD),
  MONGODB_DATABASE: String(process.env.MONGODB_DATABASE),
  MONGODB_URL: String(process.env.MONGODB_URL),
};

export { enviroment };
