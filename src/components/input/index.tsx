import {ComponentProps, useState, forwardRef} from "react";
import styles from "@/styles/components/input/input.module.scss";
import {Outfit} from "next/font/google";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

const outfit = Outfit({weight: "300", style: ["normal"], subsets: ["latin"]});
const outfitLabel = Outfit({weight: "500", style: ["normal"], subsets: ["latin"]});

interface InputProps extends ComponentProps<"input"> {
  label: string;
  error?: boolean | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const initType = props.type;
  const [type, setType] = useState<"password" | "text">(props.type == "password" ? "password" : "text");

  function changeHandler() {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  }

  return (
    <>
      <div className={`${styles.inputContainer} ${outfit.className}`}>
        <label htmlFor={props.id} className={`${styles.label} ${outfitLabel.className}`}>
          {props.label}
        </label>
        <div className={styles.inputRelative}>
          <input
            ref={ref}
            className={`${styles.input}  ${props.className} ${!!props.error ? styles.inputError : ""}`}
            {...props}
            type={`${type}`}
          />
          {initType === "password" && (
            type === "password" ? (
              <button onClick={changeHandler} type="button" className={styles.hideBtn}>
                <AiOutlineEye size={25} className={styles.icon}/>
              </button>
            ) : (
              <button onClick={changeHandler} type="button" className={styles.hideBtn}>
                <AiOutlineEyeInvisible size={25} className={styles.icon}/>
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
});

Input.displayName = "Input";

interface ErrorMessageProps extends ComponentProps<"p"> {
}

export const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>((props, ref) => {
  return (
    <p ref={ref} className={`${styles.error} ${outfitLabel.className}`} {...props}>
      {props.children}
    </p>
  );
});

ErrorMessage.displayName = "ErrorMessage";

interface FormInputProps extends ComponentProps<typeof Input> {
  error: string | undefined;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  return (
    <>
      <div>
        <Input ref={ref} {...props} />
        {props.error ? <ErrorMessage>{String(props.error)}</ErrorMessage> :
          <ErrorMessage style={{opacity: 0}}>test</ErrorMessage>}
      </div>
    </>
  );
});

FormInput.displayName = "FormInput";