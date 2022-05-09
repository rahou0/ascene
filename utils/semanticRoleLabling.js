// const { printInFile } = require("./utils");

// resolve coreference resolution
// resolve spatial object when they are present in the text
// and case
module.exports.semanticRoleLabeling = (data, tokens, objects) => {
  try {
    let motions = [];
    verbnet_tokens = getTokensFromSpans(data);
    verbnet_tokens = affiliateTokenToVBtokens(verbnet_tokens, tokens);
    for (let sentence of data) {
      let spans = affiliateTokensToSpans(verbnet_tokens, sentence.spans);
      const motion = SRLlevel1(spans, objects);
      motions.push(motion);
    }
    return { motions };
  } catch (error) {
    console.log(error);
  }
};
const getTokensFromSpans = (data) => {
  let tokens = [];
  data.forEach(({ spans }) => {
    spans.forEach((span) => {
      let found = tokens.find((token) => isSameToken(token, span));
      if (!found) tokens.push(span);
    });
  });
  return tokens;
};
const affiliateTokenToVBtokens = (verbnet_tokens, tokens) => {
  let counter = 0;
  return verbnet_tokens.map((token) => {
    const texts = token.text.split(" ");
    token.tokens = texts.map(() => {
      return tokens[counter++];
    });
    return token;
  });
};
const affiliateTokensToSpans = (tokens, spans) => {
  return spans.map((span) => {
    let found = tokens.find((token) => isSameToken(token, span));
    span.tokens = found.tokens;
    return span;
  });
};
const isSameToken = (token, span) => {
  return (
    token.text === token.text &&
    token.start === span.start &&
    token.end === span.end
  );
};
const SRLlevel1 = (spans, objects) => {
  let motion = {
    Verb: null,
    Agent: null,
    Theme: null,
    Patient: null,
    Manner: null,
    Location: null,
    Time: null,
    Destination: null,
    Direction: null,
  };
  spans.forEach((span) => affiliateSpanToMotionObject(span, motion, objects));
  return motion;
};

const affiliateSpanToMotionObject = (span, motion, objects) => {
  const objects_name = objects.map((obj) => obj.name);
  switch (span.vn) {
    case "Verb":
      motion.Verb = { index: span.tokens[0].index, name: span.tokens[0].word };
      break;
    case "Agent":
      let agent = span.tokens.find((token) =>
        objects_name.includes(token.word)
      );
      motion.Agent = { index: agent.index, name: agent.word };
      break;
    case "Theme":
      //   console.log("theme", span);
      let theme = span.tokens.find((token) =>
        objects_name.includes(token.word)
      );

      motion.Theme = { index: theme.index, name: theme.word };
      break;
    case "Patient":
      let patient = span.tokens.find((token) =>
        objects_name.includes(token.word)
      );
      motion.Patient = { index: patient.index, name: patient.word };
      break;
    case "Manner":
      break;
    case "Location":
      let location = span.tokens.find((token) =>
        objects_name.includes(token.word)
      );
      motion.Location = { index: location.index, name: location.word };
      break;
    case "Time":
      break;
    case "Destination":
      let destination = span.tokens.find((token) =>
        objects_name.includes(token.word)
      );
      motion.Destination = { index: destination.index, name: destination.word };
      break;
    case "Direction":
      break;
    default:
      break;
  }
};
