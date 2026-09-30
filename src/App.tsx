import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";

/**
 * Top-level app — composition root.
 * Keeps router wiring in one place; layout chrome (GovtMasthead / Sidebar)
 * lives in AppShell so the landing gallery stays standalone.
 * BrowserRouter + Routes would also satisfy the spec; RouterProvider + createBrowserRouter is equivalent.
 */
export default function App() {
  return <RouterProvider router={router} />;
}
