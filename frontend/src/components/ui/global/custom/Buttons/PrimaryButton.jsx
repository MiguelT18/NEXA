import Link from "next/link";

export default function PrimaryButton({ children, link, ...props }) {
  const Component = link ? Link : "button";

  const className = `w-full inline-block px-4 py-2 leading-6 text-sm font-medium text-white rounded-md shadow-sm bg-alt-dark-primary-color outline-none text-center flex justify-center items-center gap-2 active:scale-95 transition-all duration-150 ${props.disabled ? "opacity-50 cursor-not-allowed active:scale-100" : "hover:bg-alt-dark-primary-color/60"}`;

  return (
    <Component href={link || "#"} className={className} {...props}>
      {children}
    </Component>
  );
}
