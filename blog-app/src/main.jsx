import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import AdminLayout from "./AdminLayout";
import ViewAll from "./components/ViewAll";
import AddBlog from "./components/AddBlog";
import Admin from "./AdminLayout";
import RemoveBlogs from "./components/RemoveBlogs";
import EditBlog from "./components/EditBlog";
import EditForm from "./components/EditForm";
import EditBlogBase from "./EditBlogBase";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="Blog/:id" element={<BlogPage />} />
      <Route path="Admin" element={<AdminLayout />}>
        <Route path="ViewAll" element={<ViewAll />} />
        <Route path="AddBlog" element={<AddBlog />} />
        <Route path="RemoveBlog" element={<RemoveBlogs />} />
        <Route path="EditBlog" element={<EditBlogBase />}>
          <Route path="" element={<EditBlog />} />
          <Route path="Edit/:id" element={<EditForm />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
