const ClipboardIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path strokeDasharray={16} strokeDashoffset={16} d="M12 3h7v8">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="16;0"
          ></animate>
        </path>
        <path
          strokeDasharray={12}
          strokeDashoffset={12}
          strokeWidth={1}
          d="M14.5 3.5v3h-5v-3"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.9s"
            dur="0.2s"
            values="12;0"
          ></animate>
        </path>
        <path strokeDasharray={48} strokeDashoffset={48} d="M19 17v4h-14v-18h7">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.6s"
            values="48;0"
          ></animate>
        </path>
        <path strokeDasharray={10} strokeDashoffset={10} d="M21 14h-8.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.1s"
            dur="0.2s"
            values="10;0"
          ></animate>
        </path>
        <path
          strokeDasharray={6}
          strokeDashoffset={6}
          d="M12 14l3 3M12 14l3 -3"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.3s"
            dur="0.2s"
            values="6;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
};

export default ClipboardIcon;
