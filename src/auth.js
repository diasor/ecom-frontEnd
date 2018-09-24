import auth0 from 'auth0-js';
import Vue from 'vue';

const AUTH0_CLIENT_ID = 'D2T6Bi4ONMetqDACI4OPq2x9uLZ1jrJj';

const webAuth = new auth0.WebAuth({
  domain: 'ecom-dsor.eu.auth0.com',
  clientID: AUTH0_CLIENT_ID,
  redirectUri: 'http://localhost:8080/callback',
  audience: 'https://ecom-dsor.eu.auth0.com/api/v2/',
  responseType: 'token id_token',
  scope: 'openid profile',
});

const auth = new Vue({
  computed: {
    token: {
      get () {
        return localStorage.getItem('id_token');
      },
      set (idToken) {
        localStorage.setItem('id_token', idToken);
      },
    },
    accessToken: {
      get () {
        return localStorage.getItem('access_token');
      },
      set (accessToken) {
        localStorage.setItem('access_token', accessToken);
      },
    },
    expiresAt: {
      get () {
        return localStorage.getItem('expires_at');
      },
      set (expiresIn) {
        const now = (new Date()).getTime();
        const expires = expiresIn * 1000;
        const expiresAt = JSON.stringify(expires + now);
        localStorage.setItem('expires_at', expiresAt);
      },
    },
    user: {
      get () {
        return JSON.parse(localStorage.getItem('user'));
      },
      set (user) {
        console.log('user', user);
        localStorage.setItem('user', JSON.stringify(user));
      },
    },
  },
  methods: {
    login () {
      // redirects the user to our Auth0 hosted page where they will be able to login.
      webAuth.authorize();
    },
    logout () {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('user');
      webAuth.logout({
        returnTo: 'http://localhost:8080/',
        client_id: AUTH0_CLIENT_ID,
      });
    },
    isAuthenticated () {
      // const now = (new Date()).getTime();
      // const isAuth = (now < this.expiresAt);
      return (!!localStorage.getItem('id_token'));
    },
    handleAuthentication () {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn;
            this.accessToken = authResult.accessToken;
            this.token = authResult.idToken;
            this.user = authResult.idTokenPayload;
            resolve(authResult);
          } else if (err) {
            this.logout();
            reject(err);
          }
        });
      });
    },
  },
});

export function requireAuth (to, from, next) {
  const idToken = localStorage.getItem('id_token');
  const isLoggedIn = !!idToken;
  if (!isLoggedIn) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}

export default {
  install (Vue) {
    Vue.prototype.$auth = auth;
  },
};
