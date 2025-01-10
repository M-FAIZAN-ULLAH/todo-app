"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("../../components/dashboard"),
  { ssr: false } // This ensures the component is rendered only on the client side
);

import React from "react";

function page() {
  return <Dashboard />;
}

export default page;
