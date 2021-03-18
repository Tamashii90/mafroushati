import React, { useContext } from "react";
import { fetcher } from "../../utils";
import AuthContext from "../../context/AuthContext";
import { mutate } from "swr";
import InfoContext from "../../context/InfoContext";
import { MdModeEdit, MdDelete } from "react-icons/md";

export default function ViewingMode({ review, setEditMode, prodId }) {
  const [auth] = useContext(AuthContext);
  const [info, setInfo] = useContext(InfoContext);
  const { createdAt, updatedAt, user, content, featured } = review;
  const createDate = new Date(createdAt);
  const editDate = new Date(updatedAt);
  const displayDate = createDate.toISOString().slice(0, 10);
  const wasUpdated = (editDate - createDate) / 1000 > 120; // 2 minutes limit

  const deleteReview = async () => {
    if (confirm("Are you sure ?")) {
      try {
        await fetcher(`/api/review/${review._id}`, {
          method: "DELETE"
        });
        mutate(`/api/products/${prodId}`);
      } catch (err) {
        setInfo({ message: err.message, severity: "error" });
      }
    }
  };
  return (
    <div
      className="col-12 media mt-4 pb-4"
      style={{ borderBottom: "2px solid gray" }}
    >
      <div className="media-body row">
        <h3 className="col-6">{user}</h3>
        <p className="col-6 text-right">
          {displayDate}
          {wasUpdated && (
            <sup title={" Edited: " + editDate.toUTCString()}>
              <small>(edited)</small>
            </sup>
          )}
        </p>
        <p className="col-12 pt-2">{content}</p>
        <p className="col-6">
          {auth?.admin && `Featured: ${featured.toString()}`}
        </p>
        {(auth?.username === user || auth?.admin) && (
          <div className="col-6 text-right">
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => setEditMode(true)}
            >
              <MdModeEdit size="25px" color="#007bff" />
            </button>
            <button
              style={{ border: "none", background: "none" }}
              onClick={deleteReview}
            >
              <MdDelete size="25px" color="#007bff" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
