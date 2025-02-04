import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SeminarsPage } from "@/pages/SeminarsPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
  NotFoundPage = "NotFoundPage",
  HomePage = "HomePage",
  SeminarsPage = "SeminarsPage",
}

export const RoutesPath: Record<AppRoutes, string> = {
  [AppRoutes.HomePage]: "/",
  [AppRoutes.SeminarsPage]: "/seminars",
  [AppRoutes.NotFoundPage]: "*",
};

export const RouteConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HomePage]: {
    path: RoutesPath.HomePage,
    element: <HomePage />,
  },
  [AppRoutes.SeminarsPage]: {
    path: RoutesPath.SeminarsPage,
    element: <SeminarsPage />,
  },
  [AppRoutes.NotFoundPage]: {
    path: RoutesPath.NotFoundPage,
    element: <NotFoundPage />,
  },
};
