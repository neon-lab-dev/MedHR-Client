"use client";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "./Container";

const Footer = () => {
  // Define the array of other links

  const footerLinks = [
    // {
    //   heading: "Resources",
    //   links: [
    //     { name: "Privacy Policy", href: "/privacy-policy" },
    //     { name: "Terms of Use", href: "/terms-and-conditions" },
    //     { name: "Refund Policy", href: "/refund-policy" },
    //   ],
    // },
    {
      heading: "Company",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Use", href: "/terms-and-conditions" },
        { name: "Refund Policy", href: "/refund-policy" },
        { name: "About us", href: "/about-us" },
        { name: "Contact us", href: "/contact-us" },
      ],
    },
  ];

  const importantLinks = [
    {
      label: "Jobs",
      action: () => {
        window.location.href = "/jobs";
      },
    },
    {
      label: "Internships",
      action: () => {
        window.location.href = "/internships";
      },
    },
    {
      label: "Skill Programmes",
      action: () => {
        window.location.href = "/skill-programmes";
      },
    },
    {
      label: "Courses",
      action: () => {
        window.location.href = "/courses";
      },
    },
    {
      label: "Trending Today",
      action: () => {
        const section = document.getElementById("trending-today");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: "Events",
      action: () => {
        const section = document.getElementById("events");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const contactInfo = [
    // {
    //   icon: ICONS.locationFooter,
    //   text: "123 Digital Avenue San Francisco, CA 94103",
    // },
    {
      icon: ICONS.phoneFooter,
      text: "+918920968721",
      href: "tel:+918920968721",
    },
    {
      icon: ICONS.emailFooter,
      text: "info@medhrplus.com",
      href: "mailto:info@medhrplus.com",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: ICONS.facebook,
      href: "https://www.facebook.com/profile.php?id=61572524423643",
    },
    {
      name: "Instagram",
      icon: ICONS.instagram,
      href: "https://www.instagram.com/medhrplus/",
    },
  ];
  return (
    <div className="bg-secondary-900 font-plus-jakarta-sans py-10">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
          {/* Left side logo and description */}
          <div className="w-[500px] max-lg:w-[250px] flex flex-col gap-4 text-white">
            <Image src={IMAGES.careerHublogo} alt="logo" className=" w-64" />
            <p className="text-secondary-960">
              Our online portal is dedicated to empowering medical aspirants, students, and practitioners by enhancing their skills and connecting them with the best job opportunities in their local area. We aim to bridge the gap between learning and employment in the medical field.
            </p>

            <div className="flex items-center gap-5">
              {socialLinks?.map((item) => (
                <a
                  key={item?.name}
                  href={item?.href}
                  target="_blank"
                  className="size-10 rounded-full bg-secondary-960/60 flex items-center justify-center cursor-pointer hover:bg-primary-500 transition duration-300"
                >
                  <Image src={item?.icon} alt={item?.name} className="size-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Right side links */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            {footerLinks?.map((item) => (
              <div key={item?.heading} className="flex flex-col gap-1">
                <span className="text-white font-semibold text-[22px]">
                  {item?.heading}
                </span>
                <ul className="text-secondary-960 flex flex-col gap-4 mt-3">
                  {/* Using map to render other links */}
                  {item?.links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className="hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <span className="text-white font-semibold text-[22px]">
                Important
              </span>
              <div className="text-secondary-960 flex flex-col gap-4 mt-3">
                {importantLinks.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2 cursor-pointer"
                    onClick={item.action}
                  >
                    <span className="hover:underline">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-white font-semibold text-[22px]">
                Contact Info
              </span>
              <div className="text-secondary-960 flex flex-col gap-4 mt-3">
                {/* Using map to render other links */}
                {contactInfo?.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Image src={item?.icon} alt={""} className="size-5" />
                    <a
                      href={item?.href ? item?.href : "/"}
                      target="_blank"
                      className="hover:underline max-w-[200px]"
                    >
                      {item?.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="border border-secondary-960/40 w-full h-[2px] my-6" />

          {/* Copyright and scroll to top button */}
        <div className="flex items-center justify-between">
          <p className="text-secondary-960">@ All rights reserved by MedHr+</p>
          {/* Scroll to top button */}
          <button
            onClick={() => {
              const navbar = document.getElementById("navbar");
              if (navbar) {
                navbar.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="size-10 rounded-full bg-primary-500 flex items-center justify-center cursor-pointer hover:bg-primary-500 transition duration-300"
          >
            <Image
              src={ICONS.upArrow}
              alt=""
              className="size-5 animate-bounce"
            />
          </button>
        </div>
      </Container>
    </div>
  );
};
export default Footer;
