const crypto = require("crypto");
const { getSecretFromDB } = require("./mockDb");

const generateToken = async (email) => {
  try {
    const secret = await getSecretFromDB();
    //checking if secret is availible 
    if(!secret){
      throw new Error("No secret for token generation");
    }

    return crypto
      .createHmac("sha256", secret)
      .update(email)
      .digest("base64");
  } catch (error) {
    // THE BUG: Empty catch block.
    // Error is swallowed and undefined is returned.
    //catch box error fixing 
    console.error("[generateToken] failed" , error.message || error);
    return null;
  }
};

module.exports = { generateToken };
