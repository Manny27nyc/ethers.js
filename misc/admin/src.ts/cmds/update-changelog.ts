// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
import fs from "fs";

import { generate } from "../changelog";
import { colorify } from "../log";
import { resolve } from "../path";

(async function() {
    console.log(colorify.bold("Updating CHANGELOG.md..."));
    fs.writeFileSync(resolve("CHANGELOG.md"), await generate());
})();
