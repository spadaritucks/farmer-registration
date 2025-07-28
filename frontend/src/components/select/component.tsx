import { SelectHTMLAttributes } from "react"
import "./styles.css"

type SelectAtributtes = SelectHTMLAttributes<HTMLSelectElement>


interface SelectProps extends SelectAtributtes {
    label?: string
}


export default function Select({ label, ...rest }: SelectProps) {
    return (
        <div className="select-wrapper">
            <label htmlFor={label}>{label}</label>
            <select {...rest}  />
        </div>
    )
}