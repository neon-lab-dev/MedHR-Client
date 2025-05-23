 
"use client";
import { deleteEvent } from "@/api/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMAGES } from "@/assets";
import Link from "next/link";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import Image from "next/image";
import { TEvents } from "@/app/(employee)/(home)/_components/Events";
import { convertDate } from "@/helpers/convertDate";
import { toast } from "sonner";

const EventsDashboard = ({
  navigateRoute,
  events,
  isLoading,
}: {
  navigateRoute: string;
  events: TEvents[];
  isLoading: boolean;
}) => {
  const queryClient = useQueryClient();

  // Delete event
  const { mutate: deleteEventMutation, isPending: isEventDeleting } =
    useMutation<string, unknown, string>({
      mutationFn: (eventId: string) => deleteEvent(eventId),
      onSuccess: () => {
        toast.success("Event deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["events"] });
      },
      onError: (error: unknown) => {
        toast.error(error as string);
      },
    });

  // Delete event
  const handleDeleteEvent = (eventId: string) => {
    deleteEventMutation(eventId);
  };

  // Table headers
  const eventsTableHeaders = [
    { header: "Event Name", accessor: "eventName" },
    { header: "Company Name", accessor: "companyName" },
    { header: "Company Location", accessor: "companyLocation" },
    { header: "Date and Time", accessor: "dateAndTime" },
    { header: "Skills Covered", accessor: "skillCovered" },
    { header: "Actions", accessor: "actions" },
  ];

  // Table action buttons
  const renderCustomCell = (column: any, item: any) => {
    if (column.accessor === "actions") {
      return (
        <div key="actions">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="cursor-pointer">
              <Image src={IMAGES.menudots} alt="menu-dots-icon" />
            </div>
            {/* <div tabIndex={0} role="button">
              {jobThatIsBeingDeleted === item.actions && isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Image src={menuDots} alt="menu-dots-icon" />
              )}
            </div> */}
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
            >
              <li>
                <a
                  href={`${navigateRoute}/events/${item.actions}`}
                  className="flex gap-2"
                >
                  {/* <Image src={eye} alt="eye-icon" /> */}
                  <span>Edit</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleDeleteEvent(item.actions);
                  }}
                  className="flex gap-2 text-red-500"
                >
                  {/* <Image src={trash} alt="eye-icon" /> */}
                  <span>{isEventDeleting ? "Deleting..." : "Delete"}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return item[column.accessor];
  };

  return (
    <div className="bg-neutral-450 p-6 flex flex-col gap-[51px]">
      <div className="flex items-center justify-end px-4">
        {/* Create event button */}
        <Link
          href={`${navigateRoute}/create-event`}
          className="bg-neutral-650 border border-neutral-550 rounded-[10px] font-plus-jakarta-sans text-base font-medium text-secondary-925 px-4 pt-3 pb-[14px]"
        >
          Create Event
        </Link>
      </div>

      {isLoading ? (
        <Loading className="h-40" />
      ) : events?.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          No events added
        </p>
      ) : (
        <Table
          className="w-full max-w-full pb-32"
          headers={eventsTableHeaders}
          data={events?.map((event: TEvents) => ({
            eventName: event?.eventName,
            companyName: event?.company?.companyName,
            companyLocation: event?.company?.companyLocation,
            dateAndTime: `${convertDate(event?.date)} at ${event?.time}`,
            skillCovered: event?.skillCovered?.join(", "),
            actions: event?._id,
          })) as any}
          renderCustomCell={renderCustomCell}
        />
      )}
    </div>
  );
};

export default EventsDashboard;
