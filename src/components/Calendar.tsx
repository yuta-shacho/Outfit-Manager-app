import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core/index.js";
import { calculateDailyExpense } from "../utils/financeCalculations";
import { CalendarContent } from "../types";
import { formatCurrency } from "../utils/formatting";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { isSameMonth } from "date-fns";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";
import { useAppContext } from "../context/AppContext";

interface CalendarProps {
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
  handleDateClick: (dateInfo: DateClickArg) => void;
}
const Calendar = ({
  setCurrentDay,
  currentDay,
  today,
  handleDateClick,
}: CalendarProps) => {
  const monthlyTransactions = useMonthlyTransactions();
  const { setCurrentMonth } = useAppContext();
  const dailyExpense = calculateDailyExpense(monthlyTransactions);

  //データをイベント用に生成しなおす関数
  const createCalendarEvents = (
    dailyExpense: Record<string, { monthExpense: number }>
  ): CalendarContent[] => {
    return Object.keys(dailyExpense).map((date) => {
      const { monthExpense } = dailyExpense[date];
      return {
        start: date,
        monthExpense: formatCurrency(monthExpense),
      };
    });
  };

  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: "#81d4fa",
  };

  const calendarEvents = createCalendarEvents(dailyExpense);

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <div className="money" id="event-monthExpense">
          {eventInfo.event.extendedProps.monthExpense}
        </div>
        <div className="money" id="event-yearExpense">
          {eventInfo.event.extendedProps.yearExpense}
        </div>
      </>
    );
  };

  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;
    setCurrentMonth(currentMonth);
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
