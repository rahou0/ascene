const axios = require("axios");

module.exports.applyCoreNLP = async (sentence) => {
  try {
    const url =
      "https://corenlp.run/?properties=%7B%22annotators%22%3A%20%22tokenize%2Cssplit%2Cpos%2Cner%2Cdepparse%2Copenie%2Ccoref%2Ckbp%22%2C%20%22date%22%3A%20%222022-04-11T10%3A17%3A47%22%7D&pipelineLanguage=en";
    const body = sentence.replace(" ", "%20");
    const headers = {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9,ar;q=0.8,en-GB;q=0.7,fr;q=0.6",
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      Referer: "https://corenlp.run/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

