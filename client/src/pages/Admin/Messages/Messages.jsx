import { RiDeleteBack2Fill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { MessageApi } from "../../../context/ContextApi";
import "./Messages.scss";
import { TiTick } from "react-icons/ti";
import { Button } from "flowbite-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Messages() {
  const navigate = useNavigate()
  const { MessagesApiData, setMessagesApiData } = useContext(MessageApi);
  const handleDeleteMessage = (index) => {
    const updatedMessages = [...MessagesApiData];
    updatedMessages.splice(index, 1);
    setMessagesApiData(updatedMessages);
  };
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      navigate("/admin");
    }
  }, [navigate]);
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="Messages_admin-section">
      <div className="container max-w-[1320px]">
        <h2 className="title text-center mb-8 font-sans mt-16 font-bold text-4xl text-[#003E3C]">
          Messages
        </h2>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {MessagesApiData
                ? MessagesApiData.map((elem, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="w-[150px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {elem.name}
                      </th>
                      <td className="px-6 py-4 w-[150px]">{elem.email}</td>
                      <td className="px-6 py-4 w-[150px]">{elem.phone}</td>
                      <td className="px-6 py-4">{elem.message}</td>
                      <td className="px-6 py-4 w-[50px]">
                        <Button
                          onClick={() => {
                            axios.delete(
                              `http://localhost:1212/api/feedback/${elem._id}`
                            );
                            handleDeleteMessage(index);
                            toast("message has been answered!", {
                              icon: "✅",
                            });
                          }}
                          className="success-svg"
                          outline
                          color="success"
                        >
                          <TiTick style={{ fontSize: 20 }} />
                        </Button>
                      </td>
                      <td className="px-6 py-4 w-[50px]">
                        <Button
                          onClick={() => {
                            axios.delete(
                              `http://localhost:1212/api/feedback/${elem._id}`
                            );
                            handleDeleteMessage(index);
                            toast("Successfully deleted!", {
                              icon: "🗑️",
                            });
                          }}
                          outline
                          color="failure"
                        >
                          <RiDeleteBack2Fill
                            className="del-svg"
                            style={{ fontSize: 20 }}
                          />
                        </Button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Messages;
