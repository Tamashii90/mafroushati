const ParcelProxyServer = require("parcel-proxy-server");

// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint: "./index.html",
  parcelOptions: {
    sourceMaps: false
  },
  proxies: {
    "/products": {
      target: "http://localhost:3000"
    },
    "/products/*": {
      target: "http://localhost:3000"
    },
    "/category/*": {
      target: "http://localhost:3000"
    },
    "/review/*": {
      target: "http://localhost:3000"
    },
    "/current_user": {
      target: "http://localhost:3000"
    },
    "/admin": {
      target: "http://localhost:3000"
    },
    "/logout": {
      target: "http://localhost:3000"
    },
    "/login/test": {
      target: "http://localhost:3000"
    },
    "/register/test": {
      target: "http://localhost:3000"
    },
    "/cart": {
      target: "http://localhost:3000"
    },
    "/cart/checkout": {
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
