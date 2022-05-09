const spatialWordList = [
  "middle",
  "corner",
  "left corner",
  "right corner",
  "left",
  "right",
  "top",
  "bottom",
  "front",
  "center",
];
module.exports.IEcomponent = (data) => {
  let objects = [];
  let relations = [];
  // console.log(data.corefs);

  for (let sentence of data.sentences) {
    objects = [...objects, ...IElevel1(sentence)];
    relations = [...relations, ...IElevel2(sentence)];
    let results = IElevel3(sentence, objects, relations);

    objects = results.objects;
    relations = results.relations;
  }
  return { objects, relations };
};

const IElevel1 = (sentence) => {
  let objects = [];
  sentence.tokens.forEach((token) => {
    obj = {};
    if (token.pos === "NN" || token.pos === "PRP")
      obj = { index: token.index, name: token.word, token: token.pos };
    if (Object.keys(obj).length !== 0) objects.push(obj);
  });
  return objects;
};

const IElevel2 = (sentence) => {
  let relations = [];
  let { enhancedPlusPlusDependencies: data, tokens } = sentence;
  data.forEach((element) => getSPR(element, relations, tokens, data));
  //conjunctions
  data.forEach((element) => getSPFromConj(element, relations, tokens, data));
  //nsubj
  data.forEach((element) => getSPFromNsubj(element, relations, tokens, data));
  return relations;
};

const IElevel3 = (sentence, objects, relations) => {
  let list = [];
  let { enhancedPlusPlusDependencies: data } = sentence;
  objects.forEach((obj, i) => changeNmodOf(obj, i, data, objects, list));
  list.forEach((item) => changeRelation(item, relations));
  return { objects, relations };
};
const IElevel4 = () => {};

//helpers functions
const generateRelation = (sp, element, tokens, data) => {
  let governor = tokens[element.governor - 1];
  let object1 = { index: element.governor, name: element.governorGloss };
  if (governor.pos !== "NN")
    data.forEach((e) => {
      if (e.governor === element.governor && e.dep === "nsubj")
        object1 = { index: e.dependent, name: e.dependentGloss };
    });
  let object2 = { index: element.dependent, name: element.dependentGloss };
  return { sp, object1, object2 };
};
const getSPR = (element, relations, tokens, data) => {
  if (!(element.dep.includes("obl") || element.dep.includes("nmod"))) return;
  let sp = element.dep.split(":")[1];
  if (!["in", "on", "at", "behind", "near", "above"].includes(sp)) return;
  // console.log("(((((((((((element)))))))))))");
  // console.log(element);
  // console.log("(((((((((((element)))))))))))");
  relations.push(generateRelation(sp, element, tokens, data));
};
const getSPFromConj = (element, relations, tokens, data) => {
  if (!element.dep.includes("conj")) return;
  let element1 = tokens[element.governor - 1];
  let element2 = tokens[element.dependent - 1];
  if (element1.pos !== "NN" || element2.pos !== "NN") return;
  const item = relations.find((i) => checkItemExists(i, element));
  if (!item?.sp) return;
  element = reverseElement(element);
  relations.push(generateRelation("near", element, tokens, data));
};

const getSPFromNsubj = (element, relations, tokens, data) => {
  if (!element.dep.includes("nsubj")) return;
  let element1 = tokens[element.governor - 1];
  // if (!(element1.pos === "NN" || element1.lemma == "be")) return;
  let ele = data.find(
    (i) => i.dep === "case" && i.governor === element.governor
  );
  console.log("ele", ele);
  console.log("element", data);

  if (!ele?.governorGloss) return;
  const sp = ele.dependentGloss;
  element = reverseElement(element);
  relations.push(generateRelation(sp, element, tokens, data));
};
const changeNmodOf = (obj, i, data, objects, list) => {
  let element = data.find((e) => e.dependent === obj.index);
  if (!element) return;
  if (element.dep !== "nmod:of") return;
  //   objects[i].dep = element.dep;
  let index = objects.findIndex((e) => e.index === element.governor);
  if (index === -1) return;
  list.push({ from: objects[index], to: objects[i] });
  //   objects[i].dep = objects[index].dep;
  objects.splice(index, 1);
  i--;
};
const changeRelation = (item, relations) => {
  relations = relations.map((relation) => {
    if (relation.object1.index === item.from.index) {
      if (isSpatialWord(item.from.name)) relation.sp = item.from.name;
      relation.object1 = { index: item.to.index, name: item.to.name };
    } else if (relation.object2.index === item.from.index) {
      if (isSpatialWord(item.from.name)) relation.sp = item.from.name;
      relation.object2 = { index: item.to.index, name: item.to.name };
    }
    return relation;
  });
};
const checkItemExists = (item, element) => {
  let id1 = item.object1.index;
  let id2 = item.object2.index;
  let { governor: gov, dependent: dep } = element;
  return id1 === gov || id2 === gov || id1 === dep || id2 === dep;
};
const reverseElement = (element) => {
  return {
    dep: element.dep,
    governor: element.dependent,
    governorGloss: element.dependentGloss,
    dependent: element.governor,
    dependentGloss: element.governorGloss,
  };
};
const isSpatialWord = (name) => {
  return spatialWordList.includes(name.toLowerCase());
};

// module.exports = { IElevel1, IElevel2, IElevel3, IElevel4 };
