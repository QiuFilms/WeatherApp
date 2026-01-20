import "../Styles/Header.css"
import logo from "../Images/cloudy.png"

export default function Header(){
    return(
        <div className="header">
            <img src={logo} className="logo"></img>
            <p className="name">WeatherApp</p>
        </div>
    )
}