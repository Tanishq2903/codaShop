import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Account = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  });
  return <div>
<p>account</p>
  </div>;
};

export default Account;
