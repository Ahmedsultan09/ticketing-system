import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { useParams } from "react-router-dom";
import OperatorInfo from "./operatorInfo";

function SpecificOperator() {
  const params = useParams();
  const id = params.operatorsID;

  const [SpecificOperator, setSpecificOperator] = useState(null);
  useEffect(() => {
    async function fetchSepecificOperator() {
      const allOperators = (await axiosInstance.get("/operators")).data;
      if (allOperators) {
        const SpecificOperator = allOperators?.find(
          (operator) => parseInt(operator?.id) === parseInt(id)
        );
        setSpecificOperator(SpecificOperator);
      }
    }
    fetchSepecificOperator();
  }, [id]);
  return (
    <main className="w-full min-h-screen flex flex-row relative">
      {SpecificOperator && (
        <OperatorInfo
          name={SpecificOperator.name}
          email={SpecificOperator.email}
          phone={SpecificOperator.phone}
          address={SpecificOperator.address}
          createdTickets={SpecificOperator.ticketsCreated}
          client={SpecificOperator.client}
          id={id}
        />
      )}
    </main>
  );
}

export default SpecificOperator;
