import cubejs from "@cubejs-client/core";

export const getCubeJs = () =>
  cubejs(process.env.REACT_APP_CUBE_TOKEN ?? "", {
    apiUrl:
      "https://assistant-malo.aws-us-west-2.cubecloudapp.dev/cubejs-api/v1",
  });
