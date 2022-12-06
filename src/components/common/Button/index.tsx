import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: "sm" | "md" | "lg";
}

const Button = ({ text, size = "md", ...props }: ButtonProps) => {
  return (
    <button type="button" {...props}>
      {text}
    </button>
  );
};

export default Button;
