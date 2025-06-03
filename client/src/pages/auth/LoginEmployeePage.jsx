
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormField from "../../components/FormField";

const LoginEmployee = () => {
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid"
      )
      .required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="w-screen h-screen bg-white flex justify-center ">
      <div className="w-[25vw] h-fit flex flex-col border shadow border-slate-200 py-2 px-4 mt-[20vh]">
        <Link
          to="/"
          className="font-semibold w-full text-left text-sm flex gap-1 items-center"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
        <div className="w-full text-center space-y-2">
          <h2 className="font-bold text-xl">Sign In</h2>
          <p className="text-sm text-slate-400">
            Please enter your email to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit()} className="w-full">
          <FormField
            className="mb-5"
            name="email"
            Icon={Mail}
            error={errors.email}
            control={control}
            type="text"
            placeholder="Your Email Address"
          />
          <button
            className="bg-blue-500 text-white w-full rounded mt-7 py-1 hover:cursor-pointer "
            type="submit"
          >
            Next
          </button>
        </form>
       
        <p className="text-xs text-slate-400 w-full text-center mt-2">
          passwordless authentication methods.
        </p>
        <div className="w-full flex gap-1 text-sm mt-9">
          <p className="text-slate-500">Don&apos;t having account?</p>
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginEmployee;
