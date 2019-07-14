userLog = [];

var oktaSignIn = new OktaSignIn({
    baseUrl: "https://dev-951880.okta.com/",
    clientId: "0oaw0s1jmw5VVEgYc356",
    authParams: {
        issuer: "https://dev-951880.okta.com/oauth2/default",
        responseType: ['token', 'id_token'],
        display: 'page',
        idps: [
            {type: 'GOOGLE', id: '0oaw0jvevnYiVK0K5356'}
        ]
    }
});

if (oktaSignIn.token.hasTokensInUrl()) {
    oktaSignIn.token.parseTokensFromUrl(
        function success(res) {
            // The tokens are returned in the order requested by `responseType` above
            console.log(res)
            var accessToken = res[0];
            var idToken = res[1]

            userLog.push(idToken.claims.email)

            // Say hello to the person who just signed in:
            console.log('Hello, ' + idToken.claims.email);
            if (window.location.pathname === '/') {
                window.location.replace(window.location.origin + '/main')
            }

            // Save the tokens for later use, e.g. if the page gets refreshed:
            oktaSignIn.tokenManager.add('accessToken', accessToken);
            oktaSignIn.tokenManager.add('idToken', idToken);

            // Remove the tokens from the window location hash
            window.location.hash = '';
        },
        function error(err) {
            // handle errors as needed
            console.error(err);
        }
    );
} else {
    oktaSignIn.session.get(function (res) {
        // Session exists, show logged in state.
        if (res.status === 'ACTIVE') {
            console.log('Welcome back, ' + res.login);
            console.log(res.userId, "is the userId")

            var newUser = { // Creates user object to be sent to database
                userId: res.userId,
                login: res.login,
                location: null,
                favorites: null,
                preferences: null,
                has_preferences: false
            }
            // TODO: Create conditional statement to prevent duplicate users from being created.
                // ie. Check for user with unique userId and only create user if it doesn't exist. 
            $.post("/api/users/" + res.userId, newUser, function(data) {
                console.log(data)
            })

            if (window.location.pathname === '/') {
                window.location.replace(window.location.origin + '/main')
            }
            return;
        }
        // No session, show the login form
        oktaSignIn.renderEl(
            { el: '#okta-login-container' },
            function success(res) {
                // Nothing to do in this case, the widget will automatically redirect
                // the user to Okta for authentication, then back to this page if successful
            },
            function error(err) {
                // handle errors as needed
                console.error(err);
            }
        );
    });
}

