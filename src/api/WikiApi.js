var requestUrl =
    "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext=1&exintro=1&titles=";

class WikiApi {
    static getWikiDetails(phrase) {
        return fetch(`${requestUrl + phrase}`)
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
                return;
            })
    }
}


export default WikiApi;