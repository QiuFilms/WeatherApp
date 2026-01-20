
function Button({type, text, setChartType}){
    return(
            <Button variant="primary" onClick={() => setChartType(type)}>{text}</Button>
    )
}