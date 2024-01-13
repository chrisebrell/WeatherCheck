//Aside Component - used for suggesting things to wear based on the location

//DEPENCENCIES
import '../styles.css'
import React, { useState } from 'react'


function Aside() {
    /* PSUEDOCODE:

    TRYING TO USE THE DATA BEING PULLED IN AND BASED ON THE DATA, THERE'S A DIFFERENT MESSAGE BASED ON THE WEATHER AND THE DESCRIPTION

        dependencies - import WeatherCard and WeatherApp so I can use the values in the WeatherCard & WeatherApp for my algorithm
    
        useState - to set the initial value of the aside. say something like, "type zipcode to get suggestions for attire"

        setMessage - to grab the information on what to say when the zip code is displayed

        ex) const setMessage = async () => {
            use if/else statements to choose which message to display. use emojis!
                an if/else statement for weather[0].description
                an if/else statement for main.temp
                an if/else statement for main.humidity
            nest all of the if/else statements in a trycatch, so if it doesn't work, it sends an error message


        useEffect - use useEffect to run the setMessage function
        ex)
        useEffect(() => {

        
        , []}) <--- This is where I put the zipcode to indicate that it wont run unless the zipcode has a value

        const display - to display the message

        return - returning the const display
    
    */


    let [message, setMessage] = useState("Type in ZipCode to get suggestions for attire!")

    /* COMMENTED OUT TO KEEP THE SITE FROM CRASHING. FINISH CODING THIS LATER
    const { zipCode } = useParams()*/

    setMessage = ({ WeatherData }) => {
        try {
            //MESSAGES FOR TEMPERATURE
            if (WeatherData.main.temp > 100) {
                message = "It's hot.... like really hot... leathers not recommended at all..."
            } else if(WeatherData.main.temp < 70) {
                message = "it's warm today! No need for bundling up"
            } else if(WeatherData.main.temp < 45) {
                message = "It's not that cold outside today, but a small sweater will do"
            } else if(WeatherData.main.temp < 20) {
                message = "Brrr, chilly! try putting on a Jacket!"
            } else {
                message = ""
            }

            //MESSAGES FOR DESCRIPTION - tell the users what to bring/buy
            if (WeatherData.weather[0].description == "clear sky") {
                message = "You might want to get some sunglasses"
            } else if (WeatherData.weather[0].description == "shower rain") {
                message = "Make sure you have an umbrella"
            } else if (WeatherData.weather[0].description == "rain" && WeatherData.weather[0].description == "thunderstorm") {
                message = "Grab an umbrella! It's pouring!"
            } else if (WeatherData.weather[0].description == "snow") {
                message = "get your snowboots 'cause its snowin outside."
            } else {
                message =""
            }

        } catch (error) {
            message = "No zipcode, no attire suggestions. sorry..."
        }
    }

    
    /* COMMENTED OUT TO KEEP THE SITE FROM CRASHING. FINISH CODING THIS LATER
    useEffect(() => {
        setMessage()
    }, [zipCode])*/

    return (
        <div className='asideContainer'>
            {message}
        </div>
    )
}




export default Aside