/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * The storage type of the asset. Defaults to 'upload'.
 */
export const Kind = {
  Upload: "upload",
  Private: "private",
  Authenticated: "authenticated",
} as const;
/**
 * The storage type of the asset. Defaults to 'upload'.
 */
export type Kind = ClosedEnum<typeof Kind>;

/**
 * Status information returned for in-progress chunked uploads.
 *
 * @remarks
 * Note that fields that are not yet determined or not known at the time of the call are omitted from the response.
 */
export type NonFinalChunkUploadResponse = {
  /**
   * Whether the upload is complete. Will be false for all but the last chunk.
   */
  done: boolean;
  /**
   * The total number of bytes uploaded so far.
   */
  bytes: number;
  /**
   * The storage type of the asset. Defaults to 'upload'.
   */
  kind?: Kind | undefined;
  /**
   * The type of resource being uploaded (e.g., "image", "video", "raw"). May be omitted in early chunks when using auto detection.
   */
  resourceType?: string | undefined;
  /**
   * The public ID assigned to the upload. May be omitted in early chunks if it will be auto-generated upon completion.
   */
  publicId?: string | undefined;
};

/** @internal */
export const Kind$inboundSchema: z.ZodNativeEnum<typeof Kind> = z.nativeEnum(
  Kind,
);

/** @internal */
export const Kind$outboundSchema: z.ZodNativeEnum<typeof Kind> =
  Kind$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Kind$ {
  /** @deprecated use `Kind$inboundSchema` instead. */
  export const inboundSchema = Kind$inboundSchema;
  /** @deprecated use `Kind$outboundSchema` instead. */
  export const outboundSchema = Kind$outboundSchema;
}

/** @internal */
export const NonFinalChunkUploadResponse$inboundSchema: z.ZodType<
  NonFinalChunkUploadResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  done: z.boolean(),
  bytes: z.number().int(),
  kind: Kind$inboundSchema.optional(),
  resource_type: z.string().optional(),
  public_id: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    "resource_type": "resourceType",
    "public_id": "publicId",
  });
});

/** @internal */
export type NonFinalChunkUploadResponse$Outbound = {
  done: boolean;
  bytes: number;
  kind?: string | undefined;
  resource_type?: string | undefined;
  public_id?: string | undefined;
};

/** @internal */
export const NonFinalChunkUploadResponse$outboundSchema: z.ZodType<
  NonFinalChunkUploadResponse$Outbound,
  z.ZodTypeDef,
  NonFinalChunkUploadResponse
> = z.object({
  done: z.boolean(),
  bytes: z.number().int(),
  kind: Kind$outboundSchema.optional(),
  resourceType: z.string().optional(),
  publicId: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    resourceType: "resource_type",
    publicId: "public_id",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace NonFinalChunkUploadResponse$ {
  /** @deprecated use `NonFinalChunkUploadResponse$inboundSchema` instead. */
  export const inboundSchema = NonFinalChunkUploadResponse$inboundSchema;
  /** @deprecated use `NonFinalChunkUploadResponse$outboundSchema` instead. */
  export const outboundSchema = NonFinalChunkUploadResponse$outboundSchema;
  /** @deprecated use `NonFinalChunkUploadResponse$Outbound` instead. */
  export type Outbound = NonFinalChunkUploadResponse$Outbound;
}

export function nonFinalChunkUploadResponseToJSON(
  nonFinalChunkUploadResponse: NonFinalChunkUploadResponse,
): string {
  return JSON.stringify(
    NonFinalChunkUploadResponse$outboundSchema.parse(
      nonFinalChunkUploadResponse,
    ),
  );
}

export function nonFinalChunkUploadResponseFromJSON(
  jsonString: string,
): SafeParseResult<NonFinalChunkUploadResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => NonFinalChunkUploadResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'NonFinalChunkUploadResponse' from JSON`,
  );
}
