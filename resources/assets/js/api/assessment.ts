/* eslint-disable @typescript-eslint/camelcase */
import { ResponseData, baseUrl } from "./base";
import { Assessment } from "../models/types";

export const parseAssessment = (data: ResponseData): Assessment => ({
  id: Number(data.id),
  criterion_id: Number(data.criterion_id),
  assessment_type_id: Number(data.assessment_type_id),
});

export const assessmentEndpoint = (id?: number): string =>
  id ? `${baseUrl()}/assessments/${id}` : `${baseUrl()}/assessments`;
