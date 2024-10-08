import { useEffect, useState } from "react";

const AccountDetails = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Pobierz dane użytkownika z localStorage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const { firstName, lastName, email } = userData;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Account Details</h2>
      <div className="card p-4">
        <p>
          <strong>First Name:</strong> {firstName || "N/A"}
        </p>
        <p>
          <strong>Last Name:</strong> {lastName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {email || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default AccountDetails;
