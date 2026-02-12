const { generateToken } = require("./utils/tokenGenerator");

(async () => {
  const t = await generateToken("user@example.com");
  console.log("token:", t);
})();
