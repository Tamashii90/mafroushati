import React from "react";
import { TextBlock } from "react-placeholder/lib/placeholders";

export default function Placeholder() {
  return (
    <div className="text-center col-12">
      <TextBlock rows={5} color="#E0E0E0" className="placeholder-animated" />
    </div>
  );
}
