import dateFns from 'date-fns';
import {patientUtil} from '@openmrs/react-components';
import { ENCOUNTER_TYPES, IDENTIFIER_TYPES } from "./constants";

const utils = {

  formatTime: (datetime) => {
    return dateFns.format(new Date(datetime), 'h[:]mma');
  },

  formatRestDate: (datetime) => {
    return dateFns.format(datetime, 'YYYY-MM-DDTHH:mm:ss.SSS');
  },

  formatReportRestDate: (datetime) => {
    return dateFns.format(datetime, 'YYYY-MM-DD');
  },
  getTodaysDate: () => {
    return dateFns.format(new Date(), 'YYYY-MM-DD');
  },

  getEndOfYesterday: () => {
    return utils.formatRestDate(dateFns.endOfYesterday());
  },

  getPatientArtIdentifier: (patient) => {
    return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE);
  },
  getPatientEidIdentifier: (patient) => {
    return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE);
  },
  getPatientNcdIdentifier: (patient) => {
    return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE);
  },
  getPatientIdentifiers: (patient) => {

    let identifiers = [];
    let id = utils.getPatientArtIdentifier(patient);
    if (id) {
      identifiers.push(id);
    }
    id = utils.getPatientEidIdentifier(patient);
    if (id) {
      identifiers.push(id);
    }
    id = utils.getPatientNcdIdentifier(patient);
    if (id) {
      identifiers.push(id);
    }
    if (identifiers.length > 0) {
      return identifiers.join('<br/>');
    } else {
      return null;
    }


  },
  getPatientCheckedInTime: (patient) => {

    let checkedInTime = null;
    if (typeof patient.visit !== 'undefined' && typeof patient.visit.encounters !== 'undefined') {
      //filter by CheckIn encounter
      let checkedInEncounters = patient.visit.encounters.filter(encounter =>
        encounter.encounterType.uuid === ENCOUNTER_TYPES.CheckInEncounterType.uuid);

      if (checkedInEncounters.length >  0 ) {
        checkedInEncounters.sort(function (a, b) {
          return +new Date(a.encounterDatetime) - +new Date(b.encounterDatetime);
        });
        checkedInTime = utils.formatTime(checkedInEncounters[0].encounterDatetime);
      }
    }

    return checkedInTime;

  },

  getPatientCheckOutTime: (patient) => {

    let checkOutTime = null;
    if (typeof patient.visit !== 'undefined' && patient.visit.stopDatetime !== null) {
      checkOutTime = utils.formatTime(patient.visit.stopDatetime);
    }

    return checkOutTime;
  },

};

export default utils;
