const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Proxy all requests starting with /api
    createProxyMiddleware({
      target: 'https://frontend-take-home-service.fetch.com',
      changeOrigin: true,
      secure: false, // Disable SSL verification if needed
      cookieDomainRewrite: 'localhost', // Rewrite cookie domain to localhost
    })
  );
};