const axios = require("axios");

module.exports.getVNPBLabel = async (sentence) => {
  try {
    const url = "https://verbnetparser.com/predict/semantics?utterance=";
    const response = await axios.get(url + sentence.replace(" ", "%20"));
    return response.data;
  } catch (error) {
    console.log(error);
  }
  //   axios
  //     .get(url + sentence)
  //     .then((res) => semanticRoleLabeling(res.data.props, tokens, objects))
  //     .catch((err) => console.log("err"));
};
