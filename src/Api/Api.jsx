import axios from "axios";
import { apiUrl } from "../constants/Constant";
import { decodeToken } from "../constants/Jwt-Decode";
const jwtToken = localStorage.getItem("token");

const getIssueBook = async () => {
  const userId = decodeToken(jwtToken).data.id;
  const response = await fetch(
    `http://${apiUrl}/issues/userIssuedBooks/${userId}`,

    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const issueBookData = await response.json();

  //   console.log("issuee bookkkkkkkkkkkk ", issueBookData.issues);
  return issueBookData.issues;
};

const fetchPayFine = async (id, fine) => {
  // console.log("fine................", fine);

  const response = await axios.post(
    `http://${apiUrl}/issues/payfine/${id}`,
    {
      issueId: id,
      fine: fine,
    },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  //     if (response.status === 200) {
  //       setFineMessage(response?.data);
  //       toast.success(response?.data.message);
  //     }
  //   } catch (err) {
  //     if (err.status === 400) {
  //       toast.error(err.response.data.message);
  //     }
  //     if (err.response.data.message === "jwt expired") {
  //       localStorage.clear();
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 3000);
  //       console.error("Response Data:", err.response.data);
  //       // toast.error(err.response.message || "Something went wrong!");
  //     }
  //   }
  const payFineData = response.json();
  //   console.log("this is response of payfine api ", response);
  return payFineData;
};

export { fetchPayFine, getIssueBook };
