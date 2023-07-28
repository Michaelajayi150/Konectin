import { Outlet } from "react-router-dom";
// import CTASection from "./cta";
import "./index.css";

function Blog() {
  return (
    <main className="bg-neutral-900">
      <section className="w-11/12 mx-auto max-w-screen-xl flex flex-col gap-16 items-center">
        <Outlet />
        {/* <CTASection /> */}
      </section>
    </main>
  );
}

export default Blog;
