import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { DynamicTool } from "langchain/tools";
import { os_indices, os_shards } from "./tool.js";
import { ConsoleCallbackHandler } from "langchain/callbacks";
import { Calculator } from "langchain/tools/calculator";

const apiKey = process.env.OPENAI_API_KEY;

export const run = async () => {
  process.env.LANGCHAIN_HANDLER = "langchain";

  const model = new ChatOpenAI({ 
    temperature: 0,
    openAIApiKey: apiKey,
  });

  const tools = [
    new DynamicTool({
      name: "OpenSearch Indices API",
      description:
        "call this to get essential statistics about the indices in your OpenSearch cluster, including how much disk space they are using, how many shards they have, and their health status. input should be an empty string.",
      func: () => os_indices(),
    }),
    new DynamicTool({
      name: "OpenSearch Shards API",
      description:
        "call this to get the state of primary and replica shards in OpenSearch and how they are distributed",
      func: () => os_shards(),
    }),
    new Calculator(),
    new DynamicTool({
      name: "FOO",
      description:
        "call this to get the value of foo. input should be an empty string.",
      func: async () => "baz",
    }),
    new DynamicTool({
      name: "BAR",
      description:
        "call this to get the value of bar. input should be an empty string.",
      func: async () => "baz1",
    }),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-conversational-react-description",
    verbose: true,
    // callbacks: [new ConsoleCallbackHandler()], // add a console callback handler
    // maxIterations: 2,
  });

  console.log("Loaded agent.");

  // const input = `Can you execute a PPL query and summarize the response?`;
  const input1 = `My name is Dan!`
  console.log(`Executing with input "${input1}"...`);
  const result1 = await executor.call({ input:input1 });
  console.log(`Got output ${ result1 }`);

  const input2 = `What is the value of Foo?`
  console.log(`Executing with input "${input2}"...`);
  const result2 = await executor.call({ input:input2 });
  console.log(`Got output ${ result2 }`);

  const input3 = `How many indices do I have in my OpenSearch cluster?`
  console.log(`Executing with input "${input3}"...`);
  const result3 = await executor.call({ input:input3 });
  console.log(`Got output ${ result3 }`);

  const input4 = `How many shards do I have in my OpenSearch cluster?`
  console.log(`Executing with input "${input4}"...`);
  const result4 = await executor.call({ input:input4 });
  console.log(`Got output ${ result3 }`);

  // const input2 = `How many indicies are there in my OpenSearch cluster?`
  // console.log(`Executing with input "${input2}"...`);
  // const result2 = await executor.call({ input2 });
  // console.log(`Got output ${ result2.output }`);
};

run();