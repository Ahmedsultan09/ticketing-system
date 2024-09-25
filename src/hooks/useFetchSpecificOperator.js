import React, { useEffect, useState } from "react";
import axiosInstance from "src/api/axiosInstance";

function useFetchSpecificOperator(operatorId) {
  const [specificOperator, setSpecificOperator] = useState({});

  useEffect(() => {
    async function fetchSpecificOperator() {
      const response = await axiosInstance.get("/operators");
      const operators = await response.data;
      const specificOperator = await operators?.find(
        (operator) => parseInt(operatorId) === parseInt(operator?.id)
      );
      setSpecificOperator(specificOperator);
    }
    fetchSpecificOperator();
  }, [operatorId]);
  return specificOperator;
}

export default useFetchSpecificOperator;
