import express from "express";

let router = express.Router();
let initRouteWeb = (server) => {
  //   router.post("/trunk/registry", RegistryTrunk);
  //   router.post("/trunk/update", UpdateTrunk);

  //   router.post("/campaign/call", CampaignCall);
  //   router.post("/campaign/assign", AssignCampaignFlow);
  return server.use("/", router);
};
export default initRouteWeb;
