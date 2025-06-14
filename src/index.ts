import { plugin, type BunPlugin } from "bun";

const PythonBunPlugin: BunPlugin = {
  name: "Python Bun Plugin",
  async setup(build: Bun.PluginBuilder) { 
    build.onResolve({ filter: /.*/, namespace: 'python' }, ({ path }) => ({
      path,
      namespace: "python",
    }));

    build.onLoad({ filter: /.*/, namespace: "python" }, ({ path }: { path: string }) => ({
        contents: `
          import { pymport, proxify } from 'pymport';

          const module = pymport('${path.replace(/^python:/, "")}');
          export default proxify(module);
        `,
        loader: "js",
      }
    ));
  }
};

plugin(PythonBunPlugin);
