import { useState } from "react";
import {
	Button,
	Calendar,
	CalendarCell,
	CalendarGrid,
	DateInput,
	DatePicker,
	DateSegment,
	type DateValue,
	Dialog,
	Group,
	Heading,
	Label,
	Popover,
	TimeField,
	type TimeValue,
} from "react-aria-components";

export default function DateTimePicker() {
	const [selectedDate, setSelectedDate] = useState<DateValue>();
	const [selectedTime, setSelectedTime] = useState<TimeValue>();

	return (
		<>
			<DatePicker
				value={selectedDate}
				onChange={(value) => setSelectedDate(value)}
				className="mb-4"
			>
				<Label>Date</Label>
				<Group>
					<DateInput>
						{(segment) => <DateSegment segment={segment} />}
					</DateInput>
					<Button>▼</Button>
				</Group>
				<Popover>
					<Dialog>
						<Calendar>
							<header>
								<Button slot="previous">◀</Button>
								<Heading />
								<Button slot="next">▶</Button>
							</header>
							<CalendarGrid>
								{(date) => <CalendarCell date={date} />}
							</CalendarGrid>
						</Calendar>
					</Dialog>
				</Popover>
			</DatePicker>
			<TimeField
				value={selectedTime}
				onChange={(value) => setSelectedTime(value)}
			>
				<Label>Event time</Label>
				<DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
			</TimeField>
		</>
	);
}
