import React from "react"

const FacebookIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      {...props}
    >
      <defs>
        <mask id="ipTFacebook0">
          <path
            fill="#555555"
            stroke="#fff"
            strokeLinejoin="round"
            strokeWidth={3.8}
            d="M36 12.6h-6.013c-1.086 0-1.967.88-1.967 1.967v6.9H36l-1.169 7.597h-6.81V43h-8.776V29.064H12v-7.597h7.151l.094-7.21l-.013-1.31A7.87 7.87 0 0 1 27.099 5H36z"
          ></path>
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#ipTFacebook0)"
      ></path>
    </svg>
  )
}

export default FacebookIcon
