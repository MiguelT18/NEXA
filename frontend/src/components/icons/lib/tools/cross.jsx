const CrossIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width="28"
      height="28"
      {...props}
    >
      <g fill="currentColor">
        <path d="M18 15h8v-1h-8z"></path>
        <path d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path>
      </g>
    </svg>
  );
};

export default CrossIcon;
