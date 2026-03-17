type ButtonProps = {
    title: string
    disabled?: boolean
    onClick?: () => void 
    className: string
}

export const Button = ({title, disabled, onClick, className}: ButtonProps ) => {
    return (
        <button onClick = {onClick} disabled = {disabled} className={className}>{title}</button> 
    )
}