import { ButtonHTMLAttributes } from "react"
import "./styles.css"


type ButtonAtributtes = ButtonHTMLAttributes<HTMLButtonElement>
type ButtonVariants = "default" | "success" | "destructive"

interface ButtonProps extends ButtonAtributtes {
    name : string
    variant : ButtonVariants
}


export default function Button ({name,variant, ...rest} : ButtonProps) {
    return <button className={variant} {...rest}>{name}</button>
}