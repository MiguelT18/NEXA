const FilterIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-dasharray="56"
        stroke-dashoffset="56"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 4h14l-5 6.5v9.5l-4 -4v-5.5Z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.6s"
          values="56;0"
        />
      </path>
    </svg>
  );
};

export default FilterIcon;
