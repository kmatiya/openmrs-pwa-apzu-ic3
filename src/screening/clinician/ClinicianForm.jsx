import React from 'react';
import { connect } from 'react-redux';
import {addDays, addMonths} from 'date-fns';
import { change, formValueSelector, untouch } from 'redux-form';
import {Obs, selectors, formUtil, FormContext} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from '../../constants';
import ScreeningForm from "../ScreeningForm";
import '../../../src/assets/css/ClinicianForm.css';

class ClinicianForm extends React.Component {
  componentDidUpdate(prevProps) {
    const { dispatch, clinicalOutcome,
      clinicalQualitativeTimeField,
      clinicalReasonToStopCareField,
      clinicalNextAppointmentDateField,
      clinicalTransferToAnotherFacilityField  } = this.props;

    if (clinicalOutcome === CONCEPTS.Clinical.TransferToAnotherFacility.uuid || clinicalOutcome === CONCEPTS.Clinical.TransferOutsideOfDistrict.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalNextAppointmentDateField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalNextAppointmentDateField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField));

    } else if (clinicalOutcome === CONCEPTS.Clinical.ExitFromCare.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalNextAppointmentDateField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalNextAppointmentDateField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

    } else if (clinicalOutcome === CONCEPTS.Clinical.Other.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalNextAppointmentDateField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalNextAppointmentDateField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField)); 
    } else if (clinicalOutcome === CONCEPTS.Clinical.FollowUp.uuid) {

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField)); 
    }
  }

  render() {

    const { clinicalOutcome, clinicalNextAppointmentDate } = this.props;
    const formContent = (
      <Grid>
        <Row>
          <Col
            componentClass={ControlLabel}
          >
          Clinical Notes
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup controlId="">
              <Obs
                concept={CONCEPTS.Clinical.ClinicalNotes}
                path="clinical-notes"
                widget="textarea"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col componentClass={ControlLabel}>
          Clinical Outcome
          </Col>
        </Row>
        <Row>
          <FormGroup controlId="">
            <Col sm={12}>
              <Obs
                concept={CONCEPTS.Clinical.Outcome.uuid}
                conceptAnswers={FORM_ANSWERS.clinicalOutcome}
                path="clinical-outcome"
              />
            </Col>
          </FormGroup>
        </Row>
        
        {((typeof clinicalOutcome !== 'undefined' && clinicalOutcome === CONCEPTS.Clinical.FollowUp.uuid) || (clinicalNextAppointmentDate)) && <span>
          <Row>
            <Col componentClass={ControlLabel}>
              Appointment time
            </Col>
          </Row>
          <div style={{ display: 'flex' }}>
            <Obs
              concept={CONCEPTS.Clinical.NextAppointmentDate.uuid}
              datatype="date"
              defaultDate={undefined}
              path="clinical-next-appointment-date"
              usePortalMode
              minDate={addDays(new Date(), 1)}
              maxDate={ addMonths(new Date(), 12) }
            />
            <span style={{ marginLeft: '20px', marginTop: '1px' }}>
              <Obs
                concept={CONCEPTS.Clinical.QualitativeTime.uuid}
                conceptAnswers={FORM_ANSWERS.clinicalQualitativeTime}
                disabled={!clinicalNextAppointmentDate}
                path="clinical-qualitative-time"
              />
            </span>
          </div>
        </span>}
        
        {(typeof clinicalOutcome !== 'undefined' && (clinicalOutcome === CONCEPTS.Clinical.TransferToAnotherFacility.uuid || clinicalOutcome === CONCEPTS.Clinical.TransferOutsideOfDistrict.uuid)) && <span>
          <Row>
            <Col componentClass={ControlLabel}>
            Transfer Facility (Transfer out to location)
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.Clinical.TransferFacility}
                  path="clinical-transfer-to-another-facility"
                  widget="textarea"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>}

        {(typeof clinicalOutcome !== 'undefined' && clinicalOutcome === CONCEPTS.Clinical.ExitFromCare.uuid) && <span>
          <Row>
            <Col componentClass={ControlLabel}>
            Reason to stop care
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.Clinical.ReasonToStopCare}
                  path="clinical-reason-to-stop-care"
                  widget="textarea"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>}

        <FormContext.Consumer>
          {formContext => (<span>
            <Row>
              <Col componentClass={ControlLabel}>
                    Refer to station
              </Col>
            </Row>
            <Row>
              <FormGroup controlId="">
                <Col sm={12}>
                  <div className={formContext.mode === 'edit' ? "refer-to-station-edit-mode" : "refer-to-station-view-mode"}>
                    <Obs
                      concept={CONCEPTS.ReferToScreeningStation}
                      conceptAnswers={[CONCEPTS.NutritionScreeningStation]}
                      path="clinical-refer-to-nutrition-station"
                    />
                    <Obs
                      concept={CONCEPTS.ReferToScreeningStation}
                      conceptAnswers={[CONCEPTS.BloodPressureScreeningStation]}
                      path="clinical-refer-to-blood-pressure-station"
                    />
                    <Obs
                      concept={CONCEPTS.ReferToScreeningStation}
                      conceptAnswers={[CONCEPTS.AdherenceCounselingStation]}
                      path="clinical-refer-to-adherence-station"
                    />
                    <Obs
                      concept={CONCEPTS.ReferToScreeningStation}
                      conceptAnswers={[CONCEPTS.HIVTestingStation]}
                      path="clinical-refer-to-hiv-testing-station"
                    />
                  </div>
                  <div className={formContext.mode === 'edit' ? "refer-to-station-edit-mode" : "refer-to-station-view-mode"}>
                    <Obs
                      concept={CONCEPTS.ReferToScreeningStation}
                      conceptAnswers={[CONCEPTS.ViralLoadTestingStation]}
                      path="clinical-refer-to-viral-load-station"
                    />
                    <Obs
                      concept={CONCEPTS.ReferToScreeningStation}
                      conceptAnswers={[CONCEPTS.TuberculosisSymptomsScreeningStation]}
                      path="clinical-refer-to-tb-screening-station"
                    />
                    <Obs
                      concept={CONCEPTS.ReferToScreeningStation}
                      conceptAnswers={[CONCEPTS.EIDScreeningStation]}
                      path="clinical-refer-to-eid-station"
                    />
                  </div>
                  <div className={formContext.mode === 'edit' ? "refer-to-station-edit-mode quater-width" : "refer-to-station-view-mode"}>
                    <Obs
                      concept={CONCEPTS.ReferToScreeningStation}
                      conceptAnswers={[CONCEPTS.NursingScreeningStation]}
                      path="clinical-refer-to-nursing-station"
                    />
                  </div>
                </Col>
              </FormGroup>
            </Row></span>
          )
          }

        </FormContext.Consumer>
        
      </Grid>
    );

    return (
      <ScreeningForm
        backLink={this.props.backLink}
        encounterType={ENCOUNTER_TYPES.ClinicalPlan}
        formContent={formContent}
        formId="clinician-form"
        formInstanceId={this.props.formInstanceId}
        toastMessage="Clinical Notes Saved"
      />
    );
  }
};


