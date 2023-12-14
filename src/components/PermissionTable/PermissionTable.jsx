import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  changePermissionFalse,
  fetchPreOrders,
  changePermissionTrue,
  updatePermission,
} from "../../redux/preOrderSlice";
import NoData from "../NoData/NoData";
import { updateStatus } from "../../redux/preOrderSlice";
import { updatePreOrder } from "../../redux/preOrderSlice";
import clsx from "clsx";
import { ConfirmAlert } from "../moodles/confirmMoodle";
const PermissionTable = ({ dashboard }) => {
  const [status, setStatus] = useState("pending");
  ///for alert
  const [alertData, setAlertData] = useState({});
  const [dataToSubmit, setDataToSubmit] = useState({ id: 0, grant: false });
  const alert_ref = useRef(0);
  //alert end
  const dispatch = useDispatch();
  const unPermitOrders = useSelector((state) => state.preorder.unPermitOrders);
  // const preOrders = useSelector((state) => state.preorder.preOrders);
  const urgentOrders = useSelector((state) => state.preorder.urgentOrders);
  console.log(unPermitOrders);
  const handleClick = (id, grant) => {
    if (grant) {
      dispatch(changePermissionFalse({ id }));
    } else {
      dispatch(changePermissionTrue({ id }));
    }
  };

  const updateOrderStatus = (id, value) => {
    dispatch(updateStatus({ id, value }));
    dispatch(updatePreOrder({ id, value }));
    setStatus(value);
  };

  useEffect(() => {
    dispatch(fetchPreOrders());
  }, []);
  //for alert
  useEffect(() => {
    if (alertData) {
      handleClick(alertData.id, alertData.grant);
    }
  }, [alertData]);
  //alert end
  console.log(urgentOrders, "urgentsss");
  console.log(dataToSubmit, "tosubmit");

  return (
    <Table>
      <TableHeader className="sticky top-0 bg-white">
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Permission Grant</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dashboard ? (
          urgentOrders.length > 0 ? (
            urgentOrders.map((urgentOrder, i) => (
              <TableRow
                key={urgentOrder.id}
                className={`w-full  ${
                  i % 2 !== 0 ? "bg-primarycolor bg-opacity-20" : "bg-none"
                }`}
              >
                <TableCell className="font-medium">{urgentOrder.id}</TableCell>
                <TableCell>{urgentOrder.client.name}</TableCell>
                <TableCell>{urgentOrder.order_date}</TableCell>
                <TableCell className="">
                  <p
                    className={clsx(" capitalize font-semibold ", {
                      "text-yellow-500": urgentOrder.order_status === "pending",
                      "text-green-500":
                        urgentOrder.order_status === "delivered",
                      "text-blue-500":
                        urgentOrder.order_status === "processing",
                    })}
                  >
                    {urgentOrder.order_status}
                  </p>
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex gap-3 w-40 justify-between"
                      >
                        <div>
                          <p className="text-start text-[18px]">
                            {urgentOrder.order_status}
                          </p>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        onValueChange={(e) =>
                          updateOrderStatus(urgentOrder.id, e)
                        }
                        disabled
                      >
                        <DropdownMenuRadioItem value="pending" disabled>
                          Pending
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="processing" disabled>
                          Processing
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="delivered" disabled>
                          Delivered
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                </TableCell>
                <TableCell className="flex justify-center gap-4 flex-row-reverse">
                  <Button
                    className={`text-[18px]`}
                    onClick={() => {
                      setDataToSubmit({
                        id: unPermitOrders.id,
                        grant: unPermitOrders.permission,
                      });
                      alert_ref.current.click();
                    }}
                    // disabled={!urgentOrder.permission}
                  >
                    {!urgentOrder.permission ? "Granted" : "Need Permission"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <NoData />
          )
        ) : unPermitOrders.length > 0 ? (
          unPermitOrders.map((unPermitOrder) => (
            <TableRow key={unPermitOrder.id}>
              <TableCell className="font-medium">{unPermitOrder.id}</TableCell>
              <TableCell>{unPermitOrder.client.name}</TableCell>
              <TableCell>{unPermitOrder.order_date}</TableCell>
              <TableCell className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex gap-3 w-40 justify-between"
                    >
                      <div>
                        <p className="text-start text-[18px]">
                          {unPermitOrder.order_status}
                        </p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      onValueChange={(e) =>
                        updateOrderStatus(unPermitOrder.id, e)
                      }
                      disabled
                    >
                      <DropdownMenuRadioItem value="pending" disabled>
                        Pending
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="processing" disabled>
                        Processing
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="delivered" disabled>
                        Delivered
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell className="flex justify-center gap-4 flex-row-reverse">
                <Button
                  className={`text-[18px]`}
                  onClick={() => {
                    setDataToSubmit({
                      id: unPermitOrder.id,
                      grant: unPermitOrder.permission,
                    });
                    alert_ref.current.click();
                  }}
                  disabled={!unPermitOrder.permission}
                >
                  {!unPermitOrder.permission ? "Granted" : "Need Permission"}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <NoData />
        )}
      </TableBody>
      <ConfirmAlert
        data={dataToSubmit}
        onSubmit={setAlertData}
        dialogText={` are u sure to give permission to ${
          dataToSubmit.grant ? "need permision" : "granted"
        }`}
        alertRef={alert_ref}
      />
    </Table>
  );
};

export default PermissionTable;
