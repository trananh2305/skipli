import { Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/Table";
import { useState, useEffect } from "react";
import { deleteEmployee, getAllEmployeeAPI } from "../../services";
import FormCreateEmployee from "../../components/FormCreateEmployee";

const ManagementEmployee = () => {
  const [isShowForm, setIsShowForm] = useState(false);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const employeeData = await getAllEmployeeAPI();
      setData(employeeData);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleDeleteEmployee = async (email) => {
    try {
      const res = await deleteEmployee(email);
      if (res.success) {
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="size-full relative">
      <div className="size-full px-6 flex flex-col">
        <div className="w-full py-4 text-2xl font-semibold">
          Manage Employee
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">Employee</div>
            <div className="flex gap-4 items-center mr-8">
              <button
                className="border-2 border-[#2C7BE5] px-2 py-1 text-[#2C7BE5] flex gap-1 items-center bg-[#E7F1FF] hover:cursor-pointer"
                onClick={() => setIsShowForm(true)}
              >
                <Plus size={18} />
                Create Employee
              </button>
              <div className="flex items-center bg-white p-2 w-[7vw] relative border border-slate-200">
                <Search
                  size={20}
                  color="#6F767E"
                  className="z-10 pointer-events-none"
                />
                <input
                  placeholder="Filter"
                  className="text-sm px-5 py-1 border-none outline-none absolute w-full ml-4 bg-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <Table className="mt-5">
              <TableHeader className="text-sm bg-slate-100 border-none">
                <TableRow className="!border-none">
                  <TableHead className="text-center w-[30%]">
                    Employee Name
                  </TableHead>
                  <TableHead className="text-center w-[30%]">Email</TableHead>
                  <TableHead className="text-center w-[20%]">Status</TableHead>
                  <TableHead className="text-center w-[20%]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data || [])
                  .filter(
                    (item) =>
                      item.name.toLowerCase().includes(search.toLowerCase()) ||
                      item.email.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item, index) => (
                    <TableRow className="font-medium" key={index}>
                      <TableCell className="text-center">{item.name}</TableCell>
                      <TableCell className="text-center">
                        {item.email}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-3 py-1 rounded text-xs border ${
                            item.active
                              ? "text-green-500 border-green-500"
                              : "text-red-500 border-red-500"
                          }`}
                        >
                          {item.active ? "Active" : "Not Active"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-4">
                          <button className="border px-3 py-1 rounded text-white bg-[#2C7BE5] hover:cursor-pointer">
                            Edit
                          </button>
                          <button
                            className="border px-3 py-1 rounded text-white bg-red-500 hover:cursor-pointer"
                            onClick={() => handleDeleteEmployee(item.email)}
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {isShowForm && (
        <FormCreateEmployee
          isShowForm={isShowForm}
          setIsShowForm={setIsShowForm}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default ManagementEmployee;
