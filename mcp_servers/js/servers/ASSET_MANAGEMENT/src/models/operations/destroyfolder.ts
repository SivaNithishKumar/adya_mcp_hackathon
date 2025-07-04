/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type DestroyFolderGlobals = {
  /**
   * The cloud name of your product environment.
   */
  cloudName?: string | undefined;
};

export type DestroyFolderRequest = {
  folder: string;
};

/**
 * Folder deleted successfully
 */
export type DestroyFolderResponse = {
  /**
   * List of deleted folder paths
   */
  deleted: Array<string>;
};

/** @internal */
export const DestroyFolderGlobals$inboundSchema: z.ZodType<
  DestroyFolderGlobals,
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
export type DestroyFolderGlobals$Outbound = {
  cloud_name?: string | undefined;
};

/** @internal */
export const DestroyFolderGlobals$outboundSchema: z.ZodType<
  DestroyFolderGlobals$Outbound,
  z.ZodTypeDef,
  DestroyFolderGlobals
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
export namespace DestroyFolderGlobals$ {
  /** @deprecated use `DestroyFolderGlobals$inboundSchema` instead. */
  export const inboundSchema = DestroyFolderGlobals$inboundSchema;
  /** @deprecated use `DestroyFolderGlobals$outboundSchema` instead. */
  export const outboundSchema = DestroyFolderGlobals$outboundSchema;
  /** @deprecated use `DestroyFolderGlobals$Outbound` instead. */
  export type Outbound = DestroyFolderGlobals$Outbound;
}

export function destroyFolderGlobalsToJSON(
  destroyFolderGlobals: DestroyFolderGlobals,
): string {
  return JSON.stringify(
    DestroyFolderGlobals$outboundSchema.parse(destroyFolderGlobals),
  );
}

export function destroyFolderGlobalsFromJSON(
  jsonString: string,
): SafeParseResult<DestroyFolderGlobals, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DestroyFolderGlobals$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DestroyFolderGlobals' from JSON`,
  );
}

/** @internal */
export const DestroyFolderRequest$inboundSchema: z.ZodType<
  DestroyFolderRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  folder: z.string(),
});

/** @internal */
export type DestroyFolderRequest$Outbound = {
  folder: string;
};

/** @internal */
export const DestroyFolderRequest$outboundSchema: z.ZodType<
  DestroyFolderRequest$Outbound,
  z.ZodTypeDef,
  DestroyFolderRequest
> = z.object({
  folder: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DestroyFolderRequest$ {
  /** @deprecated use `DestroyFolderRequest$inboundSchema` instead. */
  export const inboundSchema = DestroyFolderRequest$inboundSchema;
  /** @deprecated use `DestroyFolderRequest$outboundSchema` instead. */
  export const outboundSchema = DestroyFolderRequest$outboundSchema;
  /** @deprecated use `DestroyFolderRequest$Outbound` instead. */
  export type Outbound = DestroyFolderRequest$Outbound;
}

export function destroyFolderRequestToJSON(
  destroyFolderRequest: DestroyFolderRequest,
): string {
  return JSON.stringify(
    DestroyFolderRequest$outboundSchema.parse(destroyFolderRequest),
  );
}

export function destroyFolderRequestFromJSON(
  jsonString: string,
): SafeParseResult<DestroyFolderRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DestroyFolderRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DestroyFolderRequest' from JSON`,
  );
}

/** @internal */
export const DestroyFolderResponse$inboundSchema: z.ZodType<
  DestroyFolderResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  deleted: z.array(z.string()),
});

/** @internal */
export type DestroyFolderResponse$Outbound = {
  deleted: Array<string>;
};

/** @internal */
export const DestroyFolderResponse$outboundSchema: z.ZodType<
  DestroyFolderResponse$Outbound,
  z.ZodTypeDef,
  DestroyFolderResponse
> = z.object({
  deleted: z.array(z.string()),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DestroyFolderResponse$ {
  /** @deprecated use `DestroyFolderResponse$inboundSchema` instead. */
  export const inboundSchema = DestroyFolderResponse$inboundSchema;
  /** @deprecated use `DestroyFolderResponse$outboundSchema` instead. */
  export const outboundSchema = DestroyFolderResponse$outboundSchema;
  /** @deprecated use `DestroyFolderResponse$Outbound` instead. */
  export type Outbound = DestroyFolderResponse$Outbound;
}

export function destroyFolderResponseToJSON(
  destroyFolderResponse: DestroyFolderResponse,
): string {
  return JSON.stringify(
    DestroyFolderResponse$outboundSchema.parse(destroyFolderResponse),
  );
}

export function destroyFolderResponseFromJSON(
  jsonString: string,
): SafeParseResult<DestroyFolderResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DestroyFolderResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DestroyFolderResponse' from JSON`,
  );
}
