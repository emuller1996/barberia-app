import { useContext, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { postLoginService } from "../../services/auth.services";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/logo.png";
export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [, setTokenAccess] = useLocalStorage("tokenAccess", null);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [ResponseMenssage, setResponseMenssage] = useState(null);

  const { setToken } = useContext(AuthContext);

  
  const onSubmit = async (data) => {
    console.log(data);
    setisLoading(true);
    setResponseMenssage(null);
    try {
      const r = await postLoginService(data);

      console.log(r.data);
      setTokenAccess(r.data.token);
      setToken(r.data.token);
      setisLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setisLoading(false);

      if (error.response.status === 403) {
        setResponseMenssage(error.response.data.message);
      }
    }
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-16 h-16 mr-2" src={logo} alt="logo" />
          Admin Login
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo Electronico
                </label>
                <input
                  type="text"
                  name="username"
                  {...register("username", { required: true })}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="admin@correo.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {ResponseMenssage && (
                <div className="border text-center rounded-lg py-3 border-yellow-200 bg-yellow-50">
                  <span>{ResponseMenssage}</span>
                </div>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  {isLoading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    `Entrar`
                  )}
                </button>
              </div>

              <hr />
            
            

              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                
                <Link
                  to={"/"}
                  className="font-semibold text-center text-green-400 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Home
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