export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const clinicalOutcomeField = formUtil.obsFieldName('clinical-outcome', CONCEPTS.Clinical.Outcome.uuid);
  const clinicalQualitativeTimeField = formUtil.obsFieldName('clinical-qualitative-time', CONCEPTS.Clinical.QualitativeTime.uuid);
  const clinicalReasonToStopCareField = formUtil.obsFieldName('clinical-reason-to-stop-care', CONCEPTS.Clinical.ReasonToStopCare.uuid);
  const clinicalTransferToAnotherFacilityField = formUtil.obsFieldName('clinical-transfer-to-another-facility', CONCEPTS.Clinical.TransferFacility.uuid);
  const clinicalNextAppointmentDateField = formUtil.obsFieldName('clinical-next-appointment-date', CONCEPTS.Clinical.NextAppointmentDate.uuid);

  const clinicalOutcome = selector(state, clinicalOutcomeField);
  const clinicalNextAppointmentDate = selector(state, clinicalNextAppointmentDateField);

  return {
    clinicalOutcome,
    clinicalQualitativeTimeField,
    clinicalReasonToStopCareField,
    clinicalTransferToAnotherFacilityField,
    clinicalNextAppointmentDateField,
    clinicalNextAppointmentDate,
    patient: selectors.getSelectedPatientFromStore(state),
  };
})(ClinicianForm);
