import { InputHTMLAttributes } from "react"
import "./styles.css"

type InputAtributtes = InputHTMLAttributes<HTMLInputElement>


interface InputProps extends InputAtributtes {
    label?: string
}


export default function Input({ label, ...rest }: InputProps) {
    return (
        <div className="input-wrapper">
            <label htmlFor={label}>{label}</label>
            <input {...rest}  />
        </div>
    )
}