import { InputHTMLAttributes } from "react"


type InputAtributtes = InputHTMLAttributes<HTMLInputElement>


interface InputProps extends InputAtributtes {
    label: string
}


export default function Input({ label, ...rest }: InputProps) {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input {...rest}  />
        </div>
    )
}