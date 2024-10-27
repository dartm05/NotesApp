/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
    "\\.js$": " /Users/daniellaarteaga/Documents/Projects/TasksApp/back/functions/node_modules/babel-jest" 
  },
};