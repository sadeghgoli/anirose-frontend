"use client";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useStore from "../src/store/index.js";
import { setAuthToken } from "../src/api/axios.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { SkeletonProvider } from "../src/components/skeleton/MainSkeleton/MainSkeleton.jsx";
import ScrollToTop from "../src/components/common/ScrollToTop";
import { initAnalytics, AnalyticsCore, AnalyticsSender, TimeTracker } from "../src/utils/analytics/index.js";

const queryClient = new QueryClient();

function Authorize({ children }) {
  const { setState } = useStore();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setState({ accessToken: token });
    }
  }, [setState]);

  return <>{children}</>;
}

function AnalyticsInit() {
  const pathname = usePathname();
  const trackedPath = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    initAnalytics();
    AnalyticsSender.sendData;
    TimeTracker.startTracking;
    trackedPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (trackedPath.current === null || trackedPath.current === pathname) return;
    AnalyticsCore.addPageView(pathname);
    trackedPath.current = pathname;
  }, [pathname]);

  return null;
}

export default function ClientLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonProvider>
        <Authorize>
          <AnalyticsInit />
          <ScrollToTop />
          {children}
          <ToastContainer />
        </Authorize>
      </SkeletonProvider>
    </QueryClientProvider>
  );
}
