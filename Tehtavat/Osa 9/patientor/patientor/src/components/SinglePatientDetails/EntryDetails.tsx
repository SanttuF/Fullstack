import { Diagnosis, Entry, HealthCheckRating } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({
  diagnoses,
  entry,
}: {
  diagnoses: Diagnosis[];
  entry: Entry;
}) => {
  const style = {
    borderStyle: "solid",
    padding: 10,
    marginBottom: 10,
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div style={style}>
          <div>
            <strong>
              {entry.date} {entry.type}
            </strong>
          </div>
          <div>{entry.description}</div>
          <div>
            <strong>Discharge date and criteria: </strong>
            {entry.discharge.date} {entry.discharge.criteria}
          </div>
          <div>
            <strong>Diagnosed by </strong>
            {entry.specialist}
          </div>
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div style={style}>
          <div>
            <strong>
              {entry.date} {entry.type}
            </strong>
          </div>
          <div>{entry.description}</div>
          <div>
            <strong>Diagnosed by </strong>
            {entry.specialist}
          </div>
        </div>
      );

    case "HealthCheck":
      return (
        <div style={style}>
          <div>
            <strong>
              {entry.date} {entry.type}
            </strong>
          </div>
          <div>{entry.description}</div>
          <div>
            <strong>Rating: </strong>
            {HealthCheckRating[entry.healthCheckRating]}
          </div>
          <div>
            <strong>Diagnosed by </strong>
            {entry.specialist}
          </div>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
