import axios from "axios";
import api from ".";
import { EventType } from "react-hook-form";

// Get all skill programmes
export const getAllEvents = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(api.events, {
          withCredentials: true,
        })
        .then((res) => {
          resolve(res?.data ?? null);
        })
        .catch((err) => {
          reject(err?.response?.message ?? "Something went wrong");
        });
    });
  };

  export const getEventById = async (
    id: string
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${api.getSingleEventById}/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          resolve(res.data ?? {});
        })
        .catch((err) => {
          reject(err?.response?.data?.message ?? "Something went wrong");
        });
    });
  };
  

  // Function to delete a event by its id
  // This is for admin only
  export const deleteEvent = async (id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${api.deleteEvent}/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          resolve("Event deleted successfully"); 
        })
        .catch((err) => {
          reject(err?.response?.message ?? "Failed to delete event");
        });
    });
  };
  