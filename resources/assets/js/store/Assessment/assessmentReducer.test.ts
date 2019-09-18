/* eslint-disable @typescript-eslint/camelcase */
import { Assessment } from "../../models/types";
import assessmentReducer, {
  initState as initAssessment,
  AssessmentState,
  deleteEditedIfIdentical,
} from "./assessmentReducer";
import { StartedAction, SucceededAction } from "../asyncAction";
import {
  UPDATE_ASSESSMENT_STARTED,
  UPDATE_ASSESSMENT_SUCCEEDED,
} from "./assessmentActions";

describe("Assessment Reducer tests", (): void => {
  describe("deleteIfIdentical", () => {
    test("Should delete item that's a new object with matching data.", (): void => {
      const list = {
        2: { id: 2, criterion_id: 5, assessment_type_id: 3 },
        5: { id: 5, criterion_id: 8, assessment_type_id: 3 },
      };
      const toRemove = { id: 5, criterion_id: 8, assessment_type_id: 3 };
      const expected = {
        2: { id: 2, criterion_id: 5, assessment_type_id: 3 },
      };
      expect(deleteEditedIfIdentical(list, toRemove)).toEqual(expected);
    });
  });
  describe("Update Assessment", () => {
     const fakeAssessment = (id: number): Assessment => ({
       id,
       criterion_id: id,
       assessment_type_id: 1,
     });
     const startedAction: StartedAction<
       typeof UPDATE_ASSESSMENT_STARTED,
       { id: number; update: Assessment }
     > = {
       type: UPDATE_ASSESSMENT_STARTED,
       meta: { id: 1, update: fakeAssessment(1) },
     };
     const succeededAction: SucceededAction<
       typeof UPDATE_ASSESSMENT_SUCCEEDED,
       Assessment,
       { id: number; update: Assessment }
     > = {
       type: UPDATE_ASSESSMENT_SUCCEEDED,
       payload: fakeAssessment(1),
       meta: { id: 1, update: fakeAssessment(1) },
     };

    test("A job should be still be updating if 2 updates have started and one has finished", (): void => {
      const state: AssessmentState = {
        ...initAssessment(),
        assessments: {
          1: fakeAssessment(1),
        },
      };
      const state2 = assessmentReducer(state, startedAction);
      const state3 = assessmentReducer(state2, startedAction);
      const state4 = assessmentReducer(state3, succeededAction);
      expect(state4.assessmentUpdates[1]).toBeGreaterThan(0);
    });
  });
});
