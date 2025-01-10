"use client"; // This ensures that this component is a Client Component

import LoginForm from "../../components/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
