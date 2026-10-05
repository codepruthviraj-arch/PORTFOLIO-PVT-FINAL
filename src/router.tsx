import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();
  const pageLoadId = typeof window === "undefined" ? "server" : `${Date.now()}-${Math.random()}`;

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    getScrollRestorationKey: (location) => `${pageLoadId}:${location.href}`,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
