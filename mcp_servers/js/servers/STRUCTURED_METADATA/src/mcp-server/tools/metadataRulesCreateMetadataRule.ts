/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { metadataRulesCreateMetadataRule } from "../../funcs/metadataRulesCreateMetadataRule.js";
import * as components from "../../models/components/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: components.MetadataRuleCreate$inboundSchema,
};

export const tool$metadataRulesCreateMetadataRule: ToolDefinition<typeof args> =
  {
    name: "create-metadata-rule",
    description: `Creates a new conditional metadata rule

Creates a new metadata rule with the specified properties and configuration.`,
    scopes: ["builder"],
    args,
    tool: async (client, args, ctx) => {
      const [result, apiCall] = await metadataRulesCreateMetadataRule(
        client,
        args.request,
        { fetchOptions: { signal: ctx.signal } },
      ).$inspect();

      if (!result.ok) {
        return {
          content: [{ type: "text", text: result.error.message }],
          isError: true,
        };
      }

      const value = result.value;

      return formatResult(value, apiCall);
    },
  };
