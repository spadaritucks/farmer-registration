import './styles.css'

interface ErrorProps {
    message : string | undefined
}

export function FormError ({message} : ErrorProps) {

    return <span className='error-message'>{message}</span>
}