const ParcelProxyServer = require("parcel-proxy-server");

// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint: "./index.html",
  parcelOptions: {
    sourceMaps: false
  },
  proxies: {
    "/api/products": {
      target: "http://localhost:3000"
    },
    "/api/products/*": {
      target: "http://localhost:3000"
    },
    "/api/category/*": {
      target: "http://localhost:3000"
    },
    "/api/review/*": {
      target: "http://localhost:3000"
    },
    "/api/current_user": {
      target: "http://localhost:3000"
    },
    "/admin": {
      target: "http://localhost:3000"
    },
    "/api/logout": {
      target: "http://localhost:3000"
    },
    "/api/login/test": {
      target: "http://localhost:3000"
    },
    "/api/register/test": {
      target: "http://localhost:3000"
    },
    "/api/cart": {
      target: "http://localhost:3000"
    },
    "/api/cart/checkout": {
      target: "http://localhost:3000"
    },
    "/api/search": {
      target: "http://localhost:3000"
    },
    "/images/logo.png": {
      target: "http://localhost:3000"
    }
  }
});

// the underlying parcel bundler is exposed on the server
// and can be used if needed
server.bundler.on("buildEnd", () => {
  console.log("Build completed!");
});

// start up the server
server.listen(5000, () => {
  console.log("Parcel proxy server has started");
});
