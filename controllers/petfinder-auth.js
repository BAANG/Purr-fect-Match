var axios = require("axios")

// Petfinder credentials
var clientId = "ycqJ1y4t1txs2Tm7959XrLlxHNoEz0YNoCC5YIY8oIh3v46SYh"
var clientSecret = "1mqC7cVSodCsKMibLnziY3kAqpKkeNS3KwJJ9sEQ"

// Updated autorization header
var authorizationHeader = {
    Authorization: null
};

// Refresh the token in the autorization header
function refreshToken() {
    axios({
        url: "https://api.petfinder.com/v2/oauth2/token",
        method: "POST",
        data: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    }).then(function (response) {
        // Access token
        authorizationHeader.Authorization = `Bearer ${response.data.access_token}`;
        // Refresh again the token when it expires in millisecondes
        setTimeout(refreshToken, response.data.expires_in * 1000);
    });
}
// Jump start the token refresh
refreshToken()

module.exports = authorizationHeader;