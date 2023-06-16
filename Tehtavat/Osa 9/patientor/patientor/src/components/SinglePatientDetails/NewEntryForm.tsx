import { useState } from "react";
import { Diagnosis, NewEntry, Patient } from "../../types";
import patientService from "../../services/patients";
import { isAxiosError } from "axios";

const HealthCheck = ({
  setHealthCheckRating,
  healthCheckRating,
}: {
  healthCheckRating: number;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <label>
      Healthcheck rating
      <select
        name="healthCheckRating"
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </label>
  );
};
const Hospital = ({
  setDischargeCriteria,
  setDischargeDate,
  dischargeCriteria,
  dischargeDate,
}: {
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  dischargeDate: string;
}) => {
  return (
    <div>
      <label>
        Discharge date
        <input
          type="date"
          name="dischargeDate"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
      </label>
      <label>
        Discharge criteria
        <input
          type="text"
          name="dischargeCriteria"
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
      </label>
    </div>
  );
};
const OccupationalHealthcare = ({
  setEmployerName,
  setEndDate,
  setStartDate,
  employerName,
  endDate,
  startDate,
}: {
  employerName: string;
  endDate: string;
  startDate: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <div>
        <label>
          Employer name
          <input
            type="text"
            name="employerName"
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Sick leave <br />
          <label>
            Start date
            <input
              type="date"
              name="sickLeaveStart"
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
          </label>
          <label>
            End date
            <input
              type="date"
              name="sickLeaveEnd"
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </label>
        </label>
      </div>
    </div>
  );
};

const NewEntryForm = ({
  patient,
  setPatient,
  diagnoses,
}: {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  diagnoses: Diagnosis[];
}) => {
  const style = {
    borderStyle: "dotted",
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  };

  const [error, setError] = useState("");

  const [type, setType] = useState("Hospital");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const codes = diagnoses.map((c) => c.code);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entry = {
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    if (type === "Hospital") {
      const hEntry: NewEntry = {
        ...entry,
        type: "Hospital",
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      };
      try {
        const p = await patientService.addEntry(patient.id, hEntry);
        setPatient(p);
      } catch (e) {
        if (isAxiosError(e)) {
          showError(e.response?.data);
        }
      }
    } else if (type === "HealthCheck") {
      const heEntry: NewEntry = {
        ...entry,
        type: "HealthCheck",
        healthCheckRating,
      };
      try {
        const p = await patientService.addEntry(patient.id, heEntry);
        setPatient(p);
      } catch (e) {
        if (isAxiosError(e)) {
          showError(e.response?.data);
        }
      }
    } else if (type === "OccupationalHealthcare") {
      const oEntry: NewEntry = {
        ...entry,
        type: "OccupationalHealthcare",
        employerName,
      };
      if (startDate !== "" && endDate !== "") {
        oEntry.sickLeave = { startDate, endDate };
      }
      try {
        const p = await patientService.addEntry(patient.id, oEntry);
        setPatient(p);
      } catch (e) {
        if (isAxiosError(e)) {
          showError(e.response?.data);
        }
      }
    }

    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);

    setHealthCheckRating(0);
    setStartDate("");
    setEndDate("");
    setEmployerName("");
    setDischargeCriteria("");
    setDischargeDate("");
  };

  const showError = (msg: string): void => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  return (
    <div style={style}>
      {error !== "" && <p style={{ color: "red" }}>{error}</p>}

      <h3> New entry </h3>
      <fieldset>
        <legend>Choose entry type</legend>
        <label>
          <input
            type="radio"
            value={type}
            name="type"
            onChange={() => setType("Hospital")}
            defaultChecked
          />
          Hospital
        </label>
        <label>
          <input
            type="radio"
            value={type}
            name="type"
            onChange={() => setType("HealthCheck")}
          />
          Health check
        </label>
        <label>
          <input
            type="radio"
            value={type}
            name="type"
            onChange={() => setType("OccupationalHealthcare")}
          />
          Occupational healthcare
        </label>
      </fieldset>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Date
            <input
              type="date"
              name="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Specialist
            <input
              type="text"
              name="specialist"
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
          </label>
        </div>
        <div>
          {type === "HealthCheck" && (
            <HealthCheck
              setHealthCheckRating={setHealthCheckRating}
              healthCheckRating={healthCheckRating}
            />
          )}
          {type === "Hospital" && (
            <Hospital
              setDischargeDate={setDischargeDate}
              setDischargeCriteria={setDischargeCriteria}
              dischargeCriteria={dischargeCriteria}
              dischargeDate={dischargeDate}
            />
          )}
          {type === "OccupationalHealthcare" && (
            <OccupationalHealthcare
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setEmployerName={setEmployerName}
              startDate={startDate}
              endDate={endDate}
              employerName={employerName}
            />
          )}
        </div>
        <div>
          <label>
            Diagnosis codes
            <select
              name="diagnosisCodes"
              onChange={({ target }) => {
                const v = [];
                for (let i = 0; i < target.options.length; i++) {
                  if (target.options[i].selected) {
                    v.push(target.options[i].value);
                  }
                  setDiagnosisCodes(v);
                }
              }}
              multiple={true}
            >
              {codes.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">add entry</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
