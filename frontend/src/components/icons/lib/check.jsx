import React from "react";

const CheckIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.39 1.39 0 0 1 .27-1.951a1.39 1.39 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656z"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0, 50"
          to="50, 0"
          dur="1s"
          fill="freeze"
        />
      </path>
    </svg>
  );
};

export default CheckIcon;
