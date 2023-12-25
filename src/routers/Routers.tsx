import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Upload from "../page/Upload";
import Edit from "../page/Edit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: `/edit/:id`,
    element: <Edit/>
  }
]);
