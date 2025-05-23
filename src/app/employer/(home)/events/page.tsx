"use client";
import { getAllEmployerEvents } from '@/api/events';
import EventsDashboard from '@/commonPages/EventsDashboard';
import { useQuery } from '@tanstack/react-query';

const EventsPage = () => {
  const { isLoading, data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEmployerEvents,
  });
  return (
    <EventsDashboard navigateRoute="/employer" events={events?.events} isLoading={isLoading} />
  );
};

export default EventsPage;