const parseEnv = () => {
  const envKeys = Object.keys(process.env);
  const rssKeys = envKeys.filter((key) => key.startsWith("RSS_"));
  rssKeys.forEach((key) => {
    console.log(`${key}=${process.env[key]}`);
  });
};

parseEnv();
