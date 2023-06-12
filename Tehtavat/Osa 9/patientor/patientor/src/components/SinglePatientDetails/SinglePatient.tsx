import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient, Entry, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";

const SinglePatient = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const id = useParams().id;
  if (!id) throw new Error("no id");

  useEffect(() => {
    patientService.getId(id).then((res) => setPatient(res));
  }, [id]);

  const style = {
    borderStyle: "solid",
  };

  if (!patient) return <>loading...</>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>gender: {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((e: Entry) => (
        <EntryDetails key={e.id} diagnoses={diagnoses} entry={e} />
      ))}
    </div>
  );
};

export default SinglePatient;
