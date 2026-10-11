"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#0f172a",
          color: "#f8fafc",
          borderRadius: "1rem",
          padding: "12px 18px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff"
          }
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff"
          }
        }
      }}
    />
  );
}
