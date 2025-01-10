"use client"; // This ensures that this component is a Client Component

import SignupForm from "../../components/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <SignupForm />
    </div>
  );
}
