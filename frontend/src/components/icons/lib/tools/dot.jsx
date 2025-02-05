const DotIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width="28"
      height="28"
      {...props}
    >
      <circle fill="currentColor" cx="14" cy="14" r="3"></circle>
    </svg>
  );
};

export default DotIcon;
