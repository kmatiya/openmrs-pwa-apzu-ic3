import React from 'react';
import {reduxForm} from 'redux-form';
import CompletedScreenings from "../screening/CompletedScreenings";
import { Alert, Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';
import { goBack } from 'connected-react-router';


let CheckinForm = props => {

  const { handleSubmit, submitting, patient } = props;

  const historyBack = () => {
    props.dispatch(goBack());
  };

  return (
    <div>
      <Button bsSize='large' bsStyle='danger' onClick={historyBack.bind(this)}>
        Back
      </Button>
      <h3><Label>Check-in</Label></h3>
      <Form
        horizontal
        onSubmit={handleSubmit}
      >
        <Grid>

          { (typeof patient !== 'undefined') && (patient !== null) &&
            (typeof patient.alert !== 'undefined') && (patient.alert.length > 0) &&
            <Row>
              <FormGroup controlId="formAlert">
                <Col
                  componentClass={ControlLabel}
                  sm={2}
                >
              Alert
                </Col>
                <Col
                  sm={4}
                >
                  <Alert bsStyle="danger">
                    { patient.alert }
                  </Alert>
                </Col>
              </FormGroup>
            </Row>
          }

          { (typeof patient !== 'undefined') && (patient !== null) &&
            (typeof patient.actions !== 'undefined') && (patient.actions !== patient.alert) &&
          <Row>
            <FormGroup controlId="formAction">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
              Action
              </Col>
              <Col sm={4}>
                <Alert bsStyle="warning">
                  { patient.actions }
                </Alert>
              </Col>
            </FormGroup>
          </Row>
          }

          {!(patient && patient.visit && patient.visit.encounters) &&
          <Row>
            <FormGroup controlId="formSubmit">
              <Col
                sm={4}
                smOffset={2}
              >
                <ButtonToolbar>
                  <Button
                    bsSize="large"
                    bsStyle="success"
                    disabled={submitting}
                    type="submit"
                  >
                    Check-in
                  </Button>

                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Row>
          }

          {(patient && patient.visit && patient.visit.encounters) &&
            <div>
              <h3><Label>Completed Screenings</Label></h3>
              <CompletedScreenings/>
            </div>
          }
        </Grid>
      </Form>
    </div>
  );
};


CheckinForm = reduxForm({
  form: 'checkInForm', // a unique identifier for this form
})(CheckinForm);


export default CheckinForm;

