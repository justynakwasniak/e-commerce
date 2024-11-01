import { useUser } from "../context/UserContext";

const AccountDetails = () => {
  const { user } = useUser();

  if (!user) {
    return <p>Please log in to view your account details.</p>;
  }

  const { firstName, lastName, email } = user;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Account Details</h2>
      <div className="card p-4 mx-auto" style={{ width: "50%" }}>
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
