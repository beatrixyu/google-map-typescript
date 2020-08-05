import axios from "axios"
const GOOGLE_API_KEY = "AIzaSyBPrVgQv8RfshGtxPvU_q02fsgMb7R3F00"

declare var google:any
const form = document.querySelector("form")! as HTMLFormElement;

const addressInput = document.getElementById("address")! as HTMLInputElement
type GoogleResponseDataType = {
    results: { geometry: { location: { lat: number, lng: number } } }[];
status: "OK" | "ZERO_RESULTS"
}
const searchAddressHandler = (e: Event) => {
    //protect page refresh everytime input new address
    e.preventDefault()

    
    //get value from the input of the address
    const getAddress = addressInput.value
    console.log("fetch", getAddress)

    //sent it to google's api ===> 
    axios
    .get<GoogleResponseDataType>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=
        ${encodeURI(getAddress)}
        &key=${GOOGLE_API_KEY}`
        //encodeURI funtion to transfer the address to be a string      
        )
        .then(response => {
            if (response.data.status !== "OK"){
        throw new Error("cannot fetch the data")
    }
            const coordinates = response.data.results[0].geometry.location
           const map = new google.maps.Map(document.getElementById('map'), {
                center: coordinates,
                zoom: 8
           });
    new google.maps.Marker({position: coordinates, map: map});
})
        .catch(err => {
            alert(err.message)
            console.log(err)
        })
        console.log("fetch", addressInput)

}
console.log("fetch", searchAddressHandler)


form.addEventListener("submit", searchAddressHandler)