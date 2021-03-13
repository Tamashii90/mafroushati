import React, { useState } from "react";
import EditingMode from "./Review/EditingMode";
import ViewingMode from "./Review/ViewingMode";

export default function Review({ review, prodId }) {
  const [editMode, setEditMode] = useState(false);
  if (editMode)
    return (
      <EditingMode prodId={prodId} review={review} setEditMode={setEditMode} />
    );
  return (
    <ViewingMode prodId={prodId} review={review} setEditMode={setEditMode} />
  );
}
