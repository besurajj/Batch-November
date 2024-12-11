import React from "react";
import { apiUrl } from "../constants/Constant";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonLoading from "../constants/Loading/SkeletonLoading";
import TableRow from "../components/TableRow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssueBook } from "../Api/Api";
import { toast } from "react-toastify";
import axios from "axios";

// import { throttle } from "../constants/Constant";
const IssuedBooks = () => {
  const queryClient = useQueryClient();
  const { data, isError, error, Loading } = useQuery({
    queryKey: ["issueBook"],
    queryFn: getIssueBook,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
    onSuccess: () => {
      queryClient.invalidateQueries(["returnBook"]);
    },
    // throwOnError: (error) => {
    //   debugger
    //   console.log("this is api error ", error);
    // },
  });

  if (isError) {
    console.log("errorr occoure whiule fetching api issue book " + error);
  }

  const jwtToken = localStorage.getItem("token");

  const {
    mutate,
    isError: isReturnError,
    status,
    error: isReturnErr,
  } = useMutation({
    queryKey: ["returnBook"],
    mutationFn: async (id) => {
      // console.log(":::::::::", id);
      const response = await axios.post(
        `http://${apiUrl}/issues/returnBook`,
        {
          issueId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("this is response............ ", response);
      return response.json;
    },
    onSuccess: () => {
      toast.success("Book returned successfully!");
      queryClient.invalidateQueries(["issueBook"]);
    },
  });

  if (isReturnErr || isReturnError) {
    toast.error(`${isReturnErr?.response?.data?.message} `);
  }
  if (status === "error") {
    console.log("statussssss........", status);
  }

  // const throttleReturn = throttle((id) => {
  //   return fetchReturn(id);
  // });
  return (
    <>
      {Loading ? (
        <SkeletonLoading />
      ) : (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Issued Books</h2>

          {data && data.length > 0 ? (
            <table className="min-w-full text-left text-sm border border-gray-200 bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="text-center">
                  <th className="px-4 py-2 text-lg">#</th>
                  <th className="px-4 py-2 text-lg">Book Name</th>
                  <th className="px-4 py-2 text-lg">Issue Date</th>
                  <th className="px-4 py-2 text-lg">Issue Time</th>
                  <th className="px-4 py-2 text-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((book, idx) => (
                  <TableRow
                    key={book.id}
                    bookName={book.Book.name}
                    book={book}
                    idx={idx}
                    onClick={() => {
                      // console.log("Button clicked for book ID:", book.id);
                      mutate(book.id);
                    }}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <SkeletonLoading />
          )}
        </div>
      )}
    </>
  );
};

export default IssuedBooks;
