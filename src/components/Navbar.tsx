"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/assets";
import Button from "./Button";
import AuthModal from "./AuthModal/AuthModal";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  openAuthModal,
  setEmployeeProfile,
  setEmployerProfile,
} from "@/store/slices/authSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleEmployeeLogoutService,
  handleEmployerLogoutService,
} from "@/api/authentication";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Container from "./Container";
 import Cookies from "js-cookie";

const pfileItems = [
  { text: "My Applications", href: "/applications" },
  { text: "Edit Resume", href: "/resume" },
];

const Navbar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      text: "Home",
      path : "/"
    },
    {
      text: "Internships",
      path : "/internships"
    },
    {
      text: "Jobs",
      path : "/jobs"
    },
    {
      text: "Skill Programmes",
      path : "/skill-programmes"
    },
    {
      text: "Courses",
      path : "/courses"
    },
  ];
  const { isAuthModalOpen, employerProfile, studentProfile } =
    useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();



const { mutate, isPending } = useMutation({
  mutationFn: handleEmployeeLogoutService,
  onSuccess: () => {
    toast.success("Logged out successfully");

    // ✅ Remove employee token
    Cookies.remove("employee_auth_token");

    queryClient.setQueryData(["student-profile"], null);
    dispatch(setEmployeeProfile(null));
    router.push("/");
  },
  onError: () => {
    toast.error("An error occurred while logging out!");
  },
});

