import { Action } from "../createAction";
import {
  assessmentEndpoint,
  parseAssessment,
} from "../../api/assessment";
import { Assessment, TempAssessment } from "../../models/types";
import {
  FailedAction,
  AsyncFsaActions,
  RSAActionTemplate,
  asyncPut,
  asyncPost,
  asyncDelete,
} from "../asyncAction";

/** Action for editing Assessments (without saving to server) */
export const EDIT_ASSESSMENT = "EDIT_ASSESSMENT";
export type EditAssessmentAction = Action<
  typeof EDIT_ASSESSMENT,
  { assessment: Assessment }
>;
export const editAssessment = (
  assessment: Assessment,
): EditAssessmentAction => ({
  type: EDIT_ASSESSMENT,
  payload: { assessment },
});

/** Actions for manipulating Temp Assessments */
export const CREATE_TEMP_ASSESSMENT = "CREATE_TEMP_ASSESSMENT";
export const EDIT_TEMP_ASSESSMENT = "EDIT_TEMP_ASSESSMENT";
export const DELETE_TEMP_ASSESSMENT = "DELETE_TEMP_ASSESSMENT";

export type CreateTempAssessmentAction = Action<
  typeof CREATE_TEMP_ASSESSMENT,
  { criterionId: number; assessmentTypeId: number | null }
>;

export type EditTempAssessmentAction = Action<
  typeof EDIT_TEMP_ASSESSMENT,
  { assessment: TempAssessment }
>;

export type DeleteTempAssessmentAction = Action<
  typeof DELETE_TEMP_ASSESSMENT,
  { id: number }
>;

export const createTempAssessment = (
  criterionId: number,
  assessmentTypeId: number | null,
): CreateTempAssessmentAction => ({
  type: CREATE_TEMP_ASSESSMENT,
  payload: { criterionId, assessmentTypeId },
});

export const editTempAssessment = (
  assessment: TempAssessment,
): EditTempAssessmentAction => ({
  type: EDIT_TEMP_ASSESSMENT,
  payload: { assessment },
});

export const deleteTempAssessment = (
  id: number,
): DeleteTempAssessmentAction => ({
  type: DELETE_TEMP_ASSESSMENT,
  payload: { id },
});

/** Updating Assessments on Server */

export const UPDATE_ASSESSMENT_STARTED = "UPDATE_ASSESSMENT_STARTED";
export const UPDATE_ASSESSMENT_SUCCEEDED = "UPDATE_ASSESSMENT_SUCCEEDED";
export const UPDATE_ASSESSMENT_FAILED = "UPDATE_ASSESSMENT_FAILED";

export type UpdateAssessmentAction = AsyncFsaActions<
  typeof UPDATE_ASSESSMENT_STARTED,
  typeof UPDATE_ASSESSMENT_SUCCEEDED,
  typeof UPDATE_ASSESSMENT_FAILED,
  Assessment,
  { id: number; update: Assessment }
>;

export const updateAssessment = (
  assessment: Assessment,
): RSAActionTemplate<
  typeof UPDATE_ASSESSMENT_STARTED,
  typeof UPDATE_ASSESSMENT_SUCCEEDED,
  typeof UPDATE_ASSESSMENT_FAILED,
  Assessment,
  { id: number; update: Assessment }
> =>
  asyncPut(
    assessmentEndpoint(assessment.id),
    assessment,
    UPDATE_ASSESSMENT_STARTED,
    UPDATE_ASSESSMENT_SUCCEEDED,
    UPDATE_ASSESSMENT_FAILED,
    parseAssessment,
    { id: assessment.id, update: assessment },
  );

/** Deleting Assessments on server */

export const DELETE_ASSESSMENT_STARTED = "DELETE_ASSESSMENT_STARTED";
export const DELETE_ASSESSMENT_SUCCEEDED = "DELETE_ASSESSMENT_SUCCEEDED";
export const DELETE_ASSESSMENT_FAILED = "DELETE_ASSESSMENT_FAILED";

export type DeleteAssessmentAction = AsyncFsaActions<
  typeof DELETE_ASSESSMENT_STARTED,
  typeof DELETE_ASSESSMENT_SUCCEEDED,
  typeof DELETE_ASSESSMENT_FAILED,
  {},
  { id: number }
>;

export const deleteAssessment = (
  id: number,
): RSAActionTemplate<
  typeof DELETE_ASSESSMENT_STARTED,
  typeof DELETE_ASSESSMENT_SUCCEEDED,
  typeof DELETE_ASSESSMENT_FAILED,
  {},
  { id: number }
> =>
  asyncDelete(
    assessmentEndpoint(id),
    DELETE_ASSESSMENT_STARTED,
    DELETE_ASSESSMENT_SUCCEEDED,
    DELETE_ASSESSMENT_FAILED,
    () => ({}),
    { id },
  );


/** Actions for saving a NEW assessment to server */
export const STORE_NEW_ASSESSMENT_STARTED = "STORE_ASSESSMENT_STARTED";
export const STORE_NEW_ASSESSMENT_SUCCEEDED = "STORE_ASSESSMENT_SUCCEEDED";
export const STORE_NEW_ASSESSMENT_FAILED = "STORE_ASSESSMENT_FAILED";

export type CreateAssessmentAction = AsyncFsaActions<
  typeof STORE_NEW_ASSESSMENT_STARTED,
  typeof STORE_NEW_ASSESSMENT_SUCCEEDED,
  typeof STORE_NEW_ASSESSMENT_FAILED,
  Assessment,
  { tempId: number; tempAssessment: Assessment }
>;

export const createAssessment = (
  assessment: Assessment,
): RSAActionTemplate<
  typeof STORE_NEW_ASSESSMENT_STARTED,
  typeof STORE_NEW_ASSESSMENT_SUCCEEDED,
  typeof STORE_NEW_ASSESSMENT_FAILED,
  Assessment,
  { tempId: number; tempAssessment: Assessment }
> =>
  asyncPost(
    assessmentEndpoint(),
    assessment,
    STORE_NEW_ASSESSMENT_STARTED,
    STORE_NEW_ASSESSMENT_SUCCEEDED,
    STORE_NEW_ASSESSMENT_FAILED,
    parseAssessment,
    { tempId: assessment.id, tempAssessment: assessment },
  );

export type AssessmentAction =
  | EditAssessmentAction
  | UpdateAssessmentAction
  | DeleteAssessmentAction
  | CreateTempAssessmentAction
  | EditTempAssessmentAction
  | DeleteTempAssessmentAction
  | CreateAssessmentAction;
