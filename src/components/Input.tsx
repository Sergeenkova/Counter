type InputProps = {
    inputValue: number
    className: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({inputValue, className, onChange}: InputProps ) => {
    return (
        <input type = "number" value = {inputValue} className = {className} onChange = {onChange}></input>
    )
}