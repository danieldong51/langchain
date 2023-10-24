import axios from "axios";

export const os_indices = async () => {
  // console.log("got pplQuery ################", pplQuery);
  let data: any = [];
  await axios.default
    // .post(
    //   "http://localhost:9200/_cat/indices",
    //   {
    //     query: pplQuery,
    //     format: "jdbc",
    //   },
    //   {
    //     headers: { "osd-xsrf": true },
    //     auth: {
    //       username: process.env.OSD_USER || "",
    //       password: process.env.OSD_PASS || "",
    //     },
    //   }
    // )
    .get(
      'http://localhost:9200/_cat/indices'
    )
    .then((res: any) => {
      console.log("got response here:", res);
      data = JSON.stringify(res.data.jsonData);
    })
    .catch(
      (error) => (data = "Error while making a request for PPL Query: " + error)
    );

  return data;
};

export const os_shards = async () => {
  let data: any = [];
  await axios.default
    // .post(
    //   "http://localhost:9200/_cat/indices",
    //   {
    //     query: pplQuery,
    //     format: "jdbc",
    //   },
    //   {
    //     headers: { "osd-xsrf": true },
    //     auth: {
    //       username: process.env.OSD_USER || "",
    //       password: process.env.OSD_PASS || "",
    //     },
    //   }
    // )
    .get(
      'http://localhost:9200/_cat/cluster_manager?v'
    )
    .then((res: any) => {
      console.log("got response here:", res);
      data = JSON.stringify(res.data.jsonData);
    })
    .catch(
      (error) => (data = "Error while making a request for PPL Query: " + error)
    );

  return data;
};