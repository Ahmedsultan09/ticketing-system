import { DataGrid } from "@mui/x-data-grid";
import { Link as Direct } from "react-router-dom";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Header from "src/ui/components/header";
import useFetchSpecificOperator from "src/hooks/useFetchSpecificOperator";
import CreateIssueModal from "../tickets/createIssueModal";
import useFetchTroubleshooting from "src/hooks/useFetchTroubleshooting";

export default function OperatorTroubleshooting({ type, operatorId }) {
  const [rows, setRows] = useState([]);
  const [isManager] = useState(false);
  const columns = [
    {
      field: "id",
      headerName: "Issue Number",
      flex: 1,
      width: 130,
      minWidth: 100,
      renderCell: (params) => (
        <Direct
          to={`/troubleshooting/${params.value}`}
          className="w-full text-blue-500 flex items-center justify-center"
        >
          {params.value}
        </Direct>
      ),

      headerAlign: "center",
    },
    {
      field: "client",
      headerName: "Client",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <BusinessIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "branch",
      headerName: "Branch",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <LocationOnOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "machineModel",
      headerName: "Machine Model",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <PrintOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <SubtitlesOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },

    {
      field: "issueDate",
      headerName: "Issue Date",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <CalendarMonthOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },

    {
      field: "operator",
      headerName: "Solved By",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <SupervisedUserCircleOutlined />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },

    ...(isManager
      ? [
          {
            field: "operatorDelay",
            headerName: "Operator Delay",
            flex: 1,
            width: 130,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
          },
        ]
      : []),
  ];

  const specificOperator = useFetchSpecificOperator(operatorId);
  const troubleshooting = useFetchTroubleshooting();
  useEffect(() => {
    const filteredTroubleshooting = troubleshooting.filter((issue) => {
      return issue?.client === specificOperator.client;
    });
    setRows(filteredTroubleshooting);
  }, [specificOperator, troubleshooting]);
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <div className="border-t border-gray-400">
        <Header
          title="Troubleshooting"
          description={`Here you can find all troubleshooting made for ${specificOperator.client}`}
          btnComponent={<CreateIssueModal btnOnly={true} />}
        />
      </div>

      <DataGrid
        sx={{
          boxShadow: 2,
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        autoHeight
        autoWidth
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
