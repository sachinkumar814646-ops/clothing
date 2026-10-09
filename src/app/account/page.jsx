"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "services/api/account";
import { Eye, EyeOff } from "lucide-react";

export default function AccountPage() {
  const [mode, setMode] = useState("login"); // login or register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const handleLogin = async () => {
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const res = await loginUser({ email, password });

    if (!res || !res.status) {
      setError(res?.message || "Login failed");
      setLoading(false);
      return;
    }

    localStorage.setItem("authToken", res.token);
    localStorage.setItem("authUserId", res.user.id);
    localStorage.setItem("authUser", JSON.stringify(res.user) );

    setSuccess("Login successful!");

    // ✅ redirect
    window.location.href = "/";

  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

const handleRegister = async () => {
  if (!firstName || !lastName || !email || !password || !phone || !confirmPassword) {
    setError("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const payload = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      password,
      confirm_password: confirmPassword,
      login_type: "email",
    };

    const res = await registerUser(payload);

    if (!res || !res.success) {
      setError(res?.message || "Registration failed");
      return;
    }


    setSuccess("Registration successful!");
    localStorage.setItem("authToken", res.token);
    localStorage.setItem("authUserId", res.user.id);
    localStorage.setItem("authUser", JSON.stringify(res.user) );

    // ✅ redirect
    window.location.href = "/";

  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="font-display text-4xl font-light text-center mb-2 text-charcoal">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="font-body text-xs tracking-editorial text-stone text-center mb-10">
            {mode === "login"
              ? "SIGN IN TO YOUR COOMBB ACCOUNT"
              : "JOIN THE INNER CIRCLE"}
          </p>

          <div className="flex mb-8 border border-bone">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 font-body text-xs tracking-editorial transition-colors ${
                mode === "login" ? "bg-pinked text-white" : "text-stone hover:text-charcoal"
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-3 font-body text-xs tracking-editorial transition-colors ${
                mode === "register" ? "bg-pinked text-white" : "text-stone hover:text-charcoal"
              }`}
            >
              REGISTER
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === "register" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border px-4 py-3 w-full"
                />
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border px-4 py-3 w-full"
                />
              </div>

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-4 py-3"
              />

            </>
          )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-bone px-4 py-3 pr-10 font-body text-sm focus:outline-none focus:border-charcoal"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>


            {mode === "register" && (
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border px-4 py-3 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            {/* {mode === "login" && (
              <div className="text-right">
                <a href="#" className="font-body text-xs text-stone hover:text-charcoal hover-underline">
                  Forgot password?
                </a>
              </div>
            )} */}

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              type="button"
              onClick={mode === "login" ? handleLogin : handleRegister}
              className="w-full font-body text-xs tracking-editorial py-4 bg-pinked text-white hover:bg-pinked/90 transition-colors mt-2"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "SIGN IN"
                : "CREATE ACCOUNT"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}