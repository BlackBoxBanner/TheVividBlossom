import {ComponentProps, useState, forwardRef} from "react";
import styles from "@/styles/components/input/input.module.scss";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
// import InputMask from 'react-input-mask';
import ReactInputMask, {Props as ReactInputMaskProps} from 'react-input-mask';
import {outfit, outfitLabel} from "@/util/font";
import {ButtonLogin} from "@/components/button";

type pageList = "setting" | "landing"


interface InputProps extends ComponentProps<"input"> {
  label: string;
  error?: boolean | string;
  mask?: string
  page?: pageList
}

export function SettingLabel(props: { id: string, label: string }) {
  return (
    <label htmlFor={props.id}
           className={`${styles.label} ${outfitLabel.className} ${styles.settingLabel}`}>
      {props.label}
    </label>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {type: initType, page = "landing"} = props;
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
        <label htmlFor={props.id}
               className={`${styles.label} ${outfitLabel.className} ${page === "setting" && styles.settingLabel}`}>
          {props.label}
        </label>
        <div className={styles.inputRelative}>
          <input
            ref={ref}
            className={`${styles.input}  ${props.className} ${!!props.error ? styles.inputError : ""} ${page === "setting" && styles.settingInput}`}
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


export interface FormInputProps extends ComponentProps<typeof Input> {
  showError?: boolean
  error?: string;
  edit?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const {showError = true} = props
  return (
    <>
      <div>
        <Input ref={ref} {...props} />
        {showError && (props.error ? <ErrorMessage>{String(props.error)}</ErrorMessage> :
          <ErrorMessage style={{opacity: 0}}>test</ErrorMessage>)}
      </div>
    </>
  );
});

FormInput.displayName = "FormInput";

export const RegisterInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  return (
    <>
      <div>
        <Input ref={ref} {...props} />
        {props.error ? <ErrorMessage>{String(props.error)}</ErrorMessage> :
          <ErrorMessage/>}
      </div>
    </>
  );
});

RegisterInput.displayName = "RegisterInput";

export interface InputMaskProps extends ReactInputMaskProps {
  // Add any additional props you need
  showError?: boolean
  label: string;
  error?: boolean | string;
  page?: pageList
  edit?: boolean
}

export const InputDate = forwardRef<ReactInputMask, InputMaskProps>((props, ref) => {
  const {type: initType, page = "landing"} = props;
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
        <label htmlFor={props.id}
               className={`${styles.label} ${outfitLabel.className} ${page === "setting" && styles.settingLabel}`}>
          {props.label}
        </label>
        <div className={styles.inputRelative}>
          <ReactInputMask mask={props.mask!} onChange={props.onChange} onBlur={props.onBlur} name={props.name}
                          disabled={props.disabled}
                          maskChar={null}
                          type={type}
                          ref={ref}
                          placeholder={props.placeholder}
                          className={`${styles.input} ${props.className} ${!!props.error ? styles.inputError : ""} ${styles.date} ${page === "setting" && styles.settingInput}`}/>
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

export const RegisterInputMask = forwardRef<ReactInputMask, InputMaskProps>((props, ref) => {
  const {showError = true} = props

  return (
    <>
      <div>
        <InputDate ref={ref} {...props} />
        {showError && (props.error ? <ErrorMessage>{String(props.error)}</ErrorMessage> :
          <ErrorMessage/>)}
      </div>
    </>
  );
});

InputDate.displayName = "InputDate";
RegisterInputMask.displayName = "RegisterInputMask";

export const AccountFormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const [disable, setDisable] = useState(!props.edit)
  return (
    <>
      <div>
        <Input page={"setting"} showError={false} {...props} ref={ref} disabled={disable}/>
      </div>
      {
        !props.edit &&
          <ButtonLogin font={"Outfit"} type={"button"} onClick={() => {
            setDisable(e => !e)
          }} dark style={{padding: "0.5rem 1.75rem", margin: "auto 0"}}>
              Edit
          </ButtonLogin>
      }
    </>
  )
})

AccountFormInput.displayName = "AccountFormInput";

export const AccountFormInputMask = forwardRef<ReactInputMask, InputMaskProps>((props, ref) => {
  const [disable, setDisable] = useState(!props.edit)
  return (
    <>
      <InputDate page={"setting"} showError={false} disabled={disable}
                 {...props} ref={ref}/>
      {
        !props.edit &&
          <ButtonLogin font={"Outfit"} type={"button"} onClick={() => {
            setDisable(e => !e)
          }} dark style={{padding: "0.5rem 1.75rem", margin: "auto 0"}}>
              Edit
          </ButtonLogin>
      }
    </>
  )
})
AccountFormInputMask.displayName = "AccountFormInputMask"

export const AccountFormInputImage = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [disable, setDisable] = useState(true)
  return (
    <>
      <div className={`${styles.inputContainer} ${outfit.className}`}>
        <label htmlFor={props.id}
               className={`${styles.label} ${outfitLabel.className} ${styles.settingLabel}`}>
          {props.label}
        </label>
        <div className={styles.inputRelative}>
          <input
            ref={ref}
            className={`${styles.input}  ${props.className} `}
            type={"file"}
            accept={"image/*"}
            {...props}
          />
        </div>
      </div>
      <ButtonLogin font={"Outfit"} type={"button"} onClick={() => {
        setDisable(e => !e)
      }} dark style={{padding: "0.5rem 1.75rem", margin: "auto 0"}}>
        Edit
      </ButtonLogin>
    </>
  )
})
AccountFormInputImage.displayName = "AccountFormInputImage"
