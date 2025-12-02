import type { createHarvestClient } from 'harvest-client';

export type HarvestClient = ReturnType<typeof createHarvestClient>;

export type AdditionalFields = {
  isActive?: boolean;
  page?: number;
  perPage?: number;
  updatedSince?: string;
};