const { mutate: employerMutate, isPending: isEmployerPending } = useMutation({
  mutationFn: handleEmployerLogoutService,
  onSuccess: () => {
    toast.success("Logged out successfully");

    // ✅ Remove employer token
    Cookies.remove("employeer_auth_token");

    queryClient.setQueryData(["employer-profile"], null);
    dispatch(setEmployerProfile(null));
    router.push("/");
  },
  onError: () => {
    toast.error("An error occurred while logging out!");
  },
});


  // close the sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  console.log(studentProfile);

  return (
    <Container>
      <div
        id="navbar"
        className="flex justify-between items-center bg-white py-6"
      >
        <div className="flex items-center gap-8 font-Poppins">
          <span className="text-3xl font-bold pr-6">
            <Link href="/">
              <Image
                src={IMAGES.careerHublogo}
                alt="logo"
                className="w-[220px] max-md:w-[120px]"
              />
            </Link>
          </span>
          <ul className="footer flex gap-8 max-xl:gap-2 text-base text-neutral-600 font-semibold max-lg:hidden font-poppins">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                href={item.path}
                className="hover:text-primary-500 transition duration-300 max-xl:text-[13px] cursor-pointer px-2 py-1 hover-item"
              >
                {item.text}
              </Link>
              <Link
                key={index}
                href={item.path}
                className="hover:text-primary-500 transition duration-300 max-xl:text-[13px] cursor-pointer px-2 py-1 hover-item2"
              >
                {item.text}
              </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4  font-plus-jakarta-sans max-lg:hidden">
          {!pathname.startsWith("/employer") ? (
            // student route
            <>
              {studentProfile ? (
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="  flex gap-1">
                    <div className="size-10 rounded-full border border-primary-500 text-primary-500 font-bold flex justify-center items-center">
                      <p>{studentProfile?.full_name[0]}</p>
                    </div>
                    {/* <Image src={IMAGES.profile} alt={""} /> */}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] mt-4 menu  shadow bg-base-100 rounded-box w-80"
                  >
                    <div className="flex flex-col px-2 py-2">
                      <span className=" font-bold">
                        {studentProfile.full_name}
                      </span>
                      <span>{studentProfile.email}</span>
                    </div>
                    <hr />
                    {/* profile links */}
                    {
                      <ul className="text-base text-neutral-600 font-medium">
                        {pfileItems.map((item, index) => (
                          <li
                            key={index}
                            className="hover:text-primary-500 py-0.5 font-bold"
                          >
                            <Link href={item.href}>
                              <div>{item.text}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    }
                    <hr />
                    <div className="flex justify-center">
                      <button
                        className=" text-center text-primary-500 text-xl flex justify-center py-2 w-full"
                        onClick={() => {
                          mutate();
                        }}
                      >
                        <span className=" text-center font-bold">
                          {isPending ? "Loading..." : "Logout"}
                        </span>
                      </button>
                    </div>
                  </ul>
                </div>
              ) : (
                <>
                  {employerProfile ? (
                    <Link href="/employer">
                      <Button className="py-2"> Dashboard</Button>
                    </Link>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          dispatch(openAuthModal("LOGIN"));
                        }}
                        variant="natural"
                        className="text-base bg-neutral-100 rounded-lg px-6 font-semibold py-2"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => {
                          dispatch(openAuthModal("SIGNUP"));
                        }}
                        variant="normal"
                      >
                        SignUp
                      </Button>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            // employer route
            <>
              {employerProfile ? (
                <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                  <div tabIndex={0} role="button" className="  flex gap-1">
                    <div className="size-10 rounded-full border border-primary-500 text-primary-500 font-bold flex justify-center items-center">
                      <p>{employerProfile?.full_name[0]}</p>
                    </div>
                    {/* <Image src={IMAGES.profile} alt={""} /> */}

                    <Image
                      src={IMAGES.down}
                      alt={""}
                      className=" hover:rotate-180 transition-transform duration-00"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] mt-4 menu  shadow bg-base-100 rounded-box w-80"
                  >
                    <div className="flex flex-col px-2 py-2">
                      <span className=" font-bold">
                        {employerProfile?.full_name}
                      </span>
                      <span>{employerProfile?.email}</span>
                    </div>
                    <hr />
                    <hr />
                    <div className="flex justify-center">
                      <button
                        className=" text-center text-primary-500 text-xl flex justify-center py-2 w-full"
                        onClick={() => {
                          employerMutate();
                        }}
                      >
                        <span className=" text-center font-bold">
                          {isEmployerPending ? "Loading..." : "Logout"}
                        </span>
                      </button>
                    </div>
                  </ul>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      dispatch(openAuthModal("LOGIN"));
                    }}
                    variant="natural"
                    className="text-base bg-neutral-100 rounded-lg px-6 font-semibold py-2"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(openAuthModal("SIGNUP"));
                    }}
                    variant="normal"
                  >
                    SignUp
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <div className="relative lg:hidden">
          <div className="flex items-center gap-4">
            {!studentProfile && (
              <Button
                variant="normal"
                onClick={() => {
                  dispatch(openAuthModal("SIGNUP"));
                }}
              >
                Register
              </Button>
            )}
            <button
              onClick={() => {
                setIsMobileSidebarOpen((prev) => !prev);
              }}
              className="block lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              <Image src={IMAGES.hamburger} alt="Menu" width={24} height={24} />
            </button>
          </div>

          <div
            className={`fixed bg-white w-[350px] h-screen overflow-hidden transition-transform flex flex-col gap-4 top-0 right-0 z-50 lg:hidden pt-4 px-6 ${
              isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={() => {
                setIsMobileSidebarOpen(false);
              }}
              className=" mx-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close menu"
            >
              <Image src={IMAGES.close} alt="Close" width={24} height={24} />
            </button>
            {studentProfile && (
              <div className="flex  items-center gap-1 py-1">
                <div className="size-10 rounded-full border border-primary-500 text-primary-500 font-bold flex justify-center items-center">
                  <p>{studentProfile?.full_name[0]}</p>
                </div>
                <div className="flex flex-col">
                  <span className=" font-bold">{studentProfile?.full_name}</span>
                  <span>{studentProfile?.email}</span>
                </div>
              </div>
            )}
            <hr />
            <ul className="flex flex-col gap-8 max-xl:gap-2 text-base text-neutral-600 font-semibold font-poppins">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="hover:text-primary-500 transition duration-300 cursor-pointer px-2 py-1"
                >
                  {item.text}
                </Link>
              ))}
            </ul>

            <hr />
            <ul className="flex flex-col gap-8 max-xl:gap-2 text-base text-neutral-600 font-semibold font-poppins">
              {studentProfile &&
                pfileItems.map((item, index) => (
                  <li
                    key={index}
                     className="hover:text-primary-500 transition duration-300 cursor-pointer px-2 py-1"
                  >
                    <Link href={item.href}>
                      <div>{item.text}</div>
                    </Link>
                  </li>
                ))}
            </ul>
            <div className=" absolute bottom-0 w-full">
              <hr />
              {studentProfile && (
                <button
                  onClick={() => {
                    mutate();
                  }}
                  className=" text-center text-primary-500 text-xl flex justify-center pl-36 py-4 cursor-pointer"
                >
                  <span className=" text-center font-bold">
                    {isPending ? "Loading..." : "Logout"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isAuthModalOpen && <AuthModal />}
    </Container>
  );
};

export default Navbar;
