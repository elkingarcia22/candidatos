import { createBrowserRouter } from "react-router";
import { CandidateListPage } from "./pages/CandidateListPage";
import { JobPage } from "./pages/JobPage";
import { CandidatesDashboardPage } from "./pages/CandidatesDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CandidatesDashboardPage,
  },
  {
    path: "/vacante",
    Component: JobPage,
  },
  {
    path: "/candidatos",
    Component: CandidateListPage,
  },
  {
    path: "/candidatos/candidato/:id",
    Component: CandidateListPage,
  },
  {
    path: "*",
    Component: CandidatesDashboardPage,
  },
]);