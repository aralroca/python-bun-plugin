# python-bun-plugin

Bun plugin to use any Python library via [NAPI](https://nodejs.org/api/n-api.html#node-api):

```js
import np from 'python:numpy';

const a = np.arange(15).reshape(3, 5);
const b = np.ones([2, 3], { dtype: np.int16 });

console.log(a.toString());
console.log(b.toString());
console.log(np.add(a, b).toString());
```

> [!NOTE]
>
> We are using [pymport](https://github.com/mmomtchev/pymport) under the hood to import Python modules. This plugin is a wrapper around pymport to make it work with Bun's module system with a normal `import` syntax.

## Getting Started

To use this plugin, you need to have Bun installed. You can adding this to [bunfig.toml](https://bun.sh/docs/runtime/bunfig):

```toml
preload = ["python-bun-plugin"]
```

## TypeScript Support

To support the `python:` import syntax, you need to add the following to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "paths": {
      "python:*": ["./node_modules/python-bun-plugin/src/*.ts"],
    }
  }
}
```

> [!IMPORTANT]
>
> For now, these types are supported: `numpy`.
> 
> **Feel free to open a PR to add more types for other Python libraries.**
