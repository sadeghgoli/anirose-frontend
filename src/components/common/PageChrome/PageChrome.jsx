"use client";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";

const HIDE_CHROME_PATHS = new Set(["/login"]);

const PageChrome = ({ children }) => {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME_PATHS.has(pathname);

  return (
    <>
      {!hideChrome && (
        <Suspense fallback={null}>
          <Header />
        </Suspense>
      )}
      <main>{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
};

export default PageChrome;
