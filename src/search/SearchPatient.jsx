import React from 'react';
import { PatientSearch } from '@openmrs/react-components';
import { push } from 'connected-react-router';
import patientActions from '../patient/patientActions';
import IdentifierFilters from '../screening/IdentifierFilters';


let SearchPatient = (props) => {
  return (
    <div>
      <h3>Search for Patient</h3>
      <PatientSearch
        AdditionalFilters={IdentifierFilters}
        rowSelectedActionCreators={[
          patientActions.getIC3PatientScreeningData,
          () => push('/checkin/checkInPage')
        ]}
      />
    </div>
  );
};

export default SearchPatient;
