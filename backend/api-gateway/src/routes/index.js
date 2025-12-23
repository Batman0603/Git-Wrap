import { createProxyMiddleware } from "http-proxy-middleware";
import { services } from "../config/services.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const registerRoutes = (app) => {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: services.auth,
      changeOrigin: true,
      pathRewrite: {
        "^/auth": ""
      },
      onProxyReq: (proxyReq, req) => {
        if (req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
      proxyTimeout: 5000,
      timeout: 5000
    })
  );


  // Recommendation service (JWT required)
  app.use(
    "/recommend",
    authenticate,
    createProxyMiddleware({
      target: services.recommendation,
      changeOrigin: true,
      pathRewrite: {
        "^/recommend": ""
      }
    })
  );

  // Vector service (JWT required)
  app.use(
    "/vector",
    authenticate,
    createProxyMiddleware({
      target: services.vector,
      changeOrigin: true,
      pathRewrite: {
        "^/vector": ""
      }
    })
  );
};
