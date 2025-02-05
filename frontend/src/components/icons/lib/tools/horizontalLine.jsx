const HorizontalLineIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width="28"
      height="28"
      {...props}
    >
      <g fill="currentColor" fill-rule="nonzero">
        <path d="M4 15h8.5v-1h-8.5zM16.5 15h8.5v-1h-8.5z"></path>
        <path d="M14.5 16c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path>
      </g>
    </svg>
  );
};

export default HorizontalLineIcon;
