// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
import { getOrdered } from "../depgraph";
import { resolve } from "../path";
import { updateJson } from "../local";

(async function() {
    const ordered = getOrdered(true);

    updateJson(resolve("tsconfig.project.json"), {
        references: ordered.map((name) => ({ path: ("./packages/" + name) }))
    });
})().catch((error) => {
    console.log(error);
    process.exit(1);
});

