// 引入path模块
const path = require("path");
// 2 引入html插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 3 引入clean插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//webpack中的所有的配置信息都应该写module.exports中
module.exports = {
  mode: "development",
  // devtool: "eval-source-map",
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件所在目录
  output: {
    // 指定打包文件目录
    path: path.resolve(__dirname, "dist"),
    // 打包产物的文件名
    filename: "bundle.js",
    // 让Webpack不使用箭头函数
    environment: {
      arrowFunction: false
    }
  },
  devServer: {
    // 发布后的映射路径
    contentBase: path.resolve("./"),
    // 压缩资源
    compress: true,
    // 服务器端口
    port: 8080,
    // 以指定浏览器打开, 为true表示使用默认浏览器, 也可以是页面路径
    open: "Chrome"
  },
  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      // TS处理配置
      {
        // 指定规则生效的文件
        test: /\.ts$/,
        // 要使用的loader, 使用顺序为从后往前
        use: [
          // 配置的复杂方式, 配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 配置babel
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 用于指定预设环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets: {
                      // 要兼容的浏览器及版本
                      "chrome": "66",
                      "ie": "11"
                    },
                    // core-js的大版本
                    "corejs": "3",
                    // 使用core-js的方式, "usage"表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          // 配置的简化方式, 用ts-loader去处理.ts文件
          "ts-loader"
        ],
        // 要排除的文件, 路径中有这个就不处理
        exclude: /node_modules/,
      },
    ],
  },
  // 配置Webpack插件
  plugins: [
    // new CleanWebpackPlugin(),
    // 2 配置html-webpack-plugin
    new HTMLWebpackPlugin({
      // 通过模板, 可以预设html结构
      template: "./src/index.html",
      title: "这是自定义的title",
    }),
  ],
  // 用来设置引用模块, 告诉Webpack以这些结尾的文件可以作为模块使用
  resolve: {
    extensions: [".ts", ".js"],
  },
};
