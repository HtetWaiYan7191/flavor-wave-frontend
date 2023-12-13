import React, { useState } from "react";
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
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DeliveryMoodle from "../moodles/deliveryModle";
const DeliveryTable = () => {
	const [status, setStatus] = React.useState("Sending");
	const [isArrowUp, setIsArrowUp] = useState(false);
	const [showDetail, setShowDetail] = useState(false);
	const handleDropdownOpenChange = (isOpen) => {
		setIsArrowUp(isOpen);
	};
	return (
		<>
			<Table>
				<TableHeader className="sticky top-0 bg-white">
					<TableRow>
						<TableHead className="w-[100px] text-[22px]">
							ID
						</TableHead>
						<TableHead className="text-[22px]">Truck ID</TableHead>
						<TableHead className="text-[22px]">Town</TableHead>
						<TableHead className="text-[22px]">Order ID</TableHead>
						<TableHead className="text-[22px]">Distance</TableHead>
						<TableHead className="text-[22px]">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow onClick={() => setShowDetail(true)}>
						<TableCell className="font-medium text-[18px]">
							INV001
						</TableCell>
						<TableCell className="text-[18px]">Paid</TableCell>
						<TableCell className="text-[18px]">
							Credit Card
						</TableCell>
						<TableCell className="text-[18px]">1234</TableCell>
						<TableCell className="text-[18px]">123 mile</TableCell>
						<TableCell
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							<DropdownMenu
								onOpenChange={handleDropdownOpenChange}
							>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="flex gap-3 w-32 justify-start"
									>
										<div className="">
											<p className="text-start">
												{status}
											</p>
										</div>
										<div className="justify-end flex w-full">
											{isArrowUp ? (
												<IoIosArrowUp />
											) : (
												<IoIosArrowDown />
											)}
										</div>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>
										Order Status
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup
										value={status}
										onValueChange={setStatus}
									>
										<DropdownMenuRadioItem value="Processing">
											Processing
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="Sending">
											Sending
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="Sent">
											Sent
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			{showDetail && <DeliveryMoodle hide={() => setShowDetail(false)} />}
		</>
	);
};
export default DeliveryTable;
