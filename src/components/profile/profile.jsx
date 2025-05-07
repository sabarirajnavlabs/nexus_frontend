"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useClerk, useUser } from "@clerk/clerk-react";
import Cookies from "js-cookie";

const Profile = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    avatar: "/const_profile.png",
    email: "",
    phone_number: "",
    program_name: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        phone_number: user.primaryPhoneNumber || "",
        program_name: user.program_name || "",
        avatar: user.avatar || "/const_profile.png",
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Token: Cookies.get("__session") || "",
        },
        body: JSON.stringify({
          avatar: profile.avatar,
          phone_number: profile.phone_number,
          program_name: profile.program_name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      alert("Profile updated successfully!"); // Optional: feedback for successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile."); // Optional: feedback for failure
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#181818] text-white" : "bg-white text-black"
      } p-6 rounded-lg shadow-lg mt-10`}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
          <Image
            src={profile.avatar}
            alt={`${profile.first_name} ${profile.last_name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="ml-6 mt-4 md:mt-0">
          {/* Form Inputs */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={profile.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              className="w-full p-2 rounded border"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={profile.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              className="w-full p-2 rounded border"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              className="w-full p-2 rounded border"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={profile.phone_number}
              onChange={(e) =>
                handleInputChange("phone_number", e.target.value)
              }
              className="w-full p-2 rounded border"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Program Name
            </label>
            <input
              type="text"
              value={profile.program_name}
              onChange={(e) =>
                handleInputChange("program_name", e.target.value)
              }
              className="w-full p-2 rounded border"
            />
          </div>
          <button
            onClick={handleSubmit}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
