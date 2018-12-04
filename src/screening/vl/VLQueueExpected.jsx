import React from 'react';
import { connect } from "react-redux";
import {patientActions, CardList, selectors} from '@openmrs/react-components';
import { BASIC_GRID, COLUMN_DEFS, PATIENT_IDENTIFIER_FILTERS } from "../../gridConstants";
import vlFilters from "./vlFilters";
import {push} from "connected-react-router";


class VLQueueExpected extends React.Component {

  constructor(props) {
    super(props);
    this.columnDefs = [
      ...BASIC_GRID,
      COLUMN_DEFS.ACTIONS,
      COLUMN_DEFS.APPOINTMENT_DATE
    ];

    this.onMountOtherActionCreators = this.onMountOtherActionCreators.bind(this);
    this.redirectToCheckinPageActionCreator = this.redirectToCheckinPageActionCreator.bind(this);
  }

  onMountOtherActionCreators() {
    this.props.dispatch(patientActions.clearSelectedPatient());
  }

  redirectToCheckinPageActionCreator() {
    return push('/checkin/checkInPage');
  }

  render() {
    return (
      <div>
        <CardList
          filters={[vlFilters.expected]}
          onMountOtherActionCreators={ [this.onMountOtherActionCreators] }
          rowData={Object.values( this.props.patients )}
          rowSelectedActionCreators={[patientActions.setSelectedPatient, this.redirectToCheckinPageActionCreator]}
          title=""
          optionalFilters={ PATIENT_IDENTIFIER_FILTERS }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  }
};

export default connect(mapStateToProps)(VLQueueExpected);
