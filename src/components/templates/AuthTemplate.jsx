import React from "react";
import LoginForm from "../organisms/LoginForm";

const AuthTemplate = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-md rounded p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthTemplate; 