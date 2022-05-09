const models = {
  bird: { type: "gltf", url: "./models/bird/scene.gltf", scale: 0.15 },
  bird_cage: { type: "gltf", url: "./models/bird_cage/scene.gltf", scale: 3 },
  chair: {
    type: "gltf",
    url: "./models/chair/scene.gltf",
    scale: 1,
    face: 180,
  },
  coca: { type: "gltf", url: "./models/coca/scene.gltf", scale: 1, face: 0 },
  coffee_mug: {
    type: "gltf",
    url: "./models/coffee_mug/scene.gltf",
    scale: 0.01,
  },
  dog: { type: "gltf", url: "./models/dog/scene.gltf", scale: 0.02, face: 90 },
  dog_house: {
    type: "gltf",
    url: "./models/dog_house/scene.gltf",
    scale: 0.05,
    face: 270,
  },
  mug: { type: "gltf", url: "./models/mug/scene.gltf", scale: 0.03 },
  rounded_table: {
    type: "gltf",
    url: "./models/rounded_table/scene.gltf",
    scale: 0.3,
  },
  tv: { type: "gltf", url: "./models/tv/scene.gltf", scale: 0.003 },
  wooden_table: {
    type: "gltf",
    url: "./models/wooden_table/scene.gltf",
    scale: 0.6,
  },
  table: { type: "gltf", url: "./models/wooden_table/scene.gltf", scale: 0.6 },
  boy: { type: "fbx", url: "./models/Xbot/xbot2.fbx", scale: 0.01 },
  xbot: { type: "fbx", url: "./models/Xbot/xbot2.fbx", scale: 0.01 },
};
const animations = {
  dancing: { url: "./animation/Dancing.fbx", type: "fbx" },
  jumping: { url: "./animation/jumping.fbx", type: "fbx" },
  opening: { url: "./animation/opening.fbx", type: "fbx" },
  sitting: { url: "./animation/sitting.fbx", type: "fbx" },
  sleeping: { url: "./animation/sleeping.fbx", type: "fbx" },
  standing: { url: "./animation/standing.fbx", type: "fbx" },
  walking: { url: "./animation/walking.fbx", type: "fbx" },
  running: { url: "./animation/Running.fbx", type: "fbx" },
  score: { url: "./animation/Score.fbx", type: "fbx" },
};

module.exports = { models, animations };
