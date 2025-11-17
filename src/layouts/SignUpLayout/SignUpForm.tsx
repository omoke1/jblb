import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="shadow-md w-full bg-white rounded-2xl p-6">
      

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          remember: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form data", { ...values, phone: `+234${values.phone}` });
          navigate("/login");
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-5">
            {/* First Name */}
            <div>
              <label className="text-xs sm:text-sm font-medium">First Name</label>
              <Field
                type="text"
                name="firstName"
                className="text-xs sm:text-sm w-full border-2 border-bgColor rounded-lg px-3 py-1 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-xs sm:text-sm font-medium">Last Name</label>
              <Field
                type="text"
                name="lastName"
                className="text-xs sm:text-sm w-full border-2 border-bgColor rounded-lg px-3 py-1 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs sm:text-sm font-medium">Email Address</label>
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
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs sm:text-sm font-medium">Phone Number</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-400">
                  +234
                </span>
                <Field
                  type="tel"
                  name="phone"
                  maxLength={10} // Restrict input to 10 digits
                  onChange={(e:any) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                    if (value.length <= 10) {
                      setFieldValue("phone", value);
                    }
                  }}
                  value={values.phone}
                  className="text-xs sm:text-sm w-full border-2 border-bgColor rounded-lg pl-12 pr-3 py-1 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs sm:text-sm font-medium">Password</label>
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
                  <Icon icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} />
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs sm:text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Icon
                  icon="mdi:lock-check-outline"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="text-xs sm:text-sm w-full border-2 border-bgColor rounded-lg pl-10 pr-10 py-1 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Remember me & Terms */}
            <div className="text-xs sm:text-sm flex items-center  gap-4 flex-wrap">
              <label className="flex items-center gap-2 text-bodyText">
                <Field type="checkbox" name="remember" className="w-4 h-4" />
              </label>
              <p>
                I agree to the <span className="text-primary cursor-pointer" onClick={() => setIsPopupOpen(true)}>Terms of Service</span> and{" "}
                <span className="text-primary cursor-pointer" onClick={() => setIsPopupOpen2(true)}>Privacy Policy</span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="text-xs sm:text-sm w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-xs text-bodyText sm:text-sm pt-4 flex text-center justify-center">
        <p>
          Already have an account?{" "}
          <a href="/login" className="cursor-pointer text-primary">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;