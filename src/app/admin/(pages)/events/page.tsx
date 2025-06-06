"use client";
import { getAllEvents } from '@/api/events';
import EventsDashboard from '@/commonPages/EventsDashboard';
import { useQuery } from '@tanstack/react-query';

const EventsPage = () => {
  const { isLoading, data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  return (
    <EventsDashboard navigateRoute="/admin" events={events?.data} isLoading={isLoading} />
  );
};

export default EventsPage;