# Guide


## init
```shell
# mkdir tools

mkdir libraries
mkdir libraries/core-common

mkdir apps
mkdir apps/app-doc

cd libraries/core-common
mkdir src
npm init -y
cd ../../

cd apps/app-doc
mkdir src
npm init -y
npm install --save-dev vitepress vue
cd ../../

cd libraries
npm create vite@latest core-vue -- --template vue
cd core-vue
npm install --save-dev sass
cd ../../

cd apps
npm init vue@latest
# app-portal
npm install --save element-plus
npm install --save @element-plus/icons-vue
npm install --save echarts
npm install --save axios
npm install --save-dev sass

```
