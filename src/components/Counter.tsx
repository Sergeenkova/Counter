type CounterProps = {
    Value: number | string
    className: string 
}

export const Counter = ({Value, className}: CounterProps ) => {
    return (
        <div className = {className} >
          {Value}
        </div>
    )
}