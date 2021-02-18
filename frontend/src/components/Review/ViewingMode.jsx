import React, { useContext, useState } from "react";
import { fetcher } from "../../utils";
import AuthContext from "../../context/AuthContext";
import { mutate } from "swr";
import MySnackBar from "../MySnackbar";

const ViewingMode = ({ review, setEditMode, prodId }) => {
  const [auth] = useContext(AuthContext);
  const [info, setInfo] = useState({ message: "", severity: "info" });
  const { createdAt, updatedAt, user, content, featured } = review;
  const createDate = new Date(createdAt);
  const editDate = new Date(updatedAt);
  const displayDate = createDate.toISOString().slice(0, 10);
  const wasUpdated = (editDate - createDate) / 1000 > 120; // 2 minutes limit

  const deleteReview = async () => {
    if (confirm("Are you sure ?")) {
      try {
        await fetcher(`/review/${review._id}`, {
          method: "DELETE"
        });
        mutate(`/products/${prodId}`);
      } catch (err) {
        setInfo({ message: err.message, severity: "error" });
      }
    }
  };
  return (
    <div className="col-12 media mt-4">
      {info.message && <MySnackBar info={info} setInfo={setInfo} />}
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
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={deleteReview}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewingMode;
