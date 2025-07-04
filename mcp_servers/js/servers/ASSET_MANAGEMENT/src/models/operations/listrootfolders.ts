/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type ListRootFoldersGlobals = {
  /**
   * The cloud name of your product environment.
   */
  cloudName?: string | undefined;
};

export type ListRootFoldersRequest = {};

/** @internal */
export const ListRootFoldersGlobals$inboundSchema: z.ZodType<
  ListRootFoldersGlobals,
  z.ZodTypeDef,
  unknown
> = z.object({
  cloud_name: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    "cloud_name": "cloudName",
  });
});

/** @internal */
export type ListRootFoldersGlobals$Outbound = {
  cloud_name?: string | undefined;
};

/** @internal */
export const ListRootFoldersGlobals$outboundSchema: z.ZodType<
  ListRootFoldersGlobals$Outbound,
  z.ZodTypeDef,
  ListRootFoldersGlobals
> = z.object({
  cloudName: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    cloudName: "cloud_name",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ListRootFoldersGlobals$ {
  /** @deprecated use `ListRootFoldersGlobals$inboundSchema` instead. */
  export const inboundSchema = ListRootFoldersGlobals$inboundSchema;
  /** @deprecated use `ListRootFoldersGlobals$outboundSchema` instead. */
  export const outboundSchema = ListRootFoldersGlobals$outboundSchema;
  /** @deprecated use `ListRootFoldersGlobals$Outbound` instead. */
  export type Outbound = ListRootFoldersGlobals$Outbound;
}

export function listRootFoldersGlobalsToJSON(
  listRootFoldersGlobals: ListRootFoldersGlobals,
): string {
  return JSON.stringify(
    ListRootFoldersGlobals$outboundSchema.parse(listRootFoldersGlobals),
  );
}

export function listRootFoldersGlobalsFromJSON(
  jsonString: string,
): SafeParseResult<ListRootFoldersGlobals, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListRootFoldersGlobals$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListRootFoldersGlobals' from JSON`,
  );
}

/** @internal */
export const ListRootFoldersRequest$inboundSchema: z.ZodType<
  ListRootFoldersRequest,
  z.ZodTypeDef,
  unknown
> = z.object({});

/** @internal */
export type ListRootFoldersRequest$Outbound = {};

/** @internal */
export const ListRootFoldersRequest$outboundSchema: z.ZodType<
  ListRootFoldersRequest$Outbound,
  z.ZodTypeDef,
  ListRootFoldersRequest
> = z.object({});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ListRootFoldersRequest$ {
  /** @deprecated use `ListRootFoldersRequest$inboundSchema` instead. */
  export const inboundSchema = ListRootFoldersRequest$inboundSchema;
  /** @deprecated use `ListRootFoldersRequest$outboundSchema` instead. */
  export const outboundSchema = ListRootFoldersRequest$outboundSchema;
  /** @deprecated use `ListRootFoldersRequest$Outbound` instead. */
  export type Outbound = ListRootFoldersRequest$Outbound;
}

export function listRootFoldersRequestToJSON(
  listRootFoldersRequest: ListRootFoldersRequest,
): string {
  return JSON.stringify(
    ListRootFoldersRequest$outboundSchema.parse(listRootFoldersRequest),
  );
}

export function listRootFoldersRequestFromJSON(
  jsonString: string,
): SafeParseResult<ListRootFoldersRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListRootFoldersRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListRootFoldersRequest' from JSON`,
  );
}
