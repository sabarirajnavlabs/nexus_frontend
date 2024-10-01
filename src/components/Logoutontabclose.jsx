"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";

const LogoutOnTabClose = () => {
  const { signOut } = useClerk();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      signOut();
      // event.preventDefault();
      // event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [signOut]);

  return null;
};

export default LogoutOnTabClose;
