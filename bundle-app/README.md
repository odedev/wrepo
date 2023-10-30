

> When this plugin is enabled, the useBuiltIns option in @babel/preset-env must not be set. Otherwise, > this plugin may not able to completely sandbox the environment.

### Babel 使用 `transform-runtime`
```json

{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "30",
          "chrome": "30",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3"
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}

```
