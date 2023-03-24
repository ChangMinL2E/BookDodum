import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;


export async function getTextAPI(korean:string) {
    try{
        const { data } = await axios ({
            method: "POST",
            url: `${baseUrl}/book/papago`,
            data: korean,
            headers: { 'Content-Type': 'application/json' }
        });
        const test = data.substr(20)
        const json = JSON.parse(test)
        // console.log(json.message.result.translatedText)
        return json.message.result.translatedText;
    }catch(e) {
        console.log(e)
    }
}