import { GlobalIcons } from "@/components/icons";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomSelect({
  options,
  onChange,
  defaultValue,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || options[0]
  );
  const ref = useRef(null);

  // Manejar clics fuera del componente
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const toggleOptions = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectOption = (option, event) => {
    event.stopPropagation();

    if (!disabled) {
      setSelectedOption(option);
      setIsOpen(false);
      onChange && onChange(option);
    }
  };

  const selectClasses = `w-full py-2 px-4 bg-alt-light-primary-color/20 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none relative mt-1 flex justify-between items-center ${disabled ? "cursor-not-allowed bg-alt-light-primary-color/10 text-black/50 dark:text-white/50" : "cursor-pointer"}`;

  return (
    <div
      className={selectClasses}
      ref={ref}
      tabIndex={disabled ? -1 : 0}
      onClick={toggleOptions}
    >
      <span>{selectedOption.label}</span>
      <span>
        <GlobalIcons.TriangleSolidArrowIcon
          className={`size-4 transform transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : ""}`}
        />
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full absolute left-0 top-10 bg-primary-color/30 dark:bg-alt-dark-primary-color/20 shadow-lg mt-1 z-10"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`w-full p-2 transition-all hover:bg-primary-color/80 text-white dark:hover:bg-alt-dark-primary-color/90 backdrop-blur-md cursor-pointer ${option.value === selectedOption.value ? "bg-alt-dark-primary-color/80 text-white" : ""}`}
                onClick={(e) => handleSelectOption(option, e)}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
