import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type SignInFormProps = {
  role: string;
};

const SignInForm = ({ role }: SignInFormProps) => {
  const role_new = role.toLowerCase();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string>("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="shadow-md w-full bg-white rounded-2xl p-6">
      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setServerError(""); // Clear previous error
          try {
            const response = await fetch(`${BASE_URL}/auth/login/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            });

            const data = await response.json();

            if (response.ok) {
              // Save token securely
              localStorage.setItem("authToken", data.token);
              localStorage.setItem("userEmail", values.email);

              navigate(`/${role_new}`);
            } else {
              setServerError(data.detail || "Invalid email or password");
            }
          } catch (error) {
            console.error("Error during login:", error);
            setServerError("Something went wrong. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs sm:text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Icon
                  icon="mdi:email-outline"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Field
                  type="email"
                  name="email"
                  className="text-xs sm:text-sm w-full border-2 border-bgColor rounded-lg pl-10 pr-3 py-1 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs sm:text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Icon
                  icon="mdi:lock-outline"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="text-xs sm:text-sm w-full border-2 border-bgColor rounded-lg pl-10 pr-10 py-1 focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <Icon
                    icon={
                      showPassword
                        ? "mdi:eye-off-outline"
                        : "mdi:eye-outline"
                    }
                  />
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="text-xs sm:text-sm flex items-center justify-between gap-4 flex-wrap">
              <label className="flex items-center gap-2 text-bodyText">
                <Field type="checkbox" name="remember" className="w-4 h-4" />
                Remember me
              </label>
              <a href="/reset-password" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="text-red-500 text-xs sm:text-sm text-center mt-1">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-xs sm:text-sm w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="text-xs text-bodyText sm:text-sm pt-4 flex text-center justify-center">
        <p>
          Don’t have an account?{" "}
          <a href="/register" className="cursor-pointer text-primary">
            Create one here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
