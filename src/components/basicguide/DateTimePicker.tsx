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
        <Group className="flex w-fit items-center justify-center content-center gap-4">
          <DateInput className="flex gap-1">
            {(segment) => (
              <DateSegment segment={segment} className="px-2 py-1" />
            )}
          </DateInput>
          <Button className="bg-violet-600 text-white rounded w-8 h-8 p-0 text-sm box-content focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2">
            ▼
          </Button>
        </Group>
        <Popover className="max-w-none">
          <Dialog className="p-4 bg-white shadow-lg rounded">
            <Calendar>
              <header className="flex gap-4 items-center justify-center bg-violet-100">
                <Button slot="previous" className="p-2">
                  ◀
                </Button>
                <Heading />
                <Button slot="next" className="p-2">
                  ▶
                </Button>
              </header>
              <CalendarGrid>
                {(date) => <CalendarCell date={date} className="p-2" />}
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
        <DateInput className="flex gap-1">
          {(segment) => <DateSegment segment={segment} className="px-2 py-1" />}
        </DateInput>
      </TimeField>
    </>
  );
}
