import { Router } from "express";

import * as settings from "./controllers/settings";
import * as builds from "./controllers/builds";

// routes for /api/settings

export const apiSettings = Router();

apiSettings.get("/", settings.getSettings);
apiSettings.post("/", settings.addSettings);

// routes for /api/builds

export const apiBuilds = Router();

apiBuilds.get("/", builds.getBuilds);
apiBuilds.post("/:commitHash", builds.addBuild);
apiBuilds.get("/:buildId", builds.getBuild);
apiBuilds.get("/:buildId/logs", builds.getBuildLog);
