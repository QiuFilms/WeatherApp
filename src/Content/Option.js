import "flag-icons/css/flag-icons.min.css";
import { useContext } from "react";
import { ResponseContext } from "./ResponseContext";
import { PlaceContext } from "./PlaceContext";

export default function Option({index, inputRef}){
    const {response, setResponse} = useContext(ResponseContext)
    const {setCurrentPlace} = useContext(PlaceContext)

    const result = response.results[index]
    
    const handleClick = (e) => {
        e.stopPropagation()
        inputRef.current.value = ""
        setCurrentPlace(result)
    }
    

    return(
        <div className="option" onMouseDown={handleClick}>
            <div className="flag">
                <span className={`fi fi-${result?.country_code?.toLowerCase() ? result?.country_code?.toLowerCase() : "un"} country`}></span>
            </div>
            <div className="info">
                <p className="city">{result.name}</p>
                {result?.admin1 ? 
                    <p className="detail1">{result.admin1}</p>:<></>   
                }
                {result?.admin1 != result?.admin2 ? 
                    <p className="detail2">{result.admin2}</p> : <></>
                }
            </div>
        </div>
    )
}