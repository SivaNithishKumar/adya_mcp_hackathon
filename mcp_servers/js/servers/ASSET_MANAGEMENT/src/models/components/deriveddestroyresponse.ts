/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export const Deleted = {
  Deleted: "deleted",
  NotFound: "not_found",
} as const;
export type Deleted = ClosedEnum<typeof Deleted>;

export type Invalidation = {
  /**
   * Time taken for CDN invalidation in seconds
   */
  took?: number | undefined;
  /**
   * Array of URLs that were invalidated
   */
  urls?: Array<string> | undefined;
};

/**
 * Response for derived resource deletion
 */
export type DerivedDestroyResponse = {
  /**
   * Map of derived resource IDs to deletion status
   */
  deleted?: { [k: string]: Deleted } | undefined;
  /**
   * Array of derived resource IDs that were not authorized to be deleted
   */
  unauthorized?: Array<string> | undefined;
  invalidation?: Invalidation | undefined;
};

/** @internal */
export const Deleted$inboundSchema: z.ZodNativeEnum<typeof Deleted> = z
  .nativeEnum(Deleted);

/** @internal */
export const Deleted$outboundSchema: z.ZodNativeEnum<typeof Deleted> =
  Deleted$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Deleted$ {
  /** @deprecated use `Deleted$inboundSchema` instead. */
  export const inboundSchema = Deleted$inboundSchema;
  /** @deprecated use `Deleted$outboundSchema` instead. */
  export const outboundSchema = Deleted$outboundSchema;
}

/** @internal */
export const Invalidation$inboundSchema: z.ZodType<
  Invalidation,
  z.ZodTypeDef,
  unknown
> = z.object({
  took: z.number().optional(),
  urls: z.array(z.string()).optional(),
});

/** @internal */
export type Invalidation$Outbound = {
  took?: number | undefined;
  urls?: Array<string> | undefined;
};

/** @internal */
export const Invalidation$outboundSchema: z.ZodType<
  Invalidation$Outbound,
  z.ZodTypeDef,
  Invalidation
> = z.object({
  took: z.number().optional(),
  urls: z.array(z.string()).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Invalidation$ {
  /** @deprecated use `Invalidation$inboundSchema` instead. */
  export const inboundSchema = Invalidation$inboundSchema;
  /** @deprecated use `Invalidation$outboundSchema` instead. */
  export const outboundSchema = Invalidation$outboundSchema;
  /** @deprecated use `Invalidation$Outbound` instead. */
  export type Outbound = Invalidation$Outbound;
}

export function invalidationToJSON(invalidation: Invalidation): string {
  return JSON.stringify(Invalidation$outboundSchema.parse(invalidation));
}

export function invalidationFromJSON(
  jsonString: string,
): SafeParseResult<Invalidation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Invalidation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Invalidation' from JSON`,
  );
}

/** @internal */
export const DerivedDestroyResponse$inboundSchema: z.ZodType<
  DerivedDestroyResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  deleted: z.record(Deleted$inboundSchema).optional(),
  unauthorized: z.array(z.string()).optional(),
  invalidation: z.lazy(() => Invalidation$inboundSchema).optional(),
});

/** @internal */
export type DerivedDestroyResponse$Outbound = {
  deleted?: { [k: string]: string } | undefined;
  unauthorized?: Array<string> | undefined;
  invalidation?: Invalidation$Outbound | undefined;
};

/** @internal */
export const DerivedDestroyResponse$outboundSchema: z.ZodType<
  DerivedDestroyResponse$Outbound,
  z.ZodTypeDef,
  DerivedDestroyResponse
> = z.object({
  deleted: z.record(Deleted$outboundSchema).optional(),
  unauthorized: z.array(z.string()).optional(),
  invalidation: z.lazy(() => Invalidation$outboundSchema).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DerivedDestroyResponse$ {
  /** @deprecated use `DerivedDestroyResponse$inboundSchema` instead. */
  export const inboundSchema = DerivedDestroyResponse$inboundSchema;
  /** @deprecated use `DerivedDestroyResponse$outboundSchema` instead. */
  export const outboundSchema = DerivedDestroyResponse$outboundSchema;
  /** @deprecated use `DerivedDestroyResponse$Outbound` instead. */
  export type Outbound = DerivedDestroyResponse$Outbound;
}

export function derivedDestroyResponseToJSON(
  derivedDestroyResponse: DerivedDestroyResponse,
): string {
  return JSON.stringify(
    DerivedDestroyResponse$outboundSchema.parse(derivedDestroyResponse),
  );
}

export function derivedDestroyResponseFromJSON(
  jsonString: string,
): SafeParseResult<DerivedDestroyResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DerivedDestroyResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DerivedDestroyResponse' from JSON`,
  );
}
