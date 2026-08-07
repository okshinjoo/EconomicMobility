// Node-only loader used by repository maintenance scripts. The application
// keeps extensionless TypeScript imports for Next.js; this hook lets Node 24
// load the same modules without creating a second source of truth.

import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (
      (specifier.startsWith("./") || specifier.startsWith("../")) &&
      !/\.(?:[cm]?[jt]sx?|json|node)$/i.test(specifier)
    ) {
      const parentPath = fileURLToPath(context.parentURL);
      const candidate = new URL(`${specifier}.ts`, pathToFileURL(parentPath));
      try {
        readFileSync(candidate);
        return { url: candidate.href, shortCircuit: true };
      } catch {
        // Let Node produce the normal resolution error below.
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (!url.endsWith(".ts")) return nextLoad(url, context);
    const source = readFileSync(new URL(url), "utf8");
    const output = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
      fileName: fileURLToPath(url),
    });
    return { format: "module", source: output.outputText, shortCircuit: true };
  },
});
