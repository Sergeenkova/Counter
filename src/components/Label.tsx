type LabelProps = {
    title: string
    className: string
}

export const Label = ({title, className}: LabelProps ) => {
    return (
        <div className = {className}>
          {title}
        </div>
    )
}