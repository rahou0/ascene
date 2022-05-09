const { applyCoreNLP } = require("../../utils/coreNlp");
const { IEcomponent } = require("../../utils/ieExtractor");
const { semanticRoleLabeling } = require("../../utils/semanticRoleLabling");
const { getVNPBLabel } = require("../../utils/verbNet");
const { models } = require("../db/index");
module.exports.getIE = async (req, res) => {
  try {
    const { text } = req.query;
    const data = await applyCoreNLP(text);
    const { props: vb_data } = await getVNPBLabel(text);
    let { objects, relations } = IEcomponent(data);
    console.log("objects:", objects);
    console.log("relations:", relations);
    const { motions } = semanticRoleLabeling(
      vb_data,
      data.sentences[0].tokens,
      objects
    );
    objects.forEach((object) => {
      const model = models[object.name];
      if (model) console.log("object:", model);
      else console.log(`model not found for :${object.name}`);
    });
    res.status(200).send({ res: "ok!", objects, relations, motions });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ err: "server error" });
  }
};
