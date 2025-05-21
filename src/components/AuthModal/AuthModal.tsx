import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeAuthModal, setActiveTab } from "@/store/slices/authSlice";
import { IAuthTabs } from "@/types/auth";

const AuthModal = () => {
  const { isAuthModalOpen, authModalType, activeTab } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const tabButtons = ["Aspirants", "Organization"];
  return (
    <div
      onClick={() => dispatch(closeAuthModal())}
      className={`fixed top-0 left-0 z-[200000000] w-full h-screen flex items-center justify-center
    transition-all duration-300 bg-[#0000002a]
    ${
      isAuthModalOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`
      transition-all duration-300 transform
      ${isAuthModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
      ${
        authModalType === "OTP"
          ? "h-[375px] overflow-hidden"
          : authModalType === "FORGOT_PASSWORD"
          ? "h-[300px]"
          : authModalType === "CHANGE_PASSWORD"
          ? "h-[400px]"
          : authModalType === "CONFIRMATION_EMAIL"
          ? "h-[200px]"
          : "h-[550px]"
      }
      font-plus-jakarta-sans w-full max-w-[529px] absolute rounded-2xl bg-white p-6 text-center drop-shadow-2xl overflow-y-auto
    `}
      >
        <div>
          <h1 className=" text-secondary-800 text-[28px] font-bold text-center">
            <span className="bg-primary-500 px-2 text-white mr-3">
              {authModalType === "LOGIN"
                ? "Login"
                : authModalType === "SIGNUP"
                ? "Signup"
                : authModalType === "OTP"
                ? "OTP"
                : authModalType === "FORGOT_PASSWORD"
                ? "Forgot"
                : authModalType === "CONFIRMATION_EMAIL"
                ? "Forgot"
                : authModalType === "CHANGE_PASSWORD"
                ? "Change"
                : ""}
            </span>
            {
              authModalType === "OTP"
                ? "Your Email"
                : authModalType === "FORGOT_PASSWORD"
                ? "Password?"
                : authModalType === "CONFIRMATION_EMAIL"
                ? "Password?"
                : authModalType === "CHANGE_PASSWORD"
                ? "Password"
                : "to MeDHr+"

              // modalType === "OTP" ? "Your Email" : "to MeDHr+"
            }
          </h1>
        </div>

        <div className="flex flex-col gap-8 mt-8">
          {authModalType === "LOGIN" || authModalType === "SIGNUP" ? (
            <div className="">
              {/* Tab btn */}
              <div className="flex justify-between items-center rounded-lg border border-secondary-100 h-[50px]">
                {tabButtons?.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      dispatch(setActiveTab(btn as IAuthTabs));
                    }}
                    className={`text-base font-medium text-center flex-1 transition-all duration-300 h-12 rounded-lg cursor-pointer ${
                      activeTab === btn
                        ? "text-white bg-primary-500"
                        : "text-secondary-400 bg-white px-5 "
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {authModalType === "LOGIN" && <Login />}
          {(authModalType === "SIGNUP" || authModalType === "OTP") && (
            <Signup />
          )}
          {(authModalType === "FORGOT_PASSWORD" ||
            authModalType === "CONFIRMATION_EMAIL") && <ForgotPassword />}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
