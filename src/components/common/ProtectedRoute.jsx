'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../../store/index.js";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, setState } = useStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setState({ accessToken: token });
    }
    queueMicrotask(() => setChecking(false));
  }, [setState]);

  useEffect(() => {
    if (!checking && !isAuthenticated) {
      router.replace('/login');
    }
  }, [checking, isAuthenticated, router]);

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        در حال بررسی...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
