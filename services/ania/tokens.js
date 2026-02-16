// Token
const tokens = {
  pfToken: "",
  wsToken: "",
};

module.exports = {
  // Set tokens
  setAniaTokens: (newTokens) => {
    tokens.pfToken = newTokens.pfToken;
    tokens.wsToken = newTokens.wsToken;
  },

  // Get tokens
  getAniaTokens: () => {
    return tokens;
  },
};
